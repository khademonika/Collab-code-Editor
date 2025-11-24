// import { createContext, useState, useContext } from "react";
// import axios from "axios";
import React from "react";
// import  { useAuth } from "./AuthContext"
// export const RoomContext = createContext();

// const RoomProvider = ({ children }) => {
//   const { token } = useAuth();
//   const [rooms, setRooms] = useState([]);

//   const createRoom = async (roomName, description) => {
//     console.log("Using token:", token);

//     const res = await axios.post(
//       "/api/room/create-room",
//       { roomName, description },
//       {
//         headers: { Authorization: `Bearer ${token}` }
//       }
//     );
//     return res.data.room;
//   };

//   const joinRoom = async (roomCode) => {
//     const res = await axios.post(
//       "/api/room/join",
//       { roomCode },
//       {
//         headers: { Authorization: `Bearer ${token}` }
//       }
//     );
//     return res.data.room;
//   };

//   const fetchMyRooms = async () => {
//     const res = await axios.get("/api/room/my-rooms", {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setRooms(res.data.rooms);
//   };

//   return (
//     <RoomContext.Provider value={{ rooms, createRoom, joinRoom, fetchMyRooms }}>
//       {children}
//     </RoomContext.Provider>
//   );
// };

// export default RoomProvider;

import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const { token } = useAuth();  // NOW this returns correct token
  const [rooms, setRooms] = useState([]);

  // const createRoom = async (roomName, description) => {
  //   console.log("Using token:", token);   // DEBUG
  //   const res = await axios.post(
  //     "/api/room/create-room",
  //     { roomName, description },
  //     {
  //       headers: { Authorization: `Bearer ${token}` }
  //     }
  //   );
  //   return res.data.room;
  // };
//   useEffect(() => {
//   const savedToken = localStorage.getItem("token");
//   if (savedToken) {
//     setToken(savedToken);
//   }
// }, []);

const createRoom = async (roomName, description) => {
  try {
    console.log("Using token:", token);

    const res = await axios.post(
      "/api/room/create-room",
      { roomName, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
   window.location.href ="/room-page"
    return res.data.room;
  } catch (err) {
    console.error("Create Room Error:", err.response?.data || err.message);
    throw err;
  }
};

  return (
    <RoomContext.Provider value={{ rooms, createRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

