import express from "express";
import {
  forgotPassword,
  login,
  singUp,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import {
  forgotValidation,
  loginValidationSchema,
  userValidationSchema,
} from "../validation/userValidation.js";
const router = express.Router();

router.post("/sign-up", validate(userValidationSchema), singUp);
router.post("/email-verify", verifyEmail);
router.post("/login", validate(loginValidationSchema), login);
router.post("/forgot-password", validate(forgotValidation), forgotPassword);
export default router;
