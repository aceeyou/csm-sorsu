import User from "../models/User.js";
import { generateToken } from "../middleware/auth.js";
import AllowedEmail from "../models/AllowedEmail.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

let otpStore = {};

export async function RegisterUser(req, res) {
  const { name, email, password } = req.body;

  try {
    // Checks if all required fields are provided
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email, and password" });
    }

    // Checks if the email provided is added on the allowed list of emails
    const isEmailAllowed = await AllowedEmail.findOne({ email });
    if (!isEmailAllowed) {
      return res.status(400).json({
        message:
          "The email provided is not allowed to register. Please contact the CART App admin to grant you privelages.",
      });
    }

    // Checks if the user/email already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: `User with that email already exists` });
    }

    // Checks if the user provided at least 8 characters for their password
    if (password.length < 8) {
      return res.status(400).json({
        message:
          "Password is too short. Provide at least 8 characters to register",
      });
    }

    // If the registration data passess all the test, the system will now create the new user account in the database
    const user = await User.create({
      name,
      email,
      password,
      role: "user",
      active: true,
    });
    const token = await generateToken(user._id);
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function LoginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Checks if user provided email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide your email and password to login" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid password" });

    if (!user.active)
      return res.status(401).json({
        message:
          "You are not allowed to login with this email. Please contact the admin to continue.",
      });

    const token = await generateToken(user._id);
    // If credentials are valid, return the user data
    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function SendResetPasswordEmail(req, res) {
  const { email } = req.body;

  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresIn = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes
  const currentTime = Date.now();

  // Initialize record for the email if it doesn't exist
  if (!otpStore[email]) {
    otpStore[email] = {
      otp: null,
      expiresIn: 0,
      lastRequestedAt: 0,
      requestHistory: [],
    };
  }

  const record = otpStore[email];

  // 2. Enforce the Hourly Limit (Max 5 requests per hour)
  const oneHourAgo = currentTime - 60 * 60 * 1000;

  // Filter history to only keep requests made within the last rolling hour
  record.requestHistory = record.requestHistory.filter(
    (timestamp) => timestamp > oneHourAgo,
  );

  // If they have already made 5 requests in the last hour, block them
  if (record.requestHistory.length >= 5) {
    // Calculate when the oldest request in the window expires so we can tell them when to try again
    const oldestRequest = record.requestHistory[0];
    const timeUntilReset = Math.ceil(
      (oldestRequest + 60 * 60 * 1000 - currentTime) / (60 * 1000),
    );

    return res.status(429).json({
      message: `Too many requests. You have reached the maximum of 5 OTPs per hour. Try again in ${timeUntilReset} minutes.`,
    });
  }

  // Update data and log the current request timestamp into the history array
  record.otp = otp;
  record.expiresAt = currentTime + 5 * 60 * 1000; // 5 minutes validity
  record.lastRequestedAt = currentTime;
  record.requestHistory.push(currentTime);

  try {
    if (!email) {
      return res.status(400).json({ message: "Please provide your email" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with the provided email" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PW,
      },
    });

    const mailConfig = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Password Reset Request",
      text:
        "You requested a password reset. Use the OTP below to reset your password. This OTP will expire in 5 minutes.\n\n" +
        `OTP: ${otp}`,
    };

    transporter.sendMail(mailConfig, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log("Email sent: " + info.response);
        return res
          .status(200)
          .json({ message: "Password reset email sent successfully" });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export async function VerifyOTP(req, res) {
  const { email, otp } = req.body;
  const record = otpStore[email];

  try {
    if (!email || !otp) {
      return res
        .status(400)
        .json({ message: "Please provide your email and OTP" });
    }

    if (!record || !record.otp) {
      return res.status(400).json({ message: "No OTP found for this email" });
    }

    if (record.expiresAt < Date.now()) {
      delete otpStore[email];
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one." });
    }

    if (record.otp === otp) {
      // delete otpStore[email];
      record.otp = null; // Clear the OTP upon successful verification
      return res.status(200).json({ message: "OTP verified successfully!" });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // delete otpStore[email];
  } catch (error) {
    console.log(error);
  }
}

export async function ResetPassword(req, res) {
  const { email, newPassword } = req.body;

  try {
    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Please provide your email and new password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with the provided email" });
    }

    user.password = newPassword;
    user.save(); // This will trigger the pre-save hook to hash the new password
    // console.log("User found:", user);
    // await User.updateOne({ email }, { $set: { password: newPassword } });

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to reset password" });
  }
}
