import { Booking } from '../models/bookingModel.js';
import { sendBookingMail } from '../services/sendBookingMail.js';

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.userId;
    const bookings = await Booking.find({ userId })
      .populate('busId')
      .populate('fromId')
      .populate('toId')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message
    });
  }
};

export const getBookedSeats = async (req, res) => {
  try {
    const { busId, date } = req.query;

    if (!busId || !date) {
      return res.status(400).json({ success: false, message: "Bus ID and Date are required" });
    }

    // Find all bookings for this bus on this exact date that are NOT failed
    const bookings = await Booking.find({
      busId,
      travelDate: date,
      paymentStatus: { $ne: 'Failed' }
    });

    // Flatten all booked seat arrays into a single array
    const bookedSeats = bookings.flatMap(booking => booking.seats);

    return res.status(200).json({
      success: true,
      data: bookedSeats
    });

  } catch (error) {
    console.error("Error fetching booked seats:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
