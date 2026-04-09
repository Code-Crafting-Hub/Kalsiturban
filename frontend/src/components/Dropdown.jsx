import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Dropdown() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${backendURL}/users/logout`,{},{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(`${response.data.message}`);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.log("Error in logging out user", error);
      toast.error("Error in logging out user");
    }
  };

  return (
    <div className="flex flex-col dropDownProfile">
      <Toaster />
      <span className="flex flex-col">
        <Link
          to="/profile"
          className="hover:bg-gray-400 hover:cursor-pointer px-4 py-2 rounded hover:text-white my-1 mx-2"
        >
          Profile
        </Link>
        <Link className="hover:bg-gray-400 hover:cursor-pointer px-4 py-2 rounded hover:text-white my-1 mx-2">
          Orders
        </Link>
        <Link className="hover:bg-gray-400 hover:cursor-pointer px-4 py-2 rounded hover:text-white my-1 mx-2" onClick={handleLogout}>
          Logout
        </Link>
      </span>
    </div>
  );
}
