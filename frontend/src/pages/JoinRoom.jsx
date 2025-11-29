
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import Alert from "../components/Alert";

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const { isDark } = useTheme();
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
        "/api/room/join-room",
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
    <div
      className="flex join  justify-center items-center h-screen " >
      <div
        className= "w-96 shadow-xl card  rounded-2xl p-8 join">
        <h1 className=" font-bold text-center mb-6">
          Join a Collaboration Room
        </h1>

        <input
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          type="text"
          placeholder="Enter Room Code"
          className="w-full p-3 rounded-lg border mb-4 text-lg outline-none "/>

        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}

        <button
          onClick={handleJoin}
          disabled={loading}
          className={`w-full py-3 text-lg flex items-center justify-center gap-2 rounded-lg transition ${
            loading
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <LogIn size={20} />
          {loading ? "Joining..." : "Join Room"}
        </button>

        <p className="text-center text-sm mt-4 opacity-70">
          Enter the code shared by your partner to join a coding room.
        </p>
      </div>
    </div>
  );
};

export default JoinRoom;
