import React, { useState } from "react";
import {
  useGetUserByIdQuery,
  useSendFriendRequestMutation,
  useFetchFriendRequestsQuery,
} from "../../features/user/userApiSlice";
import { useParams } from "react-router-dom";
import {
  FaBox,
  FaTools,
  FaChalkboardTeacher,
  FaUsers,
  FaUserPlus,
  FaSpinner,
} from "react-icons/fa";
import { format, isValid } from "date-fns";
import { motion } from "framer-motion";

// Format Functions
const formatDate = (dateString) => {
  if (!dateString) return "Not specified";
  const date = new Date(dateString);
  return isValid(date) ? format(date, "MMM d, yyyy") : "Invalid date";
};

const formatDateTime = (dateString) => {
  if (!dateString) return "Not specified";
  const date = new Date(dateString);
  return isValid(date)
    ? format(date, "MMM d, yyyy 'at' h:mm a")
    : "Invalid date";
};

// Framer Motion Variants
const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const buttonVariant = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
};

const fadeVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// StatCard Component
const StatCard = ({ icon: Icon, title, value, change }) => (
  <motion.div
    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200"
    variants={cardVariant}
  >
    <div className="flex items-center justify-between mb-4">
      <div
        className={`p-2 rounded-full ${
          title === "Total Goods Listed"
            ? "bg-purple-50"
            : title === "Total Skills Offered"
            ? "bg-green-50"
            : "bg-blue-50"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${
            title === "Total Goods Listed"
              ? "text-purple-500"
              : title === "Total Skills Offered"
              ? "text-green-500"
              : title === "Total Workshops Created"
              ? "text-blue-500"
              : "text-orange-500"
          }`}
        />
      </div>
      <p className="text-2xl font-semibold text-gray-900 flex items-center justify-center">
        {value}
      </p>
    </div>
    <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
    {change !== undefined && (
      <div className="flex items-baseline">
        <span
          className={`ml-2 text-sm font-medium ${
            change > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {change > 0 ? "+" : ""}
          {change}%
        </span>
      </div>
    )}
  </motion.div>
);

// Main Page
const UserProfileView = () => {
  const { userId } = useParams();
  const { data: user, isLoading, error } = useGetUserByIdQuery(userId);
  const [sendFriendRequest, { isLoading: isSendingRequest }] =
    useSendFriendRequestMutation();
  const { data: friendRequests = [], refetch: refetchRequests } =
    useFetchFriendRequestsQuery();
  const [requestSent, setRequestSent] = useState(false);
  const [chatError, setChatError] = useState(null);

  const handleSendRequest = async () => {
    try {
      await sendFriendRequest({ receiver_id: userId }).unwrap();
      setRequestSent(true);
      refetchRequests();
    } catch (error) {
      console.error("Failed to send friend request:", error);
      if (error.status === 400) {
        setChatError("Already sent friend request");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error loading user profile</div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pb-10"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeVariant}
    >
      {/* Header */}
      <motion.div className="relative" initial="hidden" animate="visible" variants={fadeVariant}>
        <div className="h-40 sm:h-48 bg-gradient-to-b from-[#1B6392] to-[#749fa7] rounded-b-[48px] sm:rounded-b-[64px]" />
        <motion.div
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
          variants={cardVariant}
        >
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
            <img
              src={user.user.User.profilepic || "https://via.placeholder.com/96"}
              alt={user.user.User.fname}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        {/* User Info & Button */}
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeVariant}
        >
          <p className="text-gray-500 text-2xl font-semibold">
            {user.user.User.username || "Member"}
          </p>
          <p className="text-lg text-gray-500 mt-1">{user.user.state}</p>

          <motion.button
            onClick={handleSendRequest}
            disabled={isSendingRequest || requestSent}
            className={`mt-4 flex items-center px-4 py-2 rounded-lg ${
              requestSent
                ? "bg-green-100 text-green-800"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            variants={buttonVariant}
            whileHover="hover"
          >
            {isSendingRequest ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <FaUserPlus className="mr-2" />
            )}
            {chatError
              ? "Already sent friend request"
              : requestSent
              ? "Request Sent"
              : "Add Friend"}
          </motion.button>
        </motion.div>

        {/* Grid Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Left Panel */}
          <motion.div className="space-y-6" variants={cardVariant}>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 mt-1">
                Personal Info
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="mt-1 mb-6 ">
                    {user.user.User.fname} {user.user.User.lname}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Joined</p>
                  <p className="mt-1 mb-6">
                    {formatDateTime(user.user.User.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Mobile</p>
                  <p className="mt-1 mb-6">{user.user.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1 mb-6">{user.user.User.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="mt-1 mb-6">{user.user.state}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            className="md:col-span-1 lg:col-span-2 space-y-6"
            variants={cardVariant}
          >
            <motion.div className="min-h-[160px] bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 whitespace-pre-line">
                {user.user.User.bio}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={staggerContainer}
            >
              <StatCard
                icon={FaBox}
                title="Total Goods Listed"
                value={user.totalGoodsListed}
              />
              <StatCard
                icon={FaTools}
                title="Total Skills Offered"
                value={user.totalSkillsOffered}
              />
              <StatCard
                icon={FaChalkboardTeacher}
                title="Total Workshops Created"
                value={user.totalWorkshopsOffered}
              />
              <StatCard
                icon={FaUsers}
                title="Participated in Workshops"
                value={user.totalWorkshopParticipants}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserProfileView;
