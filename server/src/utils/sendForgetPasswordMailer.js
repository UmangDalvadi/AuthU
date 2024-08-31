import nodemailer from "nodemailer";
import { asyncHandler } from "./asyncHandler.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD, FRONTEND_URL } from "../config/serverConfig.js";
import { ApiError } from "./ApiError.js";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";

const sendForgetPasswordMail = asyncHandler(async (email) => {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: ADMIN_EMAIL,
            pass: ADMIN_PASSWORD
        }
    });

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    const resetUrl = `${FRONTEND_URL}/reset-password/${user._id}`;
    const userName = email.split('@')[0];

    const mailOptions = {
        from: ADMIN_EMAIL,
        to: email,
        subject: "Password Reset Request",
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h1 style="color: #4CAF50; text-align: center;">Power Auth</h1>
                <p style="text-align: center; font-size: 16px; color: #555;">Secure your account with our password reset process</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p>Dear ${userName},</p>
                <p>You have requested to reset your password. Click the link below to reset your password:</p>
                <p style="text-align: center;"><a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
                <p>If you did not request this, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="text-align: center;">Thank you,</p>
                <p style="text-align: center;">The Power Auth Team</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new ApiError(500, "Failed to send password reset email.");
    }
});

export { sendForgetPasswordMail };
