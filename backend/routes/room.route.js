import express from "express";
import { createRoom, joinRoom, getMyRooms } from "../controllers/room.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new room
router.post("/create-room", authMiddleware, createRoom);

// Join room using code
router.post("/join-room", authMiddleware, joinRoom);

// Get all rooms where the user is a member
router.get("/my-rooms", authMiddleware, getMyRooms);

export default router;
