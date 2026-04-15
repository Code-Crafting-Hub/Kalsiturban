import React from "react";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// Import your team images
import img1 from '../assets/person1.jpeg'; // Content Specialist
import img2 from '../assets/person2.jpeg'; // UI & Programmer
import img3 from '../assets/person3.png'; // Project File Manager

export default function About() {
  const team = [
    {
      id: 1,
      name: "Content Strategist",
      role: "Website Content",
      description: "Responsible for the entire website's narrative, ensuring all information is accurate, engaging, and well-structured.",
      image: img1,
      color: "border-orange-500"
    },
    {
      id: 2,
      name: "Lead Developer",
      role: "UI & Programming",
      description: "The architect behind the visual interface and core logic. Manages everything from the look (UI) to the code performance.",
      image: img2,
      color: "border-blue-600"
    },
    {
      id: 3,
      name: "Project Coordinator",
      role: "Project File Management",
      description: "Handles the assembly of final project files, documentation, and quality checks for the final submission.",
      image: img3,
      color: "border-green-500"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Logo />
      <Navbar />

      {/* Hero Header */}
      <div className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Our <span className="text-orange-500">Project Team</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            A collaborative effort for our college submission, combining content, design, and technical execution.
          </p>
        </div>
      </div>

      {/* Team Cards Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {team.map((member) => (
            <div key={member.id} className="group">
              {/* Image Box */}
              <div className={`relative overflow-hidden rounded-3xl border-b-8 ${member.color} shadow-lg transition-transform duration-500 group-hover:-translate-y-3`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-[450px] object-cover transition-all duration-500"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8 text-center">
                  <p className="text-white text-base leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-8 text-center">
                <p className="text-orange-500 font-black text-xs uppercase tracking-[0.2em] mb-2">
                  {member.role}
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {member.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* College Project Meta Info */}
      <div className="bg-orange-500 py-16 text-white mb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">The Project Goal</h2>
          <p className="text-orange-100 text-lg leading-relaxed">
            Our team focuses on creating a seamless user experience. By dividing our strengths between 
            <strong> Content</strong>, <strong>Programming</strong>, and <strong>Project Management</strong>, 
            we ensure a high-quality submission that meets all academic standards.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}