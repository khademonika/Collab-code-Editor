import Room from "../model/room.model.js";

// export const createRoom = async (req, res) => {
//   try {
//     const { roomName, description } = req.body;
//     const userId = req.user._id; // from auth middleware

//     const newRoom = await Room.create({
//       roomName,
//       description,
//       createdBy: userId,
//       members: [userId]
//     });

//     res.status(201).json({ message: "Room created", room: newRoom });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// export const joinRoom = async (req, res) => {
//   try {
//     const { roomCode } = req.body;
//     const userId = req.user._id;

//     const room = await Room.findOne({ roomCode });

//     if (!room) return res.status(404).json({ message: "Room not found" });

//     if (room.members.includes(userId)) {
//       return res.status(400).json({ message: "Already a member" });
//     }

//     room.members.push(userId);
//     await room.save();

//     res.json({ message: "Joined room", room });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


export const createRoom = async (req, res) => {
  const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

//   try {
//     const { roomName, description } = req.body;
//     const userId = req.user._id;

//     const room = await Room.create({
//       roomName,
//       description,
//       createdBy: userId,
//       members: [userId]
//     });
// console.log("REQ.USER =", req.user);

//     res.status(201).json({ message: "Room created", room });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
  try {
    const { roomName, description } = req.body;
    const userId = req.user._id;

    const roomCode = generateRoomCode(); // 🔥 FIX

    const room = await Room.create({
      roomName,
      description,
      roomCode,
      createdBy: userId,
      members: [userId],
    });

    res.status(201).json({ message: "Room created", room });
  } catch (error) {
    console.log("Create room error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const { roomCode } = req.body;
    const userId = req.user._id;

    const room = await Room.findOne({ roomCode });
    if (!room) return res.status(404).json({ message: "Room not found" });

    if (room.members.includes(userId)) {
      return res.status(400).json({ message: "Already a member" });
    }

    room.members.push(userId);
    await room.save();

    res.json({ message: "Joined room", room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyRooms = async (req, res) => {
  try {
    const userId = req.user._id;

    const rooms = await Room.find({ members: userId });

    res.json({ rooms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
