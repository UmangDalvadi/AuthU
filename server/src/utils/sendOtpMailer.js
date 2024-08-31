import nodemailer from "nodemailer";
import { asyncHandler } from "./asyncHandler.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../config/serverConfig.js";
import { OtpVerification } from "../models/otpVerificationModel.js";
import { ApiError } from "./ApiError.js";
import { ApiResponse } from "./ApiResponse.js";

const sendOtpMail = asyncHandler(async (_id, email) => {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: ADMIN_EMAIL,
            pass: ADMIN_PASSWORD
        }
    });

    const userName = email.split('@')[0];

    const mailOptions = {
        from: ADMIN_EMAIL,
        to: email,
        subject: "Your OTP Code",
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h1 style="color: #4CAF50; text-align: center;">Power Auth</h1>
                <p style="text-align: center; font-size: 16px; color: #555;">Secure your account with our OTP verification</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p>Dear ${userName},</p>
                <p>Your OTP code is:</p>
                <p style="font-size: 24px; font-weight: bold; color: #4CAF50; text-align: center;">${otp}</p>
                <p>This code is valid for <strong>1 hour</strong>.</p>
                <p>If you did not request this code, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="text-align: center;">Thank you,</p>
                <p style="text-align: center;">The Power Auth Team</p>
            </div>
        `
    };

    const otpVerification = await OtpVerification.create({
        userId: _id,
        otp: otp.toString(),
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000 // 1 hour expiration
    });

    if (!otpVerification) {
        throw new ApiError(500, "Something went wrong while saving the OTP.");
    }

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new ApiError(500, "Failed to send OTP email.");
    }

});

export { sendOtpMail };
