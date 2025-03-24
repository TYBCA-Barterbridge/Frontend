import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    let newSocket = null;

    const initSocket = () => {
      if (!token) {
        console.log("[SocketProvider] No token available");
        return;
      }

      // Close existing socket if any
      if (socket) {
        console.log("[SocketProvider] Closing existing socket");
        socket.disconnect();
      }

      console.log("[SocketProvider] Initializing socket with token");

      // Create new socket with proper configuration
      newSocket = io("http://localhost:3500", {
        transports: ["websocket", "polling"],
        withCredentials: true,
        auth: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 10000
      });

      // Set up event handlers
      newSocket.on("connect", () => {
        console.log("[SocketProvider] Socket connected:", newSocket.id);
        setIsConnected(true);
      });

      newSocket.on("connect_error", (error) => {
        console.error("[SocketProvider] Connection error:", error.message);
        setIsConnected(false);
      });

      newSocket.on("disconnect", (reason) => {
        console.log("[SocketProvider] Socket disconnected:", reason);
        setIsConnected(false);
      });

      // Set socket in state
      setSocket(newSocket);
    };

    initSocket();

    // Cleanup function
    return () => {
      if (newSocket) {
        console.log("[SocketProvider] Cleaning up socket");
        newSocket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
    };
  }, [token]);

  // Provide socket, connection state, and reconnect function
  const value = {
    socket,
    isConnected,
    reconnect: () => {
      console.log("[SocketProvider] Attempting to reconnect");
      if (socket) {
        socket.connect();
      } else {
        initSocket();
      }
    }
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;

