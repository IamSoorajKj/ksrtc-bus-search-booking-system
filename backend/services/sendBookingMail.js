import nodemailer from "nodemailer"
import "dotenv/config"

export const sendBookingMail = async (email, username, booking) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const busDetails = booking.busId ? `${booking.busId.busNumber} (${booking.busId.busType})` : "your bus";

  const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #ea580c; padding: 20px; text-align: center; color: white;">
                <h2 style="margin: 0;">Ticket Confirmation</h2>
            </div>
            <div style="padding: 20px; background-color: #fafafa;">
                <p>Hi <b>${username}</b>,</p>
                <p>Your booking was successful! Here are your ticket details:</p>
                <div style="background-color: white; padding: 15px; border-radius: 8px; border: 1px solid #eee; margin-top: 20px;">
                    <p><b>Bus:</b> ${busDetails}</p>
                    <p><b>Seats:</b> ${booking.seats.join(', ')}</p>
                    <p><b>Total Amount:</b> ₹${booking.totalAmount}</p>
                    <p><b>Booking Date:</b> ${new Date(booking.bookingDate).toLocaleString('en-IN')}</p>
                </div>
                <p style="margin-top: 20px; color: #555;">Thank you for choosing KSRTC Bus Booking.</p>
            </div>
            <div style="background-color: #eee; padding: 10px; text-align: center; font-size: 12px; color: #888;">
                &copy; ${new Date().getFullYear()} KSRTC Bus Booking. All rights reserved.
            </div>
        </div>
    `;

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Your Ticket is Confirmed! 🚍',
    html: htmlContent
  };

  await transporter.sendMail(mailOptions);
};
