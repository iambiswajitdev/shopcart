import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import config from "../config.js";

dotenv.config();

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: config.image.cloudinary_name,
  api_key: config.image.cloudinary_apiKey,
  api_secret: config.image.cloudinary_apiSecretKey,
});

// 2. Create Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "shopCart", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => {
      // optional: generate custom filename
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return uniqueSuffix;
    },
  },
});

// 3. Export multer instance
export const upload = multer({ storage });
