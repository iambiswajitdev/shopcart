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
import {
  getAllUser,
  getUserById,
  userDeleteById,
  userUpdateById,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

//?*** AUTH ROUTE
router.post("/sign-up", validate(userValidationSchema), singUp);
router.post("/email-verify", verifyEmail);
router.post("/login", validate(loginValidationSchema), login);

//? RESEND OTP ALSO
router.post("/forgot-password", validate(forgotValidation), forgotPassword);

router.post("/set-password", validate(passwordValidation), newPasswordSet);

// ?** AFTER LOGIN USER
router.get("/get-users", verifyToken, getAllUser);
router.get("/get-users/:id", verifyToken, getUserById);
router.patch("/user-update", verifyToken, userUpdateById);
router.delete("/user-delete", verifyToken, userDeleteById);
export default router;
