import mongoose from "mongoose";
import User from "../models/user.model.js";
import { generateOtp } from "../helper/otpGenerator.js";
import sendEmail from "../helper/sendEmail.js";
import config from "../config.js";
import verifyEmailTemplate from "../helper/verifyEmailTemplate.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ?*** USER CREATE
export const singUp = async (req, res, next) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.fail("Email already exists. Please login instead.", 400);
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("hashedPassword", hashedPassword);
    const OTP = generateOtp(6);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      verify_otp: OTP,
      isVerified: false,
    });

    console.log("newUser", newUser);

    const subject = "OTP for email Verification";
    const html = verifyEmailTemplate(req.body.name, OTP);
    console.log("OTP", OTP);
    const data = await sendEmail({
      from: config.smtp.user,
      to: req.body.email,
      subject,
      html,
    });

    if (!data)
      return next(new AppError("Something went wrong on sending email", 500));
    newUser.verify_otp = OTP;
    console.log("Saving user with OTP:", newUser.verify_otp);
    await newUser.save();

    return res.success(
      "Verification code sent. Please check your email to continue.",
      200
    );
  } catch (error) {
    next(error);
  }
};

//?*** USER EMAIL VERIFY
export const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    console.log("req", req.body);
    const user = await User.findOne({ email });
    console.log("user=>>", user);

    if (!user) {
      return next(new AppError("Invalid email id!", 400));
    }
    if (otp !== user.verify_otp) {
      return next(new AppError("Invalid otp!", 400));
    }
    user.isVerified = true;
    user.verify_otp = undefined;
    await user.save();
    return res.success("Otp verify successfully", 200);
  } catch (error) {
    next(error);
  }
};

//?*** USER LOGIN
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
      isVerified: true,
    }).select("+password");

    if (!user) {
      return res.fail("Invalid email or account not verified", 400);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.fail("Invalid password", 400);
    }
    // 3. Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      config.jwt.secretKey, // make sure you have this in your .env
      { expiresIn: "7d" } // token expires in 7 days
    );
    user.tokens = token;
    await user.save();
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.tokens;
    return res.success(userObj, "Login successful", 200, token);
  } catch (error) {
    next(error);
  }
};

//?*** FORGOT PASSWORD

export const forgotPassword = async (req, res, next) => {
  try {
    const { email, isResend } = req.body;
    const user = await User.findOne({ email });
    console.log("isEmail", user);
    if (!user) {
      return res.fail("There is no user with this id", 404);
    }
    if (isResend) {
      const otp = generateOtp(6);
      user.verify_otp = otp;
      user.save();
      const from = config.smtp.user;
      const subject = "Otp Is Re-send";
      const html = verifyEmailTemplate(user.name, otp);
      const data = await sendEmail({ from, to: user.email, subject, html });
      console.log("data", data);
      if (!data) {
        res.fail("Something went wrong on sending email!", 500);
      }
      res.success("Re send Otp send to email. Please check your email.", 200);
    } else {
      const otp = generateOtp(6);
      user.verify_otp = otp;
      user.save();
      const from = config.smtp.user;
      const subject = "Please reset your password";
      const html = verifyEmailTemplate(user.name, otp);
      const data = await sendEmail({ from, to: user.email, subject, html });
      console.log("data", data);
      if (!data) {
        res.fail("Something went wrong on sending email!", 500);
      }
      res.success("Otp send to email. Please check your email.", 200);
    }
  } catch (error) {
    next(error);
  }
};

//?*** USER NEW PASSWORD SET
export const newPasswordSet = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
      isVerified: true,
    }).select("+password");
    console.log("user", user);

    if (!user) {
      return res.fail("Invalid email or account not verified", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);

    user.password = hashedPassword;
    await user.save();
    return res.success("New password set successful", 200);
  } catch (error) {
    next(error);
  }
};
