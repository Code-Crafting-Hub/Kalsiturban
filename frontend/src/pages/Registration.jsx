import React, { useState } from "react";
import Logo from "../assets/rlogo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Registration() {
  const [pass, setPass] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !phoneNumber || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const data = {
        firstName,
        lastName,
        address,
        phoneNumber,
        password,
      };
      const response = await axios.post(`${backendURL}/users/register`, data,{
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success(`${response.data.message}`);
        //login user after registration
        const loginResponse = await axios.post(
          `${backendURL}/users/login`,
          {
            phoneNumber,
            password,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        localStorage.setItem("token", loginResponse.data.token);
        const {firstName, image} = loginResponse.data.user;
        localStorage.setItem(
          "user",
          JSON.stringify({firstName, image: image.url}),
        );
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      const { errors, message } = error.response.data;
      if (errors) {
        toast.error(`${errors}`);
      } else if (message) {
        toast.error(`${message}`);
      }
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
        <h1 className="font-semibold text-4xl mb-8 text-center">
          Register Now
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* First + Last Name */}
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="text"
              placeholder="First Name"
              className="border-b border-blue-500 w-full focus:outline-none pb-1"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border-b border-blue-500 w-full focus:outline-none pb-1"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            className="border-b border-blue-500 w-full focus:outline-none pb-1"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />

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
            <input type="checkbox" id="check1" />
            <label htmlFor="check1">Want to get call from us.</label>
            <Link to="/login" className="text-blue-500 hover:underline ms-auto">
              Already Registered?
            </Link>
          </div>

          {/* Button */}
          <button
            className="bg-blue-500 text-white hover:bg-blue-700 hover:cursor-pointer w-full py-2 rounded transition"
            type="submit"
          >
            Register now
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
          Join us today and experience the best of Kalsi Turban! Register now to
          unlock exclusive benefits, stay updated on our latest offerings, and
          be part of our vibrant community.
        </p>
      </div>
    </div>
  );
}
