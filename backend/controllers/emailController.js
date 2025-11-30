import dotenv from "dotenv";
import transporter from "../config/mailer.js";

dotenv.config();

export const sendEmails = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("User Email →", email);

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Mail to Admin
    const adminMail = {
      from: `"New User Notification" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New User Registered",
      html: `<p>New user registered: <strong>${email}</strong></p>`,
    };

    // Mail to User
    const userMail = {
      from: `"Welcome" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thanks for Registering! 🎉",
      html: `
        <p>Hi 👋,</p>
        <p>Thanks for subscribing! We'll keep you updated.</p>
        <br/>
        <strong>Have a great day!</strong>
      `,
    };

    // ⭐ Send both mails in parallel — FAST 🚀
    await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(userMail),
    ]);

    //await transporter.sendMail(adminMail);

    return res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.log("Email Send Error:", error);
    return res.status(500).json({
      message: "Mail sending failed",
      error: error.message,
    });
  }
};
