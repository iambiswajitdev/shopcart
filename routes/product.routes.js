import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createCategory,
  createSubCategory,
  getCategory,
  updateCategory,
  updateSubCategory,
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
router.patch(
  "/updateSubCategory",
  verifyToken,
  upload.single("image"),
  updateSubCategory
);
export default router;
