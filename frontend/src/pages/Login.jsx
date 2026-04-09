import React, { useState } from "react";
import Logo from "../assets/rlogo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [pass, setPass] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const data = { phoneNumber, password };
      const response = await axios.post(`${backendURL}/users/login`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
        toast.success(`${response.data.message}`);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user.firstName));
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      const resp = error.response;
      if (resp.data.errors) {
        toast.error(`${resp.data.errors}`);
      } else if (resp.data.message) {
        toast.error(`${resp.data.message}`);
      } else {
        toast.error(`${resp.data}`);
      }
      console.log(resp);
    }
  };

  return (
    <div className="flex flex-col md:flex-row lg:w-[80%] mx-auto min-h-screen justify-center items-center text-gray-900 px-4 md:px-0">
      <Toaster />
      {/* Back Button */}
      <Link
        to="/"
        className="text-blue-500 hover:underline absolute top-5 left-5 font-semibold"
      >
        &lt; Back
      </Link>

      {/* Form Section */}
      <div className="w-full md:w-[45%] py-10">
        <h1 className="font-semibold text-4xl mb-8 text-center">Login</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Phone */}
          <input
            type="number"
            placeholder="Phone Number"
            className="w-full border-b border-blue-500 focus:outline-none pb-1 
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
            [&::-webkit-inner-spin-button]:appearance-none"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />

          {/* Password */}
          <div className="w-full border-b border-blue-500 flex">
            <input
              type={pass ? "text" : "password"}
              placeholder="Password"
              className="w-[95%] focus:outline-none pb-1 
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
            [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div
              onClick={() => {
                setPass(!pass);
              }}
              className="ms-auto hover:cursor-pointer"
            >
              {pass ? "Hide" : "Show"}
            </div>
          </div>

          {/* Select */}
          {/* <select className="focus:outline-none w-full border-b border-blue-500 pb-1">
            <option value="none" className="text-gray-500">
              Purpose
            </option>
            <option value="Tying turban">For tying turban</option>
            <option value="camp">For organizing a camp</option>
          </select> */}

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <Link
              to="/register"
              className="text-blue-500 hover:underline ms-auto"
            >
              Not a member yet? Register now.
            </Link>
          </div>

          {/* Button */}
          <button
            className="bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-700 w-full py-2 rounded transition"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>

      {/* Image Section */}
      <div className="hidden md:flex flex-col w-[45%] h-full text-center justify-center items-center px-6">
        <img
          src={Logo}
          alt="Logo"
          className="w-[70%] max-w-sm object-contain"
        />
        <p className="text-gray-500 mt-4 max-w-md">
          Welcome back! Please enter your details to login to your account and
          continue your journey with us. We're excited to have you back and look
          forward to serving you again!
        </p>
      </div>
    </div>
  );
}
