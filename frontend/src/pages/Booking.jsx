import React from "react";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import booking from "../assets/booking.jpeg";
import { Link } from "react-router-dom";

export default function Booking() {
  return (
    <>
      <Logo />
      <Navbar />

      <div className="w-full flex flex-col md:flex-row">

        {/* Image Section */}
        <div className="w-full md:w-[45%]">
          <img
            src={booking}
            alt="Booking"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center items-center text-center w-full md:w-[55%] px-4 md:px-0 py-8">

          <h1 className="w-full font-semibold text-3xl md:text-4xl my-6 md:my-10">
            Booking
          </h1>

          <form className="space-y-6 w-full flex flex-col items-center">

            {/* First + Last Name */}
            <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">
              <input
                type="text"
                placeholder="First Name"
                className="border-b border-blue-500 w-full md:w-[35%] focus:outline-none pb-1"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border-b border-blue-500 w-full md:w-[30%] focus:outline-none pb-1"
              />
            </div>

            {/* Address */}
            <input
              type="text"
              placeholder="Address"
              className="border-b border-blue-500 w-full md:w-[70%] focus:outline-none pb-1"
            />

            {/* Phone */}
            <input
              type="number"
              placeholder="Phone Number"
              className="border-b border-blue-500 w-full md:w-[70%] focus:outline-none pb-1
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none"
            />

            {/* Select */}
            <select className="focus:outline-none border-b border-blue-500 w-full md:w-[70%] pb-1">
              <option value="none" className="text-gray-500">
                Purpose
              </option>
              <option value="Tying turban">For tying turban</option>
              <option value="camp">For organizing a camp</option>
            </select>

            {/* Date & Time */}
            <input
              type="datetime-local"
              className="border-b border-blue-500 w-full md:w-[70%] focus:outline-none pb-1"
            />

            <p className="text-gray-600">To</p>

            <input
              type="datetime-local"
              className="border-b border-blue-500 w-full md:w-[70%] focus:outline-none pb-1"
            />

            {/* Button */}
            <button className="bg-blue-500 text-white hover:bg-blue-700 hover:cursor-pointer w-full md:w-[70%] py-2 rounded transition">
              Book now
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}