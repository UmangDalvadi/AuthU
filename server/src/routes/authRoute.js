import { Router } from "express";
const router = Router();
import {
  handleForgetPassword,
  handleLogin,
  handleLogout,
  handleRegister,
  handleResendOtp,
  handleUpdatePassword,
  handleVerify,
  getUserDetails,
  handleGoogleLogin
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { ROLES } from "../utils/constants.js";

router.route("/register").post(handleRegister);
router.route("/verify").post(handleVerify);
router.route("/login").post(handleLogin);
router.route('/google-login').post(handleGoogleLogin);
router.route("/logout").post(handleLogout);
router.route("/resend-otp").post(handleResendOtp);
router.route("/forget-password").post(handleForgetPassword);
router.route("/update-password").post(handleUpdatePassword);
router.route("/me").get(authMiddleware(ROLES), getUserDetails);

export default router;