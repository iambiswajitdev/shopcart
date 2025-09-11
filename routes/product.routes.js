import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createCategory,
  createSubCategory,
  getCategory,
  updateCategory,
} from "../controllers/product.controller.js";
import { upload } from "../utils/upload.js";
const router = express.Router();

//?*** CATEGORY ROUTE
router.post("/addCategory", verifyToken, createCategory);

router.post(
  "/addSubCategory",
  verifyToken,
  upload.single("image"),
  createSubCategory
);

router.get("/getCategory", getCategory);
router.patch("/updateCategory", verifyToken, updateCategory);
export default router;
