import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      console.error("Google login failed:", error.message);
    }
  };

  // Email Login/Signup
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-6">
    {/* Left Section - App Introduction */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="text-white max-w-lg text-center md:text-left mb-8 md:mb-0 md:mr-12"
    >
      <h1 className="text-4xl font-extrabold">Welcome to Task Manager</h1>
      <p className="mt-4 text-lg">
        Organize your tasks efficiently, track progress in real-time, and stay productive with our advanced task management system.
      </p>
    </motion.div>

    {/* Right Section - Login Form */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-center">{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleEmailAuth} className="mt-6">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded mt-4 hover:bg-blue-600 transition"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-red-500 text-white py-3 rounded mt-4 hover:bg-red-600 transition flex items-center justify-center"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Google_2015_logo.svg" alt="Google" className="w-5 mr-2" />
        Login with Google
      </button>
      <p className="text-center mt-4 text-gray-600">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button className="text-blue-500" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </motion.div>
  </div>
  );
};

export default Login;
