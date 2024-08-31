export const ROLES = {
    USER: 'user',
    ADMIN: 'admin'
};

export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for production, 'lax' for local
};

export const ERROR_MESSAGES = {
    REQUIRED_FIELDS: 'Please provide all required fields.',
    USER_EXISTS: 'A user with this email already exists.',
    USER_NOT_FOUND: 'No user found with the provided details.',
    USER_NOT_VERIFIED: 'Your account has not been verified yet.',
    PASSWORD_INCORRECT: 'The password you entered is incorrect.',
    OTP_FAILED: 'Failed to send the OTP email. Please try again.',
    OTP_INVALID: 'The OTP you entered is invalid.',
    OTP_EXPIRED: 'The OTP has expired or has already been used. Please request a new OTP.',
    EMPTY_DETAILS: 'Details cannot be empty. Please fill in all required fields.',
    PASSWORD_RESET_FAILED: 'Failed to send the password reset email. Please try again.',
};

export const RESPONSE_MESSAGES = {
    USER_REGISTERED: 'You have successfully registered.',
    USER_VERIFIED: 'Your account has been successfully verified.',
    USER_LOGGED_IN: 'You have successfully logged in.',
    USER_LOGGED_OUT: 'You have successfully logged out.',
    OTP_SENT: 'The OTP has been sent to your email successfully.',
    PASSWORD_RESET_EMAIL_SENT: 'A password reset email has been sent successfully.',
    PASSWORD_RESET_SUCCESS: 'Your password has been reset successfully.',
    USER_FETCHED: 'User details fetched successfully.',
};