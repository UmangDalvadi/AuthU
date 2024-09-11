// src/components/GoogleSignInButton.jsx
import { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { authUser } from "../services/authServices";

const GoogleSignInButton = ({ onSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const userData = {
                email: user.email,
                name: user.displayName,
                photoUrl: user.photoURL,
                uid: user.uid,
            };

            console.log("User data:", userData);

            const response = await authUser('google-login', userData);
            console.log("Response from server:", response);

            onSuccess(userData);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            alert("Sign-in failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleSignIn}
            disabled={loading}
            className={`flex items-center justify-center border text-sm font-medium py-2 px-6 rounded-full shadow-sm transition duration-300 
                        hover:bg-gray-200 disabled:opacity-50`}
            style={{
                backgroundColor: "#ffffff",
                borderColor: "#dadce0",
                color: "#3c4043",
                fontFamily: "Roboto, sans-serif",
                width: "260px",
                height: "42px",
            }}
        >
            <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google Logo"
                className="w-5 h-5 mr-4"
            />
            {loading ? "Signing in..." : "Sign in with Google"}
        </button>
    );
};

export default GoogleSignInButton;
