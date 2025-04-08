import React from "react";
import { BiMessage } from "react-icons/bi";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useFetchFriendRequestsQuery } from "../features/user/userApiSlice";

const ChatIcon = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: friendRequests = [] } = useFetchFriendRequestsQuery();

  const handleChat = () => {
    if (location.pathname === "/chat") {
      navigate("/");
    } else {
      navigate("/chat");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-4 right-4 bg-white w-15 h-15 border-2 border-white text-orange-500 text-2xl flex justify-center items-center rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-lg active:scale-95 active:shadow-md z-50"
    >
      <BiMessage
        className="w-[45px] h-[45px] text-orange-500"
        onClick={handleChat}
      />
      {friendRequests.length > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {friendRequests.length}
        </div>
      )}
    </motion.div>
  );
};

export default ChatIcon;
