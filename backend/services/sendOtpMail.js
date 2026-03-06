import "dotenv/config";
import nodemailer from "nodemailer";

export const sendOtpMail = async (email, otp) => {
    const apiKey = process.env.BREVO_API_KEY;

    // Use Brevo API if Key is present (Production)
    if (apiKey) {
        const payload = {
            sender: { email: 'aiagentautomationsystem@gmail.com', name: "KSRTC Department" },
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
            return; // Success
        } catch (error) {
            console.error("Brevo Email send failed:", error);
            throw error;
        }
    }

    // Fallback to Nodemailer for Local Development
    console.log("BREVO_API_KEY missing, falling back to Nodemailer (Local)...");

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailOptions = {
        from: `"KSRTC Department" <${process.env.MAIL_USER}>`,
        to: email,
        subject: 'Password reset OTP',
        html: `<p>Your OTP for password reset is: <b>${otp}</b>. It is valid for 10 minutes.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("OTP sent successfully via Nodemailer fallback");
    } catch (error) {
        console.error("Nodemailer fallback failed:", error);
        throw new Error("Failed to send OTP email via fallback");
    }
}