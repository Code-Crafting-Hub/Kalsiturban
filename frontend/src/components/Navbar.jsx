/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  

  const handleProfile = async ()=>{
    try {
      const image = localStorage.getItem("user");
      if(image){
        setImgUrl(JSON.parse(image))
      }else{
        setImgUrl("");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    handleProfile();
  },[])

  return (
    <div className="bg-orange-500 text-white">
      <div className="hidden md:flex flex-col md:flex-row md:justify-around items-center gap-3 md:gap-5 h-auto md:h-16 py-4 md:py-0">
        <Link
          to="/"
          className="hover:cursor-pointer px-4 py-2 rounded hover:border hover:border-white border border-orange-500"
        >
          Home
        </Link>

        <Link
          to="/about"
          className="hover:cursor-pointer px-4 py-2 rounded hover:border hover:border-white border border-orange-500"
        >
          About Us
        </Link>

        <Link
          to="#"
          className="hover:cursor-pointer px-4 py-2 rounded hover:border hover:border-white border border-orange-500"
        >
          Rewards
        </Link>

        <Link
          to="/booking"
          className="hover:cursor-pointer px-4 py-2 rounded hover:border hover:border-white border border-orange-500"
        >
          Book Now
        </Link>

        {/* register and profile button combine */}

        <Link
          to="/register"
          className="hover:cursor-pointer px-4 py-2 rounded hover:border hover:border-white border border-orange-500"
        >
          Register Now
        </Link>

        <div
          className="h-10 w-10 rounded-full border"
          onClick={() => {
            setIsProfileOpen(!isProfileOpen);
          }}
        >
          <img src={imgUrl.image} alt="img" className="w-full h-full rounded-full"/>
        </div>

        {isProfileOpen && <Dropdown />}
      </div>
      <div className="flex">
        {isOpen && (
          <div
            className="flex flex-col md:hidden bg-orange-500"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <Link
              to="/"
              className="hover:cursor-pointer px-4 py-2 rounded hover:border hover:border-white border border-orange-500 w-40"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="hover:cursor-pointer px-4 py-2 rounded hover:border hover:border-white border border-orange-500 w-40"
            >
              About Us
            </Link>

            <Link className="hover:cursor-pointer px-4 py-2 rounded hover:border hover:border-white border border-orange-500 w-40">
              Rewards
            </Link>

            <Link
              to="/booking"
              className="hover:cursor-pointer px-4 py-2 rounded hover:border hover:border-white border border-orange-500 w-40"
            >
              Book Now
            </Link>

            <Link
              to="/register"
              className="hover:cursor-pointer px-4 py-2 rounded hover:border hover:border-white border border-orange-500 w-40"
            >
              Register Now
            </Link>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 ms-auto me-10 mb-auto"
        >
          {isOpen ? "X" : "Menu"}
        </button>
      </div>
    </div>
  );
}
