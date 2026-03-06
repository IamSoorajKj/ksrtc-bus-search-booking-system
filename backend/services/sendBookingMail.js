import "dotenv/config"

export const sendBookingMail = async (email, username, booking) => {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error("BREVO_API_KEY is missing in environment variables");
  }

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

  const payload = {
    sender: { email: process.env.MAIL_USER || 'noreply@ksrtc.com', name: "KSRTC Bus Booking" },
    to: [{ email: email }],
    subject: 'Your Ticket is Confirmed! 🚍',
    htmlContent: htmlContent
  };

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Brevo API Error:", error);
      throw new Error("Failed to send booking email via Brevo API");
    }
  } catch (error) {
    console.error("Email send failed:", error);
    throw error;
  }
};
