import React from "react";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import booking from "../assets/booking.jpeg";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [purpose, setPurpose] = useState("");
  const [address, setAddress] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const gettingData = async () => {
    try {
      const detail = await axios.get(`${backendURL}/users/detail`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { firstName, lastName, phoneNumber, address } = detail.data;
      setFirstName(firstName);
      setLastName(lastName);
      setPhoneNumber(phoneNumber);
      setAddress(address);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      if (
        !firstName ||
        !lastName ||
        !purpose ||
        !address ||
        !phoneNumber ||
        !from ||
        !to
      ) {
        return toast.error("Please fill all the fields");
      }
      const details = {
        firstName,
        lastName,
        phoneNumber,
        purpose,
        address,
        from,
        to,
      };
      const response = await axios.post(`${backendURL}/booking/book`, details, {
        withCredentials: true,
      });
      if (response.status === 201) {
        toast.success(`${response.data.message}`);
        setPurpose("");
        setFrom("");
        setTo("");
      }
    } catch (error) {
      const message = error.response.data.message;
      if (message) {
        toast.error(`${message}`);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    gettingData();
  }, []);

  return (
    <>
      <Logo />
      <Navbar />
      <Toaster />

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

          <form
            className="space-y-6 w-full flex flex-col items-center"
            onSubmit={handleBooking}
          >
            {/* First + Last Name */}
            <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">
              <input
                type="text"
                placeholder="First Name"
                className="border-b border-blue-500 w-full md:w-[35%] focus:outline-none pb-1"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border-b border-blue-500 w-full md:w-[30%] focus:outline-none pb-1"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>

            {/* Address */}
            <input
              type="text"
              placeholder="Address"
              className="border-b border-blue-500 w-full md:w-[70%] focus:outline-none pb-1"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />

            {/* Phone */}
            <input
              type="number"
              placeholder="Phone Number"
              className="border-b border-blue-500 w-full md:w-[70%] focus:outline-none pb-1
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />

            {/* Select */}
            <select
              className="focus:outline-none border-b border-blue-500 w-full md:w-[70%] pb-1"
              onChange={(e) => {
                setPurpose(e.target.value);
              }}
            >
              <option value="none" className="text-gray-500">
                Purpose
              </option>
              <option value="Tying turban">For tying turban</option>
              <option value="Camp">For organizing a camp</option>
            </select>

            {/* Date & Time */}
            <input
              type="datetime-local"
              className="border-b border-blue-500 w-full md:w-[70%] focus:outline-none pb-1"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
              }}
            />

            <p className="text-gray-600">To</p>

            <input
              type="datetime-local"
              className="border-b border-blue-500 w-full md:w-[70%] focus:outline-none pb-1"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
              }}
            />

            {/* Button */}
            <button
              className="bg-blue-500 text-white hover:bg-blue-700 hover:cursor-pointer w-full md:w-[70%] py-2 rounded transition"
              type="submit"
            >
              Book now
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
