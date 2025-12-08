import Room from "../model/room.model.js";

export const createRoom = async (req, res) => {
  const generateRoomCode = () => {
    console.log(Math.random().toString(36).substring(2, 8).toUpperCase());
    
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

  try {
    const { roomName, description , roomCode} = req.body;
    const userId = req.user._id;

   

    const room = await Room.create({
      roomName,
      description,
      roomCode,
      createdBy: userId,
      members: [userId],
    });

    res.status(201).json({ message: "Room created", room ,roomId: room._id });
  } catch (error) {
    console.log("Create room error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const joinRoom = async (req, res) => {
  try {
    const { roomCode } = req.body;
 const userId = req.user.id;  // from auth middleware
  const username = req.user.username;
    
    if (!roomCode) {
      return res.status(400).json({ message: "Room code is required" });
    }

    const room = await Room.findOne({ roomCode });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
const exists = room.participants.some(p => p.userId.toString() === userId);
  if (!exists) {
    room.participants.push({ userId, username });
    await room.save();
  }
    return res.status(200).json({
      message: "Room joined successfully",
      roomId: room._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyRooms = async (req, res) => {
  try {
    const userId = req.user._id;

    // const rooms = await Room.find({ members: userId });
const rooms = await Room.find({ 
      "participants.userId": userId 
    });

    res.json({ rooms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
