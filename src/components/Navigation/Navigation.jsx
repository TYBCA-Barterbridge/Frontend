import React from "react";

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center w-full h-[75px] px-8 bg-[#1B6392] text-white shadow-md sticky top-0 z-50 backdrop-blur-md">
      {/* Logo */}
      <a href="./Home" className="text-2xl font-bold ml-10 text-white no-underline">
        BarterBridge
      </a>

      {/* Search Bar */}
      <div className="flex items-center mx-8">
        <input
          type="text"
          placeholder="Search any Product or Skills"
          className="w-[500px] h-10 px-4 text-lg outline-none shadow-md rounded-l-md placeholder-gray-400 bg-white text-gray-500" 
        />
        <button className="bg-gray-300 p-2 shadow-md rounded-r-md hover:bg-gray-400 transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
            alt="Search"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Navigation Icons */}
      <ul className="flex gap-12 mr-10 list-none">
        <li className="flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-110">
          <a href="./ShoppingCart">
            <img
              src="https://img.icons8.com/?size=100&id=ZyDjBTUuqB78&format=png&color=FFFFFF"
              alt="Cart"
              className="w-9 h-9"
            />
          </a>
          <span className="text-sm font-semibold">Cart</span>
        </li>
        <li className="flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-110">
          <a href="./Wishlist">
            <img
              src="https://img.icons8.com/?size=100&id=37975&format=png&color=FFFFFF"
              alt="Like"
              className="w-9 h-9"
            />
          </a>
          <span className="text-sm font-semibold">Wishlist</span>
        </li>
        <li className="flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-110">
          <a href="./Profile">
            <img
              src="https://img.icons8.com/?size=100&id=7819&format=png&color=FFFFFF"
              alt="Profile"
              className="w-9 h-9"
            />
          </a>
          <span className="text-sm font-semibold">Profile</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;