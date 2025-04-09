import React, { useEffect, useState, useContext } from "react";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
import { registerUser, loginUser } from "../api";
import { AuthContext } from "../context/authContext";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      if (response.status === 200) {
        alert(response.data.message);

        // Store token in localStorage or sessionStorage
        localStorage.setItem("token", response.data.token);

        // Redirect to home page after login
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Register first");
        navigate("/register");
      } else {
        alert(error || "Login failed");
      }
    }
  };
  const handleReg = async (e) => {
    e.preventDefault();
    try {
      navigate("/register");
    } catch (error) {
      alert("error");
    }
  };
  const handleForgot = async (e) => {
    navigate("/forget");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* left side */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600">
              Manage all your task in one place!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>Zidio</span>
              <span>Task Manager</span>
            </p>

            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
          >
            <div className="">
              <p className="text-blue-600 text-3xl font-bold text-center">
                Welcome back!
              </p>
              <p className="text-center text-base text-gray-700 ">
                Keep all your credential safe.
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              {/* <Textbox
                placeholder="username"
                type="text"
                name="username"
                label="Username"
                className="w-full rounded-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Textbox> */}

              <Textbox
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Textbox
                placeholder="your password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                label="Login"
                className="w-full h-10 bg-blue-700 text-white rounded-full"
              ></Button>
            </div>
            <span>
              <Button
                label="Forgot password?"
                onClick={handleForgot}
                className="w-full h-10 text-black"
              ></Button>
            </span>
            <GoogleLogin />
            <span>
              <p className="text-center">
                Not Registered?
                <Button
                  className={"text-blue-500"}
                  onClick={handleReg}
                  label={"Sign Up"}
                ></Button>
              </p>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
