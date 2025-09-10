import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createCategory } from "../controllers/product.controller.js";
import { upload } from "../utils/upload.js";
const router = express.Router();

//?*** CATEGORY ROUTE
router.post(
  "/addCategory",
  verifyToken,
  upload.single("image"),
  createCategory
);

export default router;
