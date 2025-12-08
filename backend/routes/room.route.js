import express from "express";
import { createRoom, joinRoom, getMyRooms } from "../controllers/room.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Room from "../model/room.model.js";

const router = express.Router();

// Create a new room
router.post("/create-room", authMiddleware, createRoom);

// Join room using code
router.post("/join-room", authMiddleware, joinRoom);

// Get all rooms where the user is a member
router.get("/my-rooms", authMiddleware, getMyRooms);
router.get("/:roomId", async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
