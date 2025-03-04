import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "userToken123"); // Simulating authentication
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        🔑 Login
      </button>
    </div>
  );
};

export default Login;
