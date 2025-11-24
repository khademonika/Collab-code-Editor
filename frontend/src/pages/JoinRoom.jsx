
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    try {
      const res = await axios.post("/api/room/join-room", 

        { roomCode },
        { withCredentials: true }
      );

      navigate(`/room/${res.data.roomId}`);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to join room");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-4">
      <h1 className="text-2xl font-bold">Join Room</h1>
      
      <input
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        type="text"
        placeholder="Enter Room Code"
        className="border p-3 rounded-lg w-80"
      />

      <button
        onClick={handleJoin}
        className="bg-green-600 px-6 py-3 text-white rounded-lg"
      >
        Join
      </button>
    </div>
  );
};

export default JoinRoom;
