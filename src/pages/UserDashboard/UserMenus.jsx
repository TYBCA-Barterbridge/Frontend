import React, { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaList, FaChalkboard, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { motion, AnimatePresence } from "framer-motion";

const SidebarLink = ({ to, icon: Icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  if (onClick) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50"
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </Link>
    </motion.div>
  );
};

const LogoutModal = ({ isOpen, onClose, onLogout, isLoading }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 sm:max-w-md w-full"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="text-center">
              <FaSignOutAlt className="text-red-600 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Logout</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to log out? You will need to log in again to access the admin dashboard.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={onLogout}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-md hover:bg-red-500 disabled:opacity-50"
                >
                  {isLoading ? "Logging out..." : "Logout"}
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const UserMenus = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [sendLogout, { isLoading }] = useSendLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await sendLogout().unwrap();
      navigate("/");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <motion.div
      className="flex w-full h-screen bg-gray-50" // Set height to screen
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Sidebar */}
      <motion.div
        className="bg-white shadow-md shadow-gray-400 p-6 space-y-4 w-64 h-full overflow-auto" // Sidebar scrollable
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <h1 className="text-xl font-bold text-gray-800 mb-6">User Dashboard</h1>
        <div className="space-y-3">
          <SidebarLink to="/dashboard" icon={FaHome} label="Dashboard" />
          <SidebarLink to="/dashboard/YourListings" icon={FaList} label="Your Listings" />
          <SidebarLink to="/dashboard/Workshops" icon={FaChalkboard} label="Workshops" />
          <SidebarLink to="/dashboard/OrderHistory" icon={FaHistory} label="Order History" />
          <SidebarLink to="/dashboard/Exchanges" icon={FaHistory} label="Exchanges" />
        </div>
        <div className="pt-4 border-t border-gray-200">
          <SidebarLink
            icon={FaSignOutAlt}
            label="Logout"
            onClick={() => setLogoutModal(true)}
          />
        </div>
      </motion.div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={logoutModal}
        onClose={() => setLogoutModal(false)}
        onLogout={handleLogout}
        isLoading={isLoading}
      />

      {/* Main Content */}
      <motion.div
        className="flex-1 p-8 h-full overflow-auto " // Content scrollable
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <Outlet />
      </motion.div>
    </motion.div>
  );
};

export default UserMenus;
