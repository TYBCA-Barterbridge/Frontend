import React, { useState, useRef, useCallback, useEffect } from "react";
import { BsPaperclip, BsSend } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../features/chat/chatSlice";
import { selectSelectedChat } from "../../features/chat/chatSlice";
import { AnimatePresence, motion } from 'framer-motion';
import { useSocket } from "../../contexts/SocketContext";

const InputArea = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef(null);
  const selectedChat = useSelector(selectSelectedChat);
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "." && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        document.getElementById("message-input").focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat?.group_id) return;

    try {
      socket.emit("sendMessage", {
        group_id: selectedChat.group_id,
        message: message.trim(),
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedChat?.group_id) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const buffer = reader.result;
      socket.emit("sendMessage", {
        group_id: selectedChat.group_id,
        attachment: buffer,
        attachment_type: "image",
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleTyping = useCallback(() => {
    if (!selectedChat?.group_id) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", {
        group_id: selectedChat.group_id,
        isTyping: true,
      });
    }

    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      setIsTyping(false);
      socket.emit("typing", {
        group_id: selectedChat.group_id,
        isTyping: false,
      });
    }, 1000);
  }, [selectedChat?.group_id, socket, isTyping]);


  const handleStopTyping = () => {
    if (isTyping && selectedChat?.group_id) {
      setIsTyping(false);
      socket.emit("typing", {
        group_id: selectedChat.group_id,
        isTyping: false,
      });
    }
  };

  if (!selectedChat) return null;

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="ml-6 p-4 border-t bg-gray-100 border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-1 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <BsPaperclip className="w-6 h-6 cursor-pointer" />
        </motion.button>

        <motion.input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />

        <motion.input
          id="message-input"
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          onBlur={handleStopTyping}
          placeholder="Type your message..."
          className="flex-1 text-sm bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors px-2 py-2"
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-1 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <BsSend className="w-6 h-6 cursor-pointer" />
        </motion.button>
      </div>
    </motion.form>
  );
};

export default InputArea;
