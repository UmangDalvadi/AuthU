// src/components/GoogleSignInButton.jsx
import React from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const GoogleSignInButton = ({ onSuccess }) => {
    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const token = await result.user.getIdToken();
            onSuccess(token);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    return (
        <button onClick={handleSignIn}>Sign in with Google</button>
    );
};

export default GoogleSignInButton;
