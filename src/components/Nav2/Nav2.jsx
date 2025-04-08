import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth"

const Nav2 = () => {
  const {user_id} = useAuth()
  return (
    <div className="hidden md:flex justify-between items-center px-8 py-2 bg-gray-100 shadow-md mb-5 relative z-40">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <div className="relative group">
          <button className="px-4 py-2 text-lg bg-gray-100 hover:bg-gray-300 rounded-md">
            All Category ↓
          </button>
          {/* Dropdown */}
          <div className="absolute left-0 bg-white shadow-md rounded-md w-37 min-w-max hidden group-hover:block z-50">
            <Link to="/Goods" className="block px-4 py-2 hover:bg-gray-200 cursor-pointer border-b border-gray-300">
              Good
            </Link>
            <Link to="/Skills" className="block px-4 py-2 hover:bg-gray-200 cursor-pointer border-b border-gray-300">
              Skill
            </Link>
            <Link to="/Workshop" className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
              Workshop
            </Link>
          </div>
        </div>

        <Link to="/customercare" className="flex items-center px-4 py-2 text-black hover:bg-gray-300 rounded-md">
          Customer Care
          <img
            src="https://img.icons8.com/?size=100&id=51413&format=png&color=000000"
            alt="Customer Care"
            className="w-5 h-5 ml-2"
          />
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {user_id === "" && (
          <Link to="/signin" className="flex items-center px-4 py-2 text-black hover:bg-gray-300 rounded-md">
          Sign in
          <img
            src="https://img.icons8.com/?size=100&id=52625&format=png&color=000000"
            alt="Sign in"
            className="w-5 h-5 ml-2"
          />
        </Link>
        )}
      </div>
    </div>
  );
};

export default Nav2;
