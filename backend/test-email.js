import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function testEmail() {
  console.log("Testing email connection...");
  console.log("User:", process.env.MAIL_USER);
  console.log("Pass length:", process.env.MAIL_PASS ? process.env.MAIL_PASS.length : 0);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  try {
    const info = await transporter.verify();
    console.log("Server is ready to take our messages:", info);
  } catch (error) {
    console.error("Error connecting to email server:");
    console.error(error);
  }
}

testEmail();
