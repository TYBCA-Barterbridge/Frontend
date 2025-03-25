import React from 'react';
import { useGetUserByIdQuery } from '../../features/user/userApiSlice';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLanguage } from 'react-icons/fa';
import { format, isValid } from 'date-fns';

const formatDate = (dateString) => {
  if (!dateString) return 'Not specified';
  const date = new Date(dateString);
  return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid date';
};

const formatDateTime = (dateString) => {
  if (!dateString) return 'Not specified';
  const date = new Date(dateString);
  return isValid(date) ? format(date, "MMM d, yyyy 'at' h:mm a") : 'Invalid date';
};

const StatCard = ({ icon: Icon, title, value, change, period = '7 days' }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-full ${title === 'Total Revenue' ? 'bg-purple-50' : title === 'New Orders' ? 'bg-green-50' : 'bg-blue-50'}`}>
        <Icon className={`w-6 h-6 ${title === 'Total Revenue' ? 'text-purple-500' : title === 'New Orders' ? 'text-green-500' : 'text-blue-500'}`} />
      </div>
      <span className="text-xs text-gray-500">{period}</span>
    </div>
    <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
    <div className="flex items-baseline">
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      {change && (
        <span className={`ml-2 text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      )}
    </div>
  </div>
);

const ActivityItem = ({ icon: Icon, title, time, link, linkText }) => (
  <div className="flex items-start space-x-3 py-3">
    <div className="flex-shrink-0">
      <div className="w-2 h-2 mt-2 rounded-full bg-blue-600" />
    </div>
    <div className="flex-grow">
      <p className="text-sm text-gray-900">
        {title}
        {linkText && (
          <a href={link} className="text-blue-600 hover:text-blue-700 ml-1">
            {linkText}
          </a>
        )}
      </p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);

const UserProfileView = ({ userId }) => {
  const { data: user, isLoading, error } = useGetUserByIdQuery(userId);
  console.log(user);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading user profile
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header Banner */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-b from-[#1B6392] to-blue-600 rounded-b-[64px]" />
        <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2">
          <div className="w-56 h-56 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
            <img 
              src={user.User.profilepic || 'https://via.placeholder.com/96'} 
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="text-center mb-8">
          <p className="text-gray-500 text-2xl font-semibold">{user.User.username || 'Member'}</p>
          <p className="text-lg text-gray-500 mt-1">{user.state}</p>
          
          <div className="flex justify-center space-x-4 mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add to Friends
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Info</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full name</p>
                  <p className="mt-1">{user.User.fname} {user.User.lname}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Joined</p>
                  <p className="mt-1">{formatDateTime(user.User.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Mobile</p>
                  <p className="mt-1">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1">{user.User.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="mt-1">{user.state}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column - About & Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="h-[210px] bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 whitespace-pre-line">{user.User.bio}</p>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard 
                icon={FaEnvelope}
                title="Total Revenue"
                value="$8,141"
                change={3}
              />
              <StatCard 
                icon={FaPhone}
                title="New Orders"
                value="217"
                change={5}
              />
              <StatCard 
                icon={FaMapMarkerAlt}
                title="New Connections"
                value="54"
                change={7}
              />
            </div>   */}

            {/* <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Log</h2>
              <div className="space-y-1">
                <ActivityItem
                  title="Profile information changed"
                  time="3 min ago"
                />
                <ActivityItem
                  title="Connected with"
                  linkText="Colby Covington"
                  time="15 min ago"
                />
                <ActivityItem
                  title="Invoice"
                  linkText="#4563"
                  time="57 min ago"
                  link="#"
                />
                <ActivityItem
                  title="Message received from"
                  linkText="Cecilia Hendric"
                  time="1 hour ago"
                />
                <ActivityItem
                  title="New order received"
                  linkText="#OR9653"
                  time="2 hours ago"
                  link="#"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView; 