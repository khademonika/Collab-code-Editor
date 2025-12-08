
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import ProtectedRoute from "../components/ProtectedRoute";
import InputCompo from "../components/InputCompo";
import Button from "../components/Button";

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const API= import.meta.env.VITE_API_URL
  const navigate = useNavigate();

  // Auto hide alert after 1.5 sec
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleJoin = async () => {
    if (!roomCode.trim()) {
      toast.error("Enter a valid room code");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${API}/api/room/join-room`,
        { roomCode },
        { withCredentials: true }
      );
      toast.success("Room Joined!");
      navigate(`/room/${res.data.roomId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to join room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div
        className="flex join  justify-center items-center h-screen " >
        <div
          className="w-96 shadow-xl card  rounded-2xl p-8 join">
          <h1 className=" font-bold text-center mb-6">
            Join a Collaboration Room
          </h1>
          <InputCompo value={roomCode} fun={(e) => setRoomCode(e.target.value)} placeholder="Enter Room Code" />
          <Button handlefun={handleJoin} disabledfun={loading}
            icon={<LogIn size={20} />} state={loading}
            trueVal="Joining..." falseval="Join Room" />
          <p className="text-center text-sm mt-4 opacity-70">
            Enter the code shared by your partner to join a coding room.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default JoinRoom;
