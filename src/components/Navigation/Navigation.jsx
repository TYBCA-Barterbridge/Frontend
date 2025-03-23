import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between w-full px-4 md:px-8 py-4 bg-[#1B6392] text-white shadow-md sticky top-0 z-50 backdrop-blur-md">
      {/* Left Section: Logo */}
      <Link to="/" className="text-xl md:text-2xl font-bold text-white no-underline">
        BarterBridge
      </Link>

      {/* Center Section: Search Bar (Hidden when menu is open) */}
      {!isOpen && (
        <div className="flex items-center flex-grow mx-4 md:mx-8 max-w-xs md:max-w-lg bg-white rounded-md shadow-md">
          <input
            type="text"
            placeholder="Search any Product or Skills"
            className="w-full h-10 px-4 text-sm md:text-lg outline-none placeholder-gray-400 text-gray-500 rounded-l-md"
          />
          <button className=" px-3 py-2 rounded-r-md hover:scale-150 transition">
            <FaSearch className="text-gray-600" />
          </button>
        </div>
      )}

      {/* Right Section: Mobile Menu Button (Hidden on Desktop) */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop Navigation Icons */}
      <ul className="hidden md:flex gap-6 md:gap-12 items-center">
        <li className="flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-110">
          <Link to="/Wishlist">
            <img
              src="https://img.icons8.com/?size=100&id=37975&format=png&color=FFFFFF"
              alt="Like"
              className="w-9 h-9"
            />
          </Link>
          <span className="text-sm font-semibold">Wishlist</span>
        </li>
        <li className="flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-110">
          <Link to="/Profile">
            <img
              src="https://img.icons8.com/?size=100&id=7819&format=png&color=FFFFFF"
              alt="Profile"
              className="w-9 h-9"
            />
          </Link>
          <span className="text-sm font-semibold">Profile</span>
        </li>
      </ul>

      {/* Mobile Navigation Menu (Stacked when open) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#1B6392] py-6 flex flex-col items-center space-y-6 shadow-lg">
          <Link
            to="/Wishlist"
            className="flex items-center gap-2 text-lg font-semibold"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="https://img.icons8.com/?size=100&id=37975&format=png&color=FFFFFF"
              alt="Wishlist"
              className="w-7 h-7"
            />
            Wishlist
          </Link>
          <Link
            to="/Profile"
            className="flex items-center gap-2 text-lg font-semibold"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="https://img.icons8.com/?size=100&id=7819&format=png&color=FFFFFF"
              alt="Profile"
              className="w-7 h-7"
            />
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
