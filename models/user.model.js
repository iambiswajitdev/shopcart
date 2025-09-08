import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: 8,
    select: false,
  },
  verify_otp: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  tokens: {
    type: String,
    select: false,
    default: "",
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id }, // payload
    process.env.JWT_SECRET, // secret key (store in .env)
    { expiresIn: process.env.JWT_EXPIRE || "30d" } // expiry
  );
};

const User = mongoose.model("User", userSchema);

export default User;
