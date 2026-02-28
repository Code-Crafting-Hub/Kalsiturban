import React from "react";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img from '../assets/stand1.png'

export default function About() {
  return (
    <>
      <Logo />
      <Navbar />

      <div className="flex flex-col md:flex-row items-center w-full max-w-6xl mx-auto px-4 md:px-8 gap-10">

        

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-gray-800 space-y-5 text-center md:text-left my-8">
        <h1 className="text-4xl font-semibold text-center">About Me</h1>

          <p className="font-semibold text-lg">Sat Sri Akal,</p>

          <p>
            My name is Gurpreet Singh, and I am proudly associated with
            Chamkaur Sahib. I am a dedicated and disciplined individual who
            believes in professionalism, integrity, and continuous growth.
            My values are deeply rooted in my culture and community, which
            guide both my personal and professional journey.
          </p>

          <p>
            With a strong commitment to excellence, I focus on building
            meaningful connections and contributing positively in every
            environment I am part of. I believe that consistency, hard work,
            and clear vision are the foundations of long-term success.
          </p>

          <p>
            Over time, I have developed the ability to adapt, learn quickly,
            and take responsibility with confidence. My approach is always
            goal-oriented, with attention to detail and a strong sense of
            accountability.
          </p>

          <p>
            My objective is to continue growing professionally, expand my
            impact, and collaborate with individuals and organizations that
            value dedication and integrity.
          </p>

          <div>
            <p className="mt-6">Sincerely,</p>
            <p className="font-semibold">Gurpreet Singh</p>
          </div>

        </div>
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={img}
            alt="Gurpreet Singh"
            className="h-166"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}