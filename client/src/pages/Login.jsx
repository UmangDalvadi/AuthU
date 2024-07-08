// src/pages/Login.jsx
import React from "react";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { useUserContext } from "../context/userContext";
import axios from "axios";

const Login = () => {
  const { setIsAuth, setUserRole } = useUserContext();

  const handleGoogleSignIn = async (token) => {
    try {
      console.log("Sending token to backend:", token); // Debug line
      const response = await axios.post("http://localhost:8080/api/v1/auth/google-login", { token });
      const { user, token: jwtToken } = response.data.data;
      setIsAuth(true);
      setUserRole(user.role);
      document.cookie = `token=${jwtToken}; path=/`;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <GoogleSignInButton onSuccess={handleGoogleSignIn} />
      {/* Other login form fields */}
    </div>
  );
};

export default Login;
