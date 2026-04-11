import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Unknown from "./pages/Unknown";
import Orders from "./pages/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<Unknown />} />
      </Routes>
    </>
  );
}

export default App;
