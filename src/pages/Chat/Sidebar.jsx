import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsPerson, BsPeople } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { FaBell, FaGear } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import {
  useSearchUsersQuery,
  useSendFriendRequestMutation,
  useFetchFriendRequestsQuery,
  
} from "../../features/user/userApiSlice";
import {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
} from "../../features/request/requestApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectChat } from "../../features/chat/chatSlice";
import { setFriendRequests } from "../../features/user/userSlice";
import GroupCreationModal from "./GroupCreationModal";
import { useSocket } from "../../contexts/SocketContext";
import useAuth from "../../hooks/useAuth";


const Sidebar = ({ refetch, reconnect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const { socket } = useSocket();
  const { user_id } = useAuth();
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.user.friends) || [];
  const friendRequests = useSelector((state) => state.user.friendRequests) || [];
  

  // API hooks
  const { data: users, isLoading: isUsersLoading } = useSearchUsersQuery(
    searchQuery,
    { skip: !searchQuery }
  );
  const { data: requests, refetch: refetchRequests } = useFetchFriendRequestsQuery();
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [declineFriendRequest] = useDeclineFriendRequestMutation();

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const sendRequest = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleSendRequest = async () => {
    if (!selectedUser) return;
    try {
      await sendFriendRequest({ receiver_id: selectedUser.user_id }).unwrap();
      setIsModalVisible(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Error sending friend request:", err);
    }
  };

  const handleAcceptRequest = async (sender_id) => {
    try {
      await acceptFriendRequest({ sender_id }).unwrap();
      setIsNotificationsOpen(false);
      refetch();
      refetchRequests();
      reconnect();
    } catch (err) {
      if (err?.status === 400) {
        alert("You are already friends with this user");
      } else {
        alert("An error occurred while accepting the request");
        console.error("Error accepting request:", err);
      }
      setIsNotificationsOpen(false);
    }
  };

  const handleDeclineRequest = async (sender_id) => {
    try {
      await declineFriendRequest({ sender_id }).unwrap();
      setIsNotificationsOpen(false);
      refetch();
      refetchRequests();
      reconnect();
    } catch (err) {
      console.error("Error declining request:", err);
    }
  };

  useEffect(() => {
    if (requests && Array.isArray(requests)) {
      dispatch(setFriendRequests(requests));
      refetch();
      reconnect();
    } else {
      dispatch(setFriendRequests([]));
    }
  }, [requests, dispatch]);

  useEffect(() => {
    socket.on("friend-request-accepted", (data) => {
      refetch();
      reconnect();
    });
    socket.on("friend-request-declined", (data) => {
      refetch();
      reconnect();
    });
  }, [refetch, reconnect]);

  const handleChatSelect = (friend) => {
    dispatch(selectChat(friend));
  };

  const selectedChatId = useSelector(
    (state) => state.chat.selectedChat?.group_id
  );

  return (
    <motion.div
      className="flex flex-col h-screen w-[400px] bg-white border-r border-gray-200"
      initial={{ x: -400 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="flex flex-row p-4 items-center justify-between border-b border-gray-200"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h2
          className="text-lg md:text-xl font-bold text-gray-800"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Chats
        </motion.h2>
        <div className="flex gap-4">
          <motion.div
            className="relative cursor-pointer "
            whileTap={{ scale: 0.9 }}
          >
            <motion.button
              onClick={() => setIsNotificationsOpen((prev) => !prev)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <FaBell
                className="w-6 h-6 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              />
            </motion.button>
            {friendRequests.length > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                {friendRequests.length}
              </motion.span>
            )}
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <motion.button
              onClick={() => setShowGroupModal(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <BsPeople className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>
        {isNotificationsOpen && (
          <motion.div
            className="absolute top-32 left-8 w-72 bg-gray-200 rounded-lg shadow-xl z-50"
            initial={{ opacity: 1, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4">
              <h3 className="font-semibold mb-6 border-b-[1px] pb-2">
                Friend Requests
              </h3>
              {friendRequests.length === 0 ? (
                <p className="text-2xl">No new requests</p>
              ) : (
                <ul className="space-y-2">
                  {friendRequests.map((request) => {
                    const sender = request.Sender || {};
                    return (
                      <li
                        key={request.request_id}
                        className="flex items-center justify-between"
                      >
                        <span>{sender.username || "Unknown User"}</span>
                        <div className="flex gap-2">
                          <button
                            className="font-semibold text-green-500 hover:bg-blue-700 bg-white py-1 px-1.5 rounded-2xl cursor-pointer"
                            onClick={() => handleAcceptRequest(sender.user_id)}
                            aria-label={`Accept request from ${
                              sender.username || "user"
                            }`}
                          >
                            Accept
                          </button>
                          <button
                            className="font-semibold text-red-500 hover:bg-blue-700  bg-white py-1 px-1.5 rounded-2xl cursor-pointer"
                            onClick={() => handleDeclineRequest(sender.user_id)}
                            aria-label={`Decline request from ${
                              sender.username || "user"
                            }`}
                          >
                            Decline
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="px-4 py-3 border-b border-gray-200"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            className="w-full p-2 border-gray-400 border-2 rounded-lg focus:ring-1 text-left"
            onChange={handleSearchChange}
          />
          <BiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        </div>
      </motion.div>

      <motion.div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {searchQuery && (
            <motion.div className="relative mt-2 mx-2">
              {isUsersLoading ? (
                <p>Loading...</p>
              ) : (
                <ul className="space-y-2">
                  {users?.map((user) => (
                    <motion.li
                      key={user.user_id}
                      className="p-2 bg-gray-100 rounded-lg hover:text-white hover:bg-gray-500  cursor-pointer flex items-center justify-between"
                      onClick={() => sendRequest(user)}
                      whileHover={{ scale: 1.02 }}  
                    >
                      {
                        user.user_id !== user_id ? (
                          <>
                          <span>{user.username}</span>
                          <BsPerson />
                          </>
                        ) : null
                      }
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Friends</h2>
          </div>
          <div className="space-y-2">
            {Array.isArray(friends) && friends.length > 0 ? (
              friends.map((friend) => (
                <motion.div
                  key={friend.group_id}
                  onClick={() => handleChatSelect(friend)}
                  className={`p-3 flex items-center gap-3 rounded-lg hover:bg-gray-300 cursor-pointer
                    ${selectedChatId === friend.group_id ? "bg-gray-300" : ""}
                  `}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                      {friend.profile || friend.img ? (
                        <img
                          src={friend.profile || friend.img}
                          alt={friend.username || friend.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BsPerson className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    {friend.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {friend.unreadCount}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {friend.username || friend.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {friend.lastMessage?.content || "No messages yet"}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No friends yet</p>
            )}
          </div>
        </div>
      </motion.div>

      {isModalVisible && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3>Send Friend Request to {selectedUser.username}?</h3>
            <div className="flex gap-4 mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSendRequest}
              >
                Send
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onClick={() => setIsModalVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <GroupCreationModal
        isOpen={showGroupModal}
        onClose={() => {
          refetch();
          setShowGroupModal(false);
          reconnect();
        }}
        friends={friends.filter((friend) => !friend.isGroup)}
      />

      <motion.div className="flex flex-row items-center justify-between p-2 border-t border-gray-300 bg-gray-100">
        <Link to="/chat/profile">
          <motion.button className="w-[300px] text-lg flex items-center p-3 text-gray-700 hover:text-blue-500 hover:bg-blue-100 transition-colors duration-300 rounded-md shadow-sm">
            <FaGear className="w-6 h-6 mr-4" />
            Profile
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
