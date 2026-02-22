import React from "react";
import img from "../assets/Logo.jpeg";

export default function Logo() {
  return (
    <div className="bg-blue-700 text-white flex">
      <div>
        <img src={img} alt="" className="rounded-full h-20 mx-6 my-3" />
      </div>
      <div className="font-bold text-6xl mx-auto my-6">KALSI TURBAN'S</div>
    </div>
  );
}
