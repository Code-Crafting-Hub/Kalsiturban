import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Dropdown() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${backendURL}/users/logout`, {}, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      
      toast.success(response.data.message || "Logged out successfully");
      
      // Clean up local data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect or refresh
      setTimeout(() => {
        navigate("/"); // Navigate to home instead of just refreshing 0
        window.location.reload(); // Ensure state is wiped
      }, 1000);
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to logout");
    }
  };

  // Common styling for links
  const linkStyle = "block px-4 py-2.5 text-sm md:text-base text-gray-700 hover:bg-orange-500 hover:text-white transition-colors duration-200 md:rounded-md mx-1";

  return (
    <div className="flex flex-col bg-white md:border md:shadow-xl md:rounded-xl overflow-hidden min-w-[160px]">
      <div className="flex flex-col py-1">
        <Link to="/profile" className={linkStyle}>
          <div className="flex items-center gap-2">
            <span>👤</span> Profile
          </div>
        </Link>
        
        <Link to="/orders" className={linkStyle}>
          <div className="flex items-center gap-2">
            <span>📦</span> Orders
          </div>
        </Link>
        
        <hr className="my-1 border-gray-100 hidden md:block" />
        
        <button 
          onClick={handleLogout}
          className={`${linkStyle} text-left w-full text-red-600 hover:bg-red-500`}
        >
          <div className="flex items-center gap-2">
            <span>🚪</span> Logout
          </div>
        </button>
      </div>
    </div>
  );
}