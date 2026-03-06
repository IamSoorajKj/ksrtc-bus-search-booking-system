import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { Booking } from '../models/bookingModel.js';
import { User } from '../models/userModel.js';
import { Bus } from '../models/busModel.js';
import { Location } from '../models/locationModel.js';
import { sendBookingMail } from '../services/sendBookingMail.js';

dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY
});

export const createOrder = async (req, res) => {
  try {
    const { amount, seats, busId, travelDate, fromId, toId, fromName, toName } = req.body;
    const userId = req.userId;
    const amountInPaise = amount * 100;

    if (!userId || !busId || !seats || !amount || !travelDate) {
      return res.status(400).json({ success: false, msg: "Missing required fields include travelDate" });
    }

    // Fetch bus details for snapshot
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ success: false, msg: "Bus not found" });
    }

    // Fetch location details for snapshot for better robustness
    const fromLoc = fromId ? await Location.findById(fromId) : null;
    const toLoc = toId ? await Location.findById(toId) : null;

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    razorpayInstance.orders.create(options, async (err, order) => {
      if (!err) {
        // Create a pending booking with snapshot fields
        const newBooking = await Booking.create({
          userId,
          busId,
          fromId,
          toId,
          busNumber: bus.busNumber,
          busType: bus.busType,
          fromName: fromLoc ? fromLoc.name : (fromName || "Unknown"),
          toName: toLoc ? toLoc.name : (toName || "Unknown"),
          seats: seats.split(',').map(s => s.trim()),
          totalAmount: amount,
          razorpayOrderId: order.id,
          paymentStatus: 'Pending',
          travelDate
        });

        res.status(200).send({
          success: true,
          msg: 'Seat Booking Order Created',
          order_id: order.id,
          amount: amountInPaise,
          key_id: process.env.RAZORPAY_ID_KEY,
          product_name: "Bus Seat Booking",
          description: `Booking for ${seats} seats`,
          bookingId: newBooking._id // sending for reference
        });
      } else {
        console.error("Razorpay Error:", err);
        res.status(400).send({ success: false, msg: 'Something went wrong with payment initiation!' });
      }
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, msg: 'Internal server error' });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.userId;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Update booking status
      const booking = await Booking.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          paymentStatus: 'Completed',
          razorpayPaymentId: razorpay_payment_id
        },
        { new: true }
      ).populate('busId');

      // Send confirmation email asynchronously
      if (booking) {
        const user = await User.findById(booking.userId);
        if (user) {
          sendBookingMail(user.email, user.username, booking).catch(err => console.error("Email error:", err));
        }
      }

      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      // Update to failed if signature mismatch
      await Booking.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { paymentStatus: 'Failed' }
      );
      return res.status(400).json({ success: false, message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
}
