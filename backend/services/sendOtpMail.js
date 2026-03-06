import "dotenv/config"

export const sendOtpMail = async (email, otp) => {
    const apiKey = process.env.BREVO_API_KEY;

    // Fallback if not configured (should not happen in prod if env is set)
    if (!apiKey) {
        throw new Error("BREVO_API_KEY is missing in environment variables");
    }

    const payload = {
        sender: { email: process.env.MAIL_USER || 'noreply@ksrtc.com', name: "KSRTC Bus Booking" },
        to: [{ email: email }],
        subject: 'Password reset OTP',
        htmlContent: `<p>Your OTP for password reset is: <b>${otp}</b>. It is valid for 10 minutes.</p>`
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
            throw new Error("Failed to send email via Brevo API");
        }
    } catch (error) {
        console.error("Email send failed:", error);
        throw error;
    }
}