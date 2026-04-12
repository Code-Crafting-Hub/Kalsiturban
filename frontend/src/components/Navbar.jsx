import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleProfile = () => {
    try {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
    }
  };

  useEffect(() => {
    handleProfile();
    window.addEventListener("storage", handleProfile);
    return () => window.removeEventListener("storage", handleProfile);
  }, []);

  // Shared classes to keep code clean
  const navItemClass = "px-4 py-2 rounded-md border border-transparent hover:border-white transition-all duration-200 text-center";
  const mobileLinkClass = "w-full text-center py-4 hover:bg-orange-600 border-b border-orange-400 last:border-none transition-colors";

  return (
    <nav className="bg-orange-500 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-between w-full space-x-4 lg:space-x-8">
            <Link to="/" className={navItemClass}>Home</Link>
            <Link to="/about" className={navItemClass}>About Us</Link>
            <Link to="#" className={navItemClass}>Rewards</Link>
            <Link to="/booking" className={navItemClass}>Book Now</Link>

            {!user ? (
              <Link to="/register" className="bg-white text-orange-500 px-5 py-2 rounded-full font-semibold hover:bg-orange-50 transition-colors">
                Register Now
              </Link>
            ) : (
              <div className="relative">
                <button
                  className="flex items-center gap-3 border border-orange-500 py-1 rounded-lg px-4 focus:outline-none group hover:border-white hover:cursor-pointer"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="h-10 w-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                    <img
                      src={user.image?.url || user.image}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium hidden lg:block">{user.firstName}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 text-gray-800 rounded-lg shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                    <Dropdown />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-orange-600 focus:outline-none transition-colors"
            >
              <span className="text-2xl">{isOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-orange-500 border-t border-orange-400 absolute w-full left-0 shadow-xl">
          <div className="flex flex-col items-center py-2">
            <Link to="/" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className={mobileLinkClass}>About Us</Link>
            <Link to="/booking" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Book Now</Link>
            
            {!user ? (
              <Link 
                to="/register" 
                onClick={() => setIsOpen(false)} 
                className="w-11/12 my-4 bg-white text-orange-500 text-center py-3 rounded-lg font-bold"
              >
                Register Now
              </Link>
            ) : (
              <div className="w-full border-t border-orange-400 mt-2">
                <div className="flex items-center justify-center gap-4 py-4 bg-orange-600">
                   <img
                      src={user.image?.url || user.image || "https://via.placeholder.com/40"}
                      alt="User"
                      className="h-12 w-12 rounded-full border-2 border-white"
                    />
                    <span className="font-bold">{user.firstName} {user.lastName}</span>
                </div>
                {/* For mobile, you might want to show Dropdown links directly */}
                <div className=" text-gray-800">
                   <Dropdown />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}