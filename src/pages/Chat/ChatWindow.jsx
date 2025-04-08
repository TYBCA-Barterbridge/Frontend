import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useMemo, useState } from "react";
import { useFetchMessagesbyGroupMutation } from "../../features/chat/chatApiSlice";
import {
  setMessages,
  updateMessageStatus,
  addMessage,
} from "../../features/chat/chatSlice";
import {
  BsEmojiSmile,
  BsPerson,
  BsCheck2,
  BsCheck2All,
  BsArrowDown,
} from "react-icons/bs";
import { useSocket } from "../../contexts/SocketContext";
import { motion, AnimatePresence } from "framer-motion";
import UserProfileSection from "./UserProfileSection";
import { formatTime, formatDate } from "../../utils/formatters";
import useAuth from "../../hooks/useAuth";

const ChatWindow = ({ refetch, reconnect }) => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const messages = useSelector((state) => state.chat.messages);
  const messagesEndRef = useRef(null);
  const [fetchMessagesbyGroup] = useFetchMessagesbyGroupMutation();
  const { socket } = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const friends = useSelector((state) => state.user.friends);
  const { user_id } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (messagesEndRef.current) {
      const rect = messagesEndRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setIsScrolled(rect.y > windowHeight);
    }
  };

  const handleUserClick = (user) => {
    if (!user) return;
    const userProfile = {
      user_id: user.user_id || user.group_id,
      username: user.username || user.title,
      profile: user.profile || user.img,
      bio: user.bio,
    };
    setSelectedUser(userProfile);
  };

  const handleCloseProfile = () => setSelectedUser(null);

  const handleFetch = async (group_id) => {
    try {
      const result = await fetchMessagesbyGroup({ group_id }).unwrap();
      const messages = JSON.parse(JSON.stringify(result.messages));
      dispatch(setMessages(messages));
    } catch (err) {
      console.error("Error fetching messages by group:", err);
    }
  };

  const handleRightClick = (e, message) => {
    e.preventDefault();
    setContextMenu({
      x: e.pageX,
      y: e.pageY,
      message,
    });
  };

  const handleReply = () => {
    setReplyTo(contextMenu.message);
    setContextMenu(null);
  };

  const closeContextMenu = () => setContextMenu(null);

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedChat?.group_id) {
      handleFetch(selectedChat.group_id);
    }
  }, [selectedChat?.group_id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket || !selectedChat) return;

    socket.emit("joinChat", selectedChat.group_id);

    const handleNewMessage = (message) => {
      dispatch(addMessage(message));
    };
    const handleMessageStatus = ({ message_id, status }) => {
      dispatch(updateMessageStatus({ message_id, status }));
    };
    const handleUserTyping = ({ user_id, isTyping }) => {
      setTypingUser(isTyping ? user_id : null);
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("messageStatus", handleMessageStatus);
    socket.on("userTyping", handleUserTyping);

    if (messages.length > 0) {
      const unreadMessages = messages.filter((msg) => msg.status !== "read");
      if (unreadMessages.length > 0) {
        socket.emit("markAsRead", {
          message_id: unreadMessages[0].message_id,
          group_id: selectedChat.group_id,
        });
      }
    }

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messageStatus", handleMessageStatus);
      socket.off("userTyping", handleUserTyping);
    };
  }, [socket, selectedChat, messages, dispatch]);

  const groupedMessages = useMemo(() => {
    const groups = {};
    messages.forEach((message) => {
      const date = formatDate(message.time_created);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  }, [messages]);

  return (
    <motion.div
      className="chat-container md:ml-6 flex-1 flex flex-col bg-gray-50 h-[calc(100vh-120px)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={closeContextMenu}
    >
      {/* Header */}
      <motion.div
        className="w-full px-4 py-2 md:px-6 md:py-4 bg-gray-100 flex items-center justify-between "
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {selectedChat && (
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-blue-100 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleUserClick(selectedChat)}
            >
              {selectedChat?.profile || selectedChat?.img ? (
                <img
                  src={selectedChat.profile || selectedChat.img}
                  alt={selectedChat.username || selectedChat.title}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <BsPerson className="w-6 h-6 md:w-10 md:h-10 text-blue-600" />
              )}
            </motion.div>
            <div className="ml-3">
              <motion.h2 className="text-sm md:text-lg font-semibold text-gray-800">
                {selectedChat.username || selectedChat.title}
              </motion.h2>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Messages */}
      {selectedChat ? (
        <motion.div
          className="flex-1 overflow-y-auto p-6 space-y-4 h-[calc(100vh-150px)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {replyTo && (
            <div className="px-4 py-2 bg-gray-100 text-gray-600 text-sm border-l-4 border-blue-400 mb-2">
              Replying to: {replyTo.content.slice(0, 50)}...
              <button
                onClick={() => setReplyTo(null)}
                className="ml-2 text-blue-600 underline text-xs"
              >
                Cancel
              </button>
            </div>
          )}

          <AnimatePresence>
            {Object.entries(groupedMessages).map(([date, dateMessages]) => (
              <div key={date} className="space-y-4">
                <div className="flex justify-center">
                  <span className="bg-gray-200 px-3 py-1 rounded-full text-base text-gray-600">
                    {date}
                  </span>
                </div>
                {dateMessages.map((msg, index) => (
                  <motion.div
                    key={msg.message_id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      msg.sender_id === user_id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        msg.sender_id === user_id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      } rounded-lg px-4 py-2`}
                      onContextMenu={(e) => handleRightClick(e, msg)}
                    >
                      {msg.isGroup && (
                        <p className="text-sm font-semibold text-black">
                          {msg.username}
                        </p>
                      )}
                      <p className="text-base">
                        {(msg.content || "").split(" ").map((word, i) => {
                          const urlPattern = /^(https?:\/\/[^\s]+)/;
                          if (urlPattern.test(word)) {
                            return (
                              <a
                                key={i}
                                href={word}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-950 underline"
                              >
                                {word}
                              </a>
                            );
                          }
                          return word + " ";
                        })}
                      </p>

                      {msg.attachment && msg.attachment_type === "image" && (
                        <div
                          className="max-w-[300px] rounded-lg overflow-hidden cursor-pointer"
                          onClick={() => setPreviewImage(msg.attachment)}
                        >
                          <img
                            src={msg.attachment}
                            alt="Shared image"
                            className="w-full h-auto object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-end gap-1 mt-1 text-xs">
                        <span>{formatTime(msg.time_created)}</span>
                        {msg.sender_id === user_id && (
                          <span>
                            {msg.status === "read" ? (
                              <BsCheck2All className="text-blue-400" />
                            ) : msg.status === "delivered" ? (
                              <BsCheck2All />
                            ) : (
                              <BsCheck2 />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </AnimatePresence>

          <div ref={messagesEndRef} />
          {typingUser && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 rounded-lg p-3">
                {selectedChat?.isGroup ? (
                  <p className="text-sm text-gray-500">
                    {typingUser} is typing...
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">Typing...</p>
                )}
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div className="flex-1 overflow-y-auto p-6 space-y-4 h-[calc(100vh-150px)]">
          <div className="flex flex-col justify-center items-center h-full">
            <BsPerson className="w-24 h-24 text-gray-500" />
            <p className="text-2xl text-gray-500">No chat selected</p>
          </div>
        </motion.div>
      )}

      {/* Scroll Button */}
      {isScrolled && (
        <motion.button
          className="fixed bottom-20 right-10 m-4 text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToBottom}
        >
          <BsArrowDown className="size-12 p-3 rounded-2xl bg-black text-white" />
        </motion.button>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="absolute b-10  z-50 bg-white shadow-xl rounded-md border border-gray-200"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={closeContextMenu}
          onContextMenu={(e) => e.preventDefault()}
        >
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={() => {
              navigator.clipboard.writeText(contextMenu.message.content);
              closeContextMenu();
            }}
          >
            Copy
          </button>
        </div>
      )}

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
          >
            <motion.img
              src={previewImage}
              alt="Preview"
              className="max-w-[90%] max-h-[90%] object-contain rounded-lg shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile Panel */}
      <AnimatePresence>
        {selectedUser && (
          <UserProfileSection
            onClose={handleCloseProfile}
            refetch={refetch}
            reconnect={reconnect}
            friends={friends.filter((friend) => !friend.isGroup)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChatWindow;
