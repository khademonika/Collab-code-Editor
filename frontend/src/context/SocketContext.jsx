import { createContext, useContext, useRef } from "react";
import { io } from "socket.io-client";
import React from "react";
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  if (!socketRef.current) {
    socketRef.current = io("https://collab-code-editor-1-fut6.onrender.com", { transports:["websocket"] });
  }

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
