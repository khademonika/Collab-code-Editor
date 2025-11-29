
import React, { useContext, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { RoomContext } from "../context/RoomContext";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import toast from "react-hot-toast"
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const room = await createRoom(roomName, description, roomCode);
  //   if (!roomCode) {
  //     alert("Please generate a Room Code before creating room");
  //     return;
  //   }
  //   if (room) {
  //     setRoomCode(room.roomCode);
  //     alert("Room created successfully!");
  //   }
  //   // // await createRoom(roomName, description, roomCode);
  //   // alert("Room Created!");
  //   navigate(`/room/${room._id}`);

  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roomCode ) {
      // alert("Please generate a Room Code first");
      toast.error("Please generate a Room Code first")
      return;
    }
 if (!roomName ) {
      // alert("Please generate a Room Code first");
      toast.error("Please enter a Room name")
      return;
    }
    const response = await createRoom(roomName, description, roomCode);

    if (!response || !response.room) {
      // alert("Failed to create room");
      toast.error("Failed to create room")
      return;
    }

    const createdRoom = response.room;

    // setAlert({ message: "Room Created!", type: "success" });

    // Hide after 3 seconds
    setTimeout(() => setAlert(null), 1000);
    navigate(`/room/${createdRoom._id}`);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen home flex justify-center items-center bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Create a Room
          </h1>

          <div className="flex flex-col gap-4">
            {/* ROOM NAME */}
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Room Name"
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* DESCRIPTION */}
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* ROOM CODE */}
            <div className="flex gap-2">
              <input
                type="text"
                value={roomCode}
                placeholder="Room Code"
                className="px-4 py-3 border border-gray-300 rounded-xl w-full bg-gray-100"
                readOnly
              />
              <button
                onClick={generateRoomCode}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
              >
                Generate
              </button>
            </div>
          </div>
          {alert && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
            >
              Create Room
            </button>
            {roomCode && (
              <div className="mt-6 p-3 bg-gray-100 rounded-xl text-center">
                <p className="text-gray-700">Share this Room Code:</p>
                <p className="text-xl font-bold">{roomCode}</p>
              </div>
            )}
            <button className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreateRoom;

