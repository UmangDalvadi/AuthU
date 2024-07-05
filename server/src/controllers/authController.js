import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModel.js";
import { sendOtpMail } from "../utils/sendOtpMailer.js";
import { OtpVerification } from "../models/otpVerificationModel.js";

const register = asyncHandler(async (req, res) => {
    const { firstname, lastname, role, email, password } = req.body;

    if ([firstname, lastname, email, password].some(field => !field || field.trim() === '')) {
        throw new ApiError(400, 'Please provide all required fields');
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        throw new ApiError(409, "User with email already exists");
    }

    const user = await User.create({
        firstname,
        lastname,
        role,
        email,
        password,
        verified: false
    });

    const isUserCreated = await User.findById(user._id).select('-lastname -password');
    if (!isUserCreated) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    try {
        await sendOtpMail(user, res);
    } catch (error) {
        throw new ApiError(500, "Failed to send OTP email");
    }

    return res.status(200).json(
        new ApiResponse(200, { user: isUserCreated }, "User registered successfully")
    )
});

const verify = asyncHandler(
    async (req, res) => {
        const { otp, userId } = req.body;

        if (!otp || !userId)
            throw new ApiError(400, "Empty OTP details are not allowed!");

        const otpVerificationRecord = await OtpVerification.findOne({ userId })
        if (!otpVerificationRecord)
            throw new ApiError(400, "Otp has expired or has been verified already. Please resend otp or log in!");

        if (otp === otpVerificationRecord.otp) {
            await OtpVerification.deleteOne({ userId });

            const user = await User.findById({ _id: userId });
            if (!user)
                throw new ApiError(400, "User not found");

            await User.updateOne({ _id: userId }, { verified: true });

            const token = user.generateToken();

            const options = {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            }

            return res
                .status(200)
                .cookie("token", token, options)
                .json(new ApiResponse(200, { userId }, "Cookie sent & user verified"));
        }
        throw new ApiError(400, "Invalid otp passed!");
    }
);

const login = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;

        

    }
);

const logout = asyncHandler(
    async (req, res) => {
        const option = {
            httpOnly: true,
            secure: true
        }

        res
            .status(200)
            .clearCookie("token", option)
            .json(new ApiResponse(200, {}, "User logged out successfully"));
    }
);



export {
    register,
    verify,
    login,
    logout
};