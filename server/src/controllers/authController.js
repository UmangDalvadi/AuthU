import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModel.js";
import { sendOtpMail } from "../utils/sendOtpMailer.js";
import { sendForgetPasswordMail } from "../utils/sendForgetPasswordMailer.js";
import { OtpVerification } from "../models/otpVerificationModel.js";
import { COOKIE_OPTIONS, ERROR_MESSAGES, RESPONSE_MESSAGES } from "../utils/constants.js";
// import { OAuth2Client } from 'google-auth-library';
// import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config/serverConfig.js';
// const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const handleGoogleLogin = asyncHandler(async (req, res) => {
    const { email, name, uid } = req.body; 
    console.log("Received user data:", req.body);

    try {
        let user = await User.findOne({ email });
        console.log("User found in database:", user);

        if (!user) {
            console.log("Creating new user...");
            user = await User.create({
                firstname: name.split(' ')[0],
                lastname: name.split(' ')[1] || '',
                email,
                password: uid, // Consider hashing this
                verified: true,
            });
            console.log("New user created:", user);
        }

        const jwtToken = user.generateToken();
        console.log("JWT Token generated:", jwtToken);

        res
            .status(200)
            .cookie('token', jwtToken, COOKIE_OPTIONS)
            .json(new ApiResponse(200, { user, token: jwtToken }, RESPONSE_MESSAGES.USER_LOGGED_IN));
    } catch (error) {
        console.error("Error during Google login:", error);
        if (error.response) {
            console.error("Error response from Google API:", error.response.data);
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

export const handleRegister = asyncHandler(async (req, res) => {
    const { firstname, lastname, role, email, password } = req.body;

    if ([firstname, lastname, email, password].some(field => !field || field.trim() === '')) {
        throw new ApiError(400, ERROR_MESSAGES.REQUIRED_FIELDS);
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        throw new ApiError(409, ERROR_MESSAGES.USER_EXISTS);
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
        await sendOtpMail(user._id, user.email);
    } catch (error) {
        throw new ApiError(500, ERROR_MESSAGES.OTP_FAILED);
    }

    return res.status(200).json(
        new ApiResponse(200, { user: isUserCreated }, RESPONSE_MESSAGES.USER_REGISTERED)
    );
});

export const handleVerify = asyncHandler(async (req, res) => {
    const { otp, userId } = req.body;

    if (!otp || !userId)
        throw new ApiError(400, ERROR_MESSAGES.EMPTY_DETAILS);

    const otpVerificationRecord = await OtpVerification.findOne({ userId });
    if (!otpVerificationRecord)
        throw new ApiError(400, ERROR_MESSAGES.OTP_EXPIRED);

    if (otp === otpVerificationRecord.otp) {
        await OtpVerification.deleteOne({ userId });

        const user = await User.findById({ _id: userId });
        if (!user)
            throw new ApiError(400, ERROR_MESSAGES.USER_NOT_FOUND);

        await User.updateOne({ _id: userId }, { verified: true });

        const token = user.generateToken();

        return res
            .status(200)
            .cookie("token", token, COOKIE_OPTIONS)
            .json(new ApiResponse(200, { user, token }, RESPONSE_MESSAGES.USER_VERIFIED));
    }
    throw new ApiError(400, ERROR_MESSAGES.OTP_INVALID);
});

export const handleLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if ([email, password].some(field => field?.trim() === ""))
        throw new ApiError(400, ERROR_MESSAGES.REQUIRED_FIELDS);

    const user = await User.findOne({ email });
    if (!user)
        throw new ApiError(404, ERROR_MESSAGES.USER_NOT_FOUND);

    if (!user.verified)
        throw new ApiError(401, ERROR_MESSAGES.USER_NOT_VERIFIED, { id: user._id });

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect)
        throw new ApiError(401, ERROR_MESSAGES.PASSWORD_INCORRECT);

    const token = await user.generateToken();

    res
        .status(200)
        .cookie("token", token, COOKIE_OPTIONS)
        .json(new ApiResponse(200, { user, token }, RESPONSE_MESSAGES.USER_LOGGED_IN));
});

export const handleLogout = asyncHandler(async (req, res) => {
    res
        .clearCookie("token", COOKIE_OPTIONS)
        .status(200)
        .json(new ApiResponse(200, {}, RESPONSE_MESSAGES.USER_LOGGED_OUT));
});

export const handleResendOtp = asyncHandler(async (req, res) => {
    const { userId, email } = req.body;

    if (!email || !userId)
        throw new ApiError(400, ERROR_MESSAGES.EMPTY_DETAILS);

    const user = await User.findById({ _id: userId });
    if (!user)
        throw new ApiError(400, ERROR_MESSAGES.USER_NOT_FOUND);

    const isOtpVerificationRecord = await OtpVerification.findOne({ userId });
    if (isOtpVerificationRecord)
        await OtpVerification.deleteOne({ userId });

    try {
        await sendOtpMail(userId, email);
    } catch (error) {
        throw new ApiError(500, ERROR_MESSAGES.OTP_FAILED);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { userId }, RESPONSE_MESSAGES.OTP_SENT));
});

export const handleForgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email)
        throw new ApiError(400, ERROR_MESSAGES.EMPTY_DETAILS);

    const user = await User.findOne({ email });
    if (!user)
        throw new ApiError(400, ERROR_MESSAGES.USER_NOT_FOUND);

    await sendForgetPasswordMail(email);
    return res
        .status(200)
        .json(new ApiResponse(200, {}, RESPONSE_MESSAGES.PASSWORD_RESET_EMAIL_SENT));
});

export const handleUpdatePassword = asyncHandler(async (req, res) => {
    const { userId, newPassword } = req.body;

    if (!userId || !newPassword)
        throw new ApiError(400, ERROR_MESSAGES.EMPTY_DETAILS);

    const user = await User.findOne({ _id: userId });
    if (!user)
        throw new ApiError(400, ERROR_MESSAGES.USER_NOT_FOUND);

    user.password = newPassword;
    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, { userId }, RESPONSE_MESSAGES.PASSWORD_RESET_SUCCESS));
});

export const getUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json(new ApiResponse(200, { user }, RESPONSE_MESSAGES.USER_FETCHED));
});