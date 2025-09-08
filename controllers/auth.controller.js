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
  req.body.isVerified = false;

  try {
    const newUser = await User.create(req.body);
    const OTP = generateOtp(6);
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
