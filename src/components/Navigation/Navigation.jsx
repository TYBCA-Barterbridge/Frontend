import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetGoodQuery } from "../../features/good/goodApiSlice";
import { useGetSkillQuery } from "../../features/skill/skillApiSLice";
import { useGetUsersQuery } from "../../features/user/userApiSlice";

const Navigation = () => {
  const {data: goods} = useGetGoodQuery();
  const {data: skills} = useGetSkillQuery();
  const {data: user} = useGetUsersQuery();
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (search.startsWith('@')) {
      // Search users
      const searchTerm = search.slice(1).toLowerCase();
      const filteredUsers = (user || []).filter(u => 
        (u.fname || u.email || '').toLowerCase().includes(searchTerm)
      );
      console.log(filteredUsers);
    } else {
      // Search goods and skills
      const combinedList = [...(goods || []), ...(skills || [])];
      const filteredItems = combinedList.filter(item => 
        (item.good_name || item.skill_name || '').toLowerCase().includes(search.toLowerCase())
      );
      console.log(filteredItems);
    }
  }

  return (
    <nav className="flex justify-between items-center w-full h-[75px] px-8 bg-[#1B6392] text-white shadow-md sticky top-0 z-50 backdrop-blur-md">
      {/* Logo */}
      <Link to={'/'} className="text-2xl font-bold ml-10 text-white no-underline">
        BarterBridge
      </Link>

      {/* Search Bar */}
      <div className="flex items-center mx-8">
        <input
          type="text"
          placeholder="Search any Product or Skills"
          className="w-[500px] h-10 px-4 text-lg outline-none shadow-md rounded-l-md placeholder-gray-400 bg-white text-gray-500"
          onChange= {(e) => setSearch(e.target.value)}
        />
        <button 
          className="bg-gray-300 p-2 shadow-md rounded-r-md hover:bg-gray-400 transition"
          onClick={handleSearch}
        >
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
          <Link to={'/Wishlist'}>
            <img
              src="https://img.icons8.com/?size=100&id=37975&format=png&color=FFFFFF"
              alt="Like"
              className="w-9 h-9"
            />
          </Link>
          <span className="text-sm font-semibold">Wishlist</span>
        </li>
        <li className="flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-110">
        <Link to={'/Profile'}>
            <img
              src="https://img.icons8.com/?size=100&id=7819&format=png&color=FFFFFF"
              alt="Profile"
              className="w-9 h-9"
            />
          </Link>
          <span className="text-sm font-semibold">Profile</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;