import mongoose from "mongoose";
import config from "../config.js";

const URL = config.mongodb.url;
export const connectDb = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // stop app if db fails
  }
};
