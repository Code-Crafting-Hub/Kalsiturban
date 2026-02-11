import React from "react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import img from "../assets/Logo.jpeg";

export default function Footer() {
  return (
    <>
      <div className="bg-gray-500 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Left Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img
              src={img}
              alt="Profile"
              className="rounded-full h-20 w-20 object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">Gurpreet Singh</h1>
              <h2 className="text-lg font-semibold">Chamkaur Sahib</h2>
            </div>
          </div>

          {/* Right Section */}
          <div className="text-center md:text-left md:me-20">
            <h2 className="font-semibold text-lg mb-3">Follow Us</h2>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.instagram.com/gurpreetchamkaursahib/"
                className="flex items-center justify-center md:justify-start gap-2 transition hover:text-pink-500"
                target="_blank"
              >
                <FaInstagram />
                <span>Instagram</span>
              </a>

              <a
                href="https://www.facebook.com/share/1Adv2ojvB7/?mibextid=wwXIfr"
                className="flex items-center justify-center md:justify-start gap-2 transition hover:text-blue-500"
                target="_blank"
              >
                <FaFacebook />
                <span>Facebook</span>
              </a>

              <a
                href="https://www.youtube.com/@GurpreetChamkaurSahib"
                className="flex items-center justify-center md:justify-start gap-2 transition hover:text-red-500"
                target="_blank"
              >
                <FaYoutube />
                <span>Youtube</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-600 text-white text-center font-semibold py-3">
        © 2026 Gurpreet Singh. All Rights Reserved.
      </div>
    </>
  );
}
