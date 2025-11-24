import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import { useState } from "react";

const CreateRoom = () => {
    const { createRoom } = useContext(RoomContext);
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRoom(roomName, description);
    alert("Room Created!");
  };

  return (
   <ProtectedRoute>
 <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create a Room
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Room Name"
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Description"
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
          onClick={(e)=>handleSubmit(e)}
           className="px-5 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition">
            Create Room
          </button>

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
// import { useContext, useState } from "react";
// import {RoomContext}  from "../context/RoomContext";
// import React from "react";
// export default function CreateRoom() {
//   const { createRoom } = useContext(RoomContext);
//   const [roomName, setRoomName] = useState("");
//   const [description, setDescription] = useState("");
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await createRoom(roomName, description);
//     alert("Room Created!");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Create Room</h2>
//       <input value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Room Name" />
//       <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
//       <button type="submit">Create</button>
//     </form>
//   );
// }
