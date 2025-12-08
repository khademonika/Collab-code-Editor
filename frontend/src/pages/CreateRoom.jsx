
import React, { useContext, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { RoomContext } from "../context/RoomContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
import InputCompo from "../components/InputCompo";
const CreateRoom = () => {
  const { createRoom } = useContext(RoomContext);
  const [alert, setAlert] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  // Generate Room Code
  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roomCode) {
      toast.error("Please generate a Room Code first")
      return;
    }
    if (!roomName) {
      toast.error("Please enter a Room name")
      return;
    }
    const response = await createRoom(roomName, description, roomCode);

    if (!response || !response.room) {
      toast.error("Failed to create room")
      return;
    }

    const createdRoom = response.room;
    setTimeout(() => setAlert(null), 1000);
    navigate(`/room/${createdRoom._id}`);
  };

  return (
    <ProtectedRoute>
      <div className="flex join  justify-center items-center h-screen">
        <div className="join card shadow-xl rounded-3xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            Create a Room
          </h1>
          <div className="flex flex-col gap-4 ">
            <InputCompo fun={(e) => setRoomName(e.target.value)} value={roomName} placeholder="Room Name" />
            <InputCompo fun={(e) => setDescription(e.target.value)} value={description} placeholder="Description" />
            <div className="flex gap-2">
              <InputCompo fun={""} value={roomCode} placeholder="Room Code" />
              <button
                onClick={generateRoomCode}
                className="px-4 py-2 bg-blue-500 cursor-pointer rounded-xl hover:bg-blue-600">
                Generate
              </button>

            </div>
          </div>
          <div className="flex justify-end gap-5 mt-6">
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-green-500 text-white cursor-pointer rounded-xl shadow hover:bg-green-600 transition">
              Create Room
            </button>
          
            <Link to="/">
              <button className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl cursor-pointer hover:bg-gray-300 transition">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
   </ProtectedRoute>
  );
};

export default CreateRoom;

