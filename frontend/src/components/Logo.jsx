import React from "react";
import img from "../assets/download.png";

export default function Logo() {
  return (
    <div className="bg-blue-700 text-white flex">
      <div>
        <img src={img} alt="" className="rounded-full h-16 mx-6 my-2" />
      </div>
      <div className="font-bold text-3xl mx-auto my-6">Kalsi Turban</div>
    </div>
  );
}
