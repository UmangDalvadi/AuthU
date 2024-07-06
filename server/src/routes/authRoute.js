import { Router } from "express";
const router = Router();

import { forgetPassword, login, logout, register, resendOtp, updatePassword, verify } from "../controllers/authController.js";

router.route(`/register`).post(register);
router.route(`/verify`).post(verify);
router.route(`/login`).post(login);
router.route(`/logout`).post(logout);
router.route(`/resend-otp`).post(resendOtp);
router.route(`/forget-password`).post(forgetPassword);
router.route(`/update-password`).post(updatePassword);

export default router;