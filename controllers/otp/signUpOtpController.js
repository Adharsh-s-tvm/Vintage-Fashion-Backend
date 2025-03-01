import Otp from "../../models/otp/signUpOtpModel.js";
import User from "../../models/userModel.js";
import nodemailer from "nodemailer";
import asyncHandler from "../../middlewares/asyncHandler.js";

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP
export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 min validity

  await Otp.updateOne({ email }, { otp, expiresAt: otpExpiry }, { upsert: true });

  await transporter.sendMail({
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  });

  res.json({ message: "OTP sent to email" });
});

// Verify OTP
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = await Otp.findOne({ email });

  if (!storedOtp || storedOtp.otp !== otp || Date.now() > storedOtp.expiresAt) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  await Otp.deleteOne({ email });

  // If it's for account verification
  const user = await User.findOneAndUpdate({ email }, { isVerified: true });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  res.json({ message: "OTP verified successfully" });
});

// Resend OTP
export const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  const otpExpiry = Date.now() + 10 * 60 * 1000;

  await Otp.updateOne({ email }, { otp, expiresAt: otpExpiry }, { upsert: true });

  await transporter.sendMail({
    to: email,
    subject: "New OTP Code",
    text: `Your new OTP is ${otp}. It will expire in 10 minutes.`,
  });

  res.json({ message: "New OTP sent" });
});
