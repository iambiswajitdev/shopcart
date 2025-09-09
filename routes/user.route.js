import express from "express";
import {
  forgotPassword,
  login,
  newPasswordSet,
  singUp,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import {
  forgotValidation,
  loginValidationSchema,
  passwordValidation,
  userValidationSchema,
} from "../validation/userValidation.js";
const router = express.Router();

router.post("/sign-up", validate(userValidationSchema), singUp);
router.post("/email-verify", verifyEmail);
router.post("/login", validate(loginValidationSchema), login);
router.post("/forgot-password", validate(forgotValidation), forgotPassword);
router.post("/set-password", validate(passwordValidation), newPasswordSet);

export default router;
