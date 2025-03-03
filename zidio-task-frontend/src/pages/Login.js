import React from "react";
import { signInWithGoogle } from "../firebaseConfig";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      navigate("/dashboard"); // Redirect after login
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {user ? (
          <p className="text-green-600">You are already logged in</p>
        ) : (
          <button
            onClick={handleGoogleLogin}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
