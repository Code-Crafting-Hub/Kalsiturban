import React from "react";
import img from "../assets/Logo.jpeg";

export default function Logo() {
  return (
    <div className="bg-blue-700 text-white flex md:flex-row items-center justify-between px-4 py-4">
      
      {/* Left Image */}
      <img
        src={img}
        alt="Logo"
        className="rounded-full h-16 w-16 md:h-20 md:w-20 mb-3 md:mb-0"
      />

      {/* Title */}
      <div className="font-bold text-3xl sm:text-4xl md:text-6xl text-center w-full">
        KALSI TURBAN'S
      </div>

      {/* Right Image */}
      <img
        src={img}
        alt="Logo"
        className="hidden md:block rounded-full h-16 w-16 md:h-20 md:w-20 mt-3 md:mt-0"
      />
      
    </div>
  );
}