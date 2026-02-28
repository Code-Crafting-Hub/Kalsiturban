import React from "react";
import Logo from "../assets/rlogo.png";
import { Link } from "react-router-dom";

export default function Registration() {
  return (
    <div className="flex flex-col md:flex-row lg:w-[80%] mx-auto min-h-screen justify-center items-center text-gray-900 px-4 md:px-0">

      {/* Back Button */}
      <Link
        to="/"
        className="text-blue-500 hover:underline absolute top-5 left-5 font-semibold"
      >
        &lt; Back
      </Link>

      {/* Form Section */}
      <div className="w-full md:w-[45%] py-10">
        <h1 className="font-semibold text-3xl mb-8 text-center">
          Register Now
        </h1>

        <form className="space-y-6">

          {/* First + Last Name */}
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="text"
              placeholder="First Name"
              className="border-b border-blue-500 w-full focus:outline-none pb-1"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border-b border-blue-500 w-full focus:outline-none pb-1"
            />
          </div>

          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            className="border-b border-blue-500 w-full focus:outline-none pb-1"
          />

          {/* Phone */}
          <input
            type="number"
            placeholder="Phone Number"
            className="w-full border-b border-blue-500 focus:outline-none pb-1 
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
            [&::-webkit-inner-spin-button]:appearance-none"
          />

          {/* Select */}
          <select className="focus:outline-none w-full border-b border-blue-500 pb-1">
            <option value="none" className="text-gray-500">Purpose</option>
            <option value="Tying turban">For tying turban</option>
            <option value="camp">For organizing a camp</option>
          </select>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="check1" />
            <label htmlFor="check1">
              Want to get call from us.
            </label>
          </div>

          {/* Button */}
          <button className="bg-blue-500 text-white hover:bg-blue-700 w-full py-2 rounded transition">
            Register now
          </button>

        </form>
      </div>

      {/* Image Section */}
      <div className="hidden md:flex flex-col w-[45%] h-full text-center justify-center items-center px-6">
        <img src={Logo} alt="Logo" className="w-[70%] max-w-sm object-contain" />
        <p className="text-gray-500 mt-4 max-w-md">
          Join us today and experience the best of Kalsi Turban! Register now
          to unlock exclusive benefits, stay updated on our latest offerings,
          and be part of our vibrant community.
        </p>
      </div>

    </div>
  );
}