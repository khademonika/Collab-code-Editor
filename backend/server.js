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
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use(cors());
app.use(express.json())

//Routes
app.use('/api/auth/', authRoute)
app.use("/api/room/", protect, roomRoutes);

app.get("/", (req, res) => res.send("this is a home page"))



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
let onlineUsers = new Map();
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // JOIN ROOM


//   // REQUEST EDITOR PERMISSION
//   socket.on("request-edit", ({ roomId, user }) => {
//     if (!roomEditors[roomId]) {
//       roomEditors[roomId] = user;

//       io.to(roomId).emit("editor-updated", roomEditors[roomId]);
//     }
//     else {
//       socket.emit("edit-denied", roomEditors[roomId]);
//     }
//   });

//   // CODE CHANGE
//   socket.on("code-change", ({ roomId, code }) => {
//     roomCodes[roomId] = code;
//     socket.to(roomId).emit("update-code", code);
//   });

//   // RELEASE EDITOR
//   socket.on("release-editor", ({ roomId }) => {
//     roomEditors[roomId] = null;
//     io.to(roomId).emit("editor-updated", null);
//   });

//   // DISCONNECT
//   socket.on("disconnect", () => {
//     for (let [userId, sockId] of onlineUsers.entries()) {
//       if (sockId === socket.id) {
//         onlineUsers.delete(userId);
//         break;
//       }
//     }
//     console.log("User disconnected:", socket.id);
//   });
// });
io.on("connection", (socket) => {
  socket.on("join-room", ({ roomId, user }) => {

    socket.join(roomId);
    socket.roomId = roomId;
    socket.userId = user.id;
    socket.userId = user.id;
    if (!rooms[roomId]) rooms[roomId] = { users: [] , code: "" };

    // Remove old duplicates
    rooms[roomId].users = rooms[roomId].users.filter(u => u.id !== user.id);

    // Add fresh user object
    rooms[roomId].users.push({
      id: user.id,
      name: user.username
    });

    io.to(roomId).emit("online-users", rooms[roomId].users);
    // Load existing code only for this room
      socket.emit("update-code", rooms[roomId].code);
  });
    socket.on("code-change", ({ roomId, code }) => {
    rooms[roomId].code = code;
    socket.to(roomId).emit("update-code", code);
  });
  // socket.on("join-room", ({ roomId, user }) => {
  //   socket.join(roomId);
  //   socket.userId = user.id;
  //   onlineUsers.set(user.id, socket.id);
  //   io.to(roomId).emit("online-users", Array.from(onlineUsers.keys()));
  //   if (!roomUsers[roomId]) roomUsers[roomId] = [];
  //   roomUsers[roomId].push(user);
  //   // Send current code

  //   socket.emit("load-existing-code", roomCodes[roomId] || "");

  //   // Send updated user list
  //   io.to(roomId).emit("online-users", roomUsers[roomId]);
  // });
  socket.on("disconnect", () => {
    const roomId = socket.roomId;
    const userId = socket.userId;

    if (roomId && rooms[roomId]) {
      rooms[roomId].users = rooms[roomId].users.filter(u => u.id !== userId);
      io.to(roomId).emit("online-users", rooms[roomId].users);
    }
  });
});


server.listen(5000, () => console.log("Server running on 5000"));