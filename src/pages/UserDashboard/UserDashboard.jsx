import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { FaUser, FaShoppingBag, FaExchangeAlt, FaCog, FaSignOutAlt, FaBars, FaTimes, FaHome, FaStore, FaHandshake, FaGraduationCap } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useGetUserProfileQuery } from "../../features/user/userApiSlice";
import { useGetOrderHistoryQuery } from "../../features/good/goodApiSlice";
import { useGetSkillOrderHistoryQuery } from "../../features/skill/skillApiSlice";
import { useGetWorkshopByAdminQuery } from "../../features/workshop/workshopApiSlice";

const UserDashboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: userProfile, isLoading: isProfileLoading } = useGetUserProfileQuery();
  const { data: orderHistory, isLoading: isOrderLoading } = useGetOrderHistoryQuery();
  const { data: skillOrderHistory, isLoading: isSkillOrderLoading } = useGetSkillOrderHistoryQuery();
  const { data: workshops, isLoading: isWorkshopLoading } = useGetWorkshopByAdminQuery();

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: "/dashboard", icon: <FaHome />, label: "Dashboard" },
    { path: "/dashboard/profile", icon: <FaUser />, label: "Profile" },
    { path: "/dashboard/orders", icon: <FaShoppingBag />, label: "Orders" },
    { path: "/dashboard/exchanges", icon: <FaExchangeAlt />, label: "Exchanges" },
    { path: "/dashboard/skills", icon: <FaGraduationCap />, label: "Skills" },
    { path: "/dashboard/workshops", icon: <FaStore />, label: "Workshops" },
    { path: "/dashboard/barter", icon: <FaHandshake />, label: "Barter" },
    { path: "/dashboard/settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className={`text-xl font-bold ${!isSidebarOpen && "hidden"}`}>
            Dashboard
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 ${
                isActive(item.path) ? "bg-orange-50 text-orange-500" : ""
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isSidebarOpen && (
                <span className="ml-3">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <FaSignOutAlt className="text-xl" />
            {isSidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 