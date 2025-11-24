import { connectDB } from "./db/connectDB.js"
import authRoute from "./routes/auth.route.js"
import roomRoutes from "./routes/room.route.js"

import express from "express"
import http from "http"
import { Server } from "socket.io"
import dotenv from 'dotenv'
import cors from "cors";
import cookieParser from "cookie-parser";
import { protect } from "./middleware/authMiddleware.js"
dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5000
const server = http.createServer(app);
app.use(cookieParser()); 
app.use(cors());
app.use(express.json())

//Routes
app.use('/api/auth/', authRoute)
app.use("/api/room/",protect, roomRoutes);

app.get("/", (req,res)=>res.send("this is a home page"))
// app.listen(PORT, ()=>console.log(`Server is running on http://localhost:${PORT}`))



// ===== MEMORY STORAGE =====
const roomEditors = {}; // who is the active editor?
const roomCodes = {}; // store code of each room
const roomUsers = {}; // store online users
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});
const rooms = {}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // JOIN ROOM
  socket.on("join-room", ({ roomId, user }) => {
    socket.join(roomId);

    if (!roomUsers[roomId]) roomUsers[roomId] = [];
    roomUsers[roomId].push(user);

    // Send current code
    socket.emit("load-existing-code", roomCodes[roomId] || "");

    // Send updated user list
    io.to(roomId).emit("online-users", roomUsers[roomId]);
  });

  // REQUEST EDITOR PERMISSION
  socket.on("request-edit", ({ roomId, user }) => {
    if (!roomEditors[roomId]) {
      roomEditors[roomId] = user;

      io.to(roomId).emit("editor-updated", roomEditors[roomId]);
    } 
    else {
      socket.emit("edit-denied", roomEditors[roomId]);
    }
  });

  // CODE CHANGE
  socket.on("code-change", ({ roomId, code }) => {
    roomCodes[roomId] = code;
    socket.to(roomId).emit("update-code", code);
  });

  // RELEASE EDITOR
  socket.on("release-editor", ({ roomId }) => {
    roomEditors[roomId] = null;
    io.to(roomId).emit("editor-updated", null);
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
server.listen(5000, () => console.log("Server running on 5000"));