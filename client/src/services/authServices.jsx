import axios from "axios";

const SERVER_DOMAIN = import.meta.url.VITE_SERVER_URL;

const registerUser = async (formData) => {

    const response = await axios.post(
        `${SERVER_DOMAIN}/api/v1/auth/register`,
        formData,
        { withCredentials: true }
    );

    return response.data;
};

const loginUser = async (formData) => {

    const response = await axios.post(
        `${SERVER_DOMAIN}/api/v1/auth/login`,
        formData,
        { withCredentials: true }
    );

    return response.data;
};

const verifyUser = async (otp, userId) => {

    const response = await axios.post(
        `${SERVER_DOMAIN}/api/v1/auth/verify`,
        { otp, userId },
        { withCredentials: true }
    );

    return response.data;
};

const logoutUser = async () => {

    const response = await axios.post(
        `${SERVER_DOMAIN}/api/v1/auth/logout`,
        { withCredentials: true }
    );

    return response.data;
};

const resendOtp = async (userId, email) => {

    const response = await axios.post(
        `${SERVER_DOMAIN}/api/v1/auth/resend-otp`,
        { userId, email },
        { withCredentials: true }
    );

    return response.data;
};

const forgetPassword = async (email) => {

    const response = await axios.post(
        `${SERVER_DOMAIN}/api/v1/auth/forget-password`,
        { email },
        { withCredentials: true }
    );

    return response.data;
};

const updatePassword = async (userId, newPasword) => {

    const response = await axios.post(
        `${SERVER_DOMAIN}/api/v1/auth/update-password`,
        { userId, newPasword },
        { withCredentials: true }
    );

    return response.data;
};

export {
    registerUser,
    loginUser,
    verifyUser,
    logoutUser,
    resendOtp,
    forgetPassword,
    updatePassword
};
