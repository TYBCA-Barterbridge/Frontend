import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaList, FaChalkboard, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';

const SidebarLink = ({ to, icon: Icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </button>
    );
  }

  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const LogoutModal = ({ isOpen, onClose, onLogout, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <FaSignOutAlt className="h-6 w-6 text-red-600" />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Confirm Logout</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to log out? You will need to log in again to access the admin dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={onLogout}
              disabled={isLoading}
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging out...' : 'Logout'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserMenus = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [sendLogout, { isLoading }] = useSendLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await sendLogout().unwrap();
      navigate('/');
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  return (
    <div className="flex overflow-y-hidden bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="bg-white border-r shadow-lg my-[50px] rounded-lg border-gray-200 overflow-y-none">
        <div className="p-4 space-y-2">
          <div className="px-4 py-3 mb-6">
            <h1 className="text-xl font-bold text-gray-800">User Dashboard</h1>
          </div>
          <div className="space-y-1">
            <SidebarLink to="/dashboard" icon={FaHome} label="Dashboard" />
            <SidebarLink to="/dashboard/YourListings" icon={FaList} label="Your Listings" />
            <SidebarLink to="/dashboard/Workshops" icon={FaChalkboard} label="Workshops" />
            <SidebarLink to="/dashboard/OrderHistory" icon={FaHistory} label="Order History" />
            <SidebarLink to="/dashboard/Exchanges" icon={FaHistory} label="Exchanges" />
          </div>
          <div className="pt-4 mt-4 border-t border-gray-200">
            <SidebarLink
              icon={FaSignOutAlt}
              label="Logout"
              onClick={() => setLogoutModal(true)}
            />
          </div>
        </div>
      </div>

      <LogoutModal
        isOpen={logoutModal}
        onClose={() => setLogoutModal(false)}
        onLogout={handleLogout}
        isLoading={isLoading}
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-hidden">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserMenus;