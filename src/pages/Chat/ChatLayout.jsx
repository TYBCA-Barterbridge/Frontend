import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import InputArea from "./InputArea";
import useAuth from "../../hooks/useAuth";
import { useSocket } from "../../contexts/SocketContext";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/LoadingSpinner";
import { setFriends } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useFetchFriendsQuery } from "../../features/user/userApiSlice";

const ChatLayout = () => {
  const { socket, isConnected: isSocketConnected, reconnect } = useSocket();
  const { user_id } = useAuth();
  const [isChatConnected, setIsChatConnected] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { data: friends, isLoading: isFriendsLoading, refetch } = useFetchFriendsQuery();

  useEffect(() => {
    if (friends && Array.isArray(friends)) {
      dispatch(setFriends(friends));
      console.log("FRIENDS:",friends);
    }
  }, [friends, dispatch]);

  useEffect(() => {
    if (!socket || !isSocketConnected) return;

    const connectToChat = () => {
      console.log("[ChatLayout] Attempting to join chat rooms");

      socket.emit("connectUser", {}, (response) => {
        console.log("[ChatLayout] ConnectUser response:", response);

        if (response?.success) {
          console.log("[ChatLayout] Successfully joined chat rooms");
          setIsChatConnected(true);
          setError(null);
        } else {
          console.error(
            "[ChatLayout] Failed to join chat rooms:",
            response?.error
          );
          setError(response?.error || "Failed to connect to chat rooms");
        }
      });
    };

    // Set up socket event listeners
    const handleConnect = () => {
      console.log("[ChatLayout] Socket connected, attempting to join chat");
      connectToChat();
    };

    const handleDisconnect = () => {
      console.log("[ChatLayout] Socket disconnected");
      setIsChatConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    // Initial connection attempt if socket is already connected
    if (isSocketConnected) {
      console.log(
        "[ChatLayout] Socket already connected, attempting to join chat"
      );
      connectToChat();
    }

    return () => {
      console.log("[ChatLayout] Cleaning up chat layout");
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      setIsChatConnected(false);
    };
  }, [socket, isSocketConnected, dispatch]);

  if (!user_id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600">Please log in to access the chat.</p>
        </div>
      </div>
    );
  }

  if (error || !isSocketConnected) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Connection Error</h2>
          <p className="text-gray-600">
            {error || "Unable to connect to chat server"}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Socket: {isSocketConnected ? "Connected" : "Disconnected"}
          </p>
          <button
            onClick={() => {
              setError(null);
              reconnect();
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!isChatConnected || isFriendsLoading) {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <div className="text-center">
          <LoadingSpinner size="lg" color="blue" />
        </div>
        <p className="mt-4 text-gray-600 font-medium">
          {isFriendsLoading ? "Loading friends..." : "Connecting to chat rooms..."}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex h-screen bg-black/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex w-80 bg-white shadow-md">
        <Sidebar refetch={refetch} reconnect={reconnect}/>
      </div>
      <div className="flex flex-col flex-1">
        <ChatWindow refetch={refetch} reconnect={reconnect} />
        <InputArea />
      </div>
    </motion.div>
  );
};

export default ChatLayout;
