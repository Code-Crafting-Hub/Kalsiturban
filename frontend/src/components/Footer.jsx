import React from "react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import img from "../assets/download.png";

export default function Footer() {
  return (
    <>
      <div className="bg-gray-500 text-white flex flex-wrap">
        <div className="flex items-center md:ps-20 gap-2 py-4">
          <img src={img} alt="" className="rounded-full h-20" />
          <div>
            <h1 className="text-2xl font-bold">Gurpreet Singh</h1>
            <h2 className="text-xl font-semibold">Chamkaur Sahib</h2>
          </div>
        </div>
        <div className="ms-auto mx-20 w-50 py-10">
          <h2 className="font-semibold text-lg">Follow us</h2>
          <div>
            <a
              href="#"
              className="flex flex-row items-center gap-1 transition hover:text-pink-500"
            >
              <FaInstagram />
              <span>Instagram</span>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="flex flex-row items-center gap-1 transition hover:text-blue-500"
            >
              <FaFacebook />
              <span>Facebook</span>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="flex flex-row items-center gap-1 transition hover:text-red-500"
            >
              <FaYoutube />
              <span>Youtube</span>
            </a>
          </div>
        </div>
      </div>
      <div className="bg-gray-600 text-white text-center font-semibold py-2">
        @copyright 2026
      </div>
    </>
  );
}
