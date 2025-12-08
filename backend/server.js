import { connectDB } from "./db/connectDB.js"
import authRoute from "./routes/auth.route.js"
import roomRoutes from "./routes/room.route.js"
import { protect } from "./middleware/authMiddleware.js"

import express from "express"
import http from "http"
import { Server } from "socket.io"
import dotenv from 'dotenv'
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config()
//https://code-editor-backend-nsic.onrender.com
// collab-code-editor-d8kw-1rygdf69y-khademonikas-projects.vercel.app
connectDB()

const app = express()

const PORT = process.env.PORT || 5000
const server = http.createServer(app);
app.use(cors({
  origin: "collab-code-editor-d8kw-1rygdf69y-khademonikas-projects.vercel.app",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(cookieParser());
app.use(cors());
app.use(express.json())

//Routes
app.use('/api/auth/', authRoute)
app.use("/api/room/", protect, roomRoutes);

app.get("/", (req, res) => res.send("this is a home page"))

app.get("/api/auth/verify", protect, (req, res) => {
  res.json({ user: req.user });
})


// ===== MEMORY STORAGE =====
const roomEditors = {}; // who is the active editor?
const roomCodes = {}; // store code of each room
const roomUsers = {}; // store online users
const io = new Server(server, {
  cors: {
    origin: "collab-code-editor-d8kw-1rygdf69y-khademonikas-projects.vercel.app",
    methods: ["GET", "POST"]
  }
});
const rooms = {}



io.on("connection", (socket) => {
  console.log("WS connected:", socket.id);

  socket.on("join-room", ({ roomId, user }) => {
    if (!roomId || !user) return;

    socket.join(roomId);
    socket.roomId = roomId;

    if (!rooms[roomId]) rooms[roomId] = { users: [], code: "", language: "javascript", editor: null };

   
    rooms[roomId].users = rooms[roomId].users.filter(u => u.socket !== socket.id);

    // add this socket
    rooms[roomId].users.push({
      socket: socket.id,
      id: user.id,
      name: user.username || user.name || "Unknown"
    });

    // send full user list to everyone in room
    io.to(roomId).emit("online-users", rooms[roomId].users);

    // send current code and language to newly joined socket only
    socket.emit("update-code", rooms[roomId].code);
    socket.emit("language-changed", rooms[roomId].language);
    socket.emit("editor-updated", rooms[roomId].editor || null);
  });

  // code change from a client -> save to room and broadcast to other sockets
  socket.on("code-change", ({ roomId, code }) => {
    if (!roomId) return;
    if (!rooms[roomId]) rooms[roomId] = { users: [], code: "", language: "javascript", editor: null };
    rooms[roomId].code = code;
    socket.to(roomId).emit("update-code", code);
  });

  // language change
  socket.on("language-change", ({ roomId, language }) => {
    if (!roomId || !language) return;
    if (!rooms[roomId]) rooms[roomId] = { users: [], code: "", language: "javascript", editor: null };
    rooms[roomId].language = language;
    io.to(roomId).emit("language-changed", language);
  });

  // run output (when someone runs code, broadcast output to all)
  socket.on("run-output", ({ roomId, output }) => {
    if (!roomId) return;
    io.to(roomId).emit("run-output", output);
  });

  //on leaving the room

 
// socket.on("leave-room", ({ roomId, user }) => {
//   if (!roomId || !user || !rooms[roomId]) return;

//   // remove user from room
//   rooms[roomId].users = rooms[roomId].users.filter(u => u.id !== user.id);

//   // notify all users in room
//   io.to(roomId).emit("online-users", rooms[roomId].users);

//   socket.leave(roomId);
// });
 socket.on("leave-room", ({ roomId, user }) => {
    try {
      if (!roomId || !rooms[roomId]) return;
      // remove entries that match this socket id OR match the leaving user's id/name (when provided)
      const leavingId = user && (user.id || user._id);
      const leavingName = user && (user.username || user.name);
      rooms[roomId].users = rooms[roomId].users.filter((u) => {
        // remove if socket matches
        if (u.socket === socket.id) return false;
        // remove if id provided and matches
        if (leavingId && u.id && String(u.id) === String(leavingId)) return false;
        // remove if name provided and matches
        if (leavingName && u.name && u.name === leavingName) return false;
        // otherwise keep
        return true;
      });

      // if the leaving socket was the editor, release
      if (rooms[roomId].editor && rooms[roomId].editor.socket === socket.id) {
        rooms[roomId].editor = null;
        io.to(roomId).emit("editor-updated", null);
      }

      // notify others with a user-left event and updated list
      const leavingPayload = { id: user?.id, name: user?.username || user?.name || 'Unknown', roomId };
      socket.to(roomId).emit("user-left", leavingPayload);
      io.to(roomId).emit("online-users", rooms[roomId].users);

      // make this socket leave the room
      try { socket.leave(roomId); } catch (e) {}
    } catch (e) {
      console.error('leave-room handler error', e);
    }
  });
  // socket.on("disconnect", () => {
  //   const roomId = socket.roomId;
  //   if (!roomId || !rooms[roomId]) return;

  //   // remove user by socket id
  //   rooms[roomId].users = rooms[roomId].users.filter(u => u.socket !== socket.id);

  //   // if editor was this socket, release editor
  //   if (rooms[roomId].editor && rooms[roomId].editor.socket === socket.id) {
  //     rooms[roomId].editor = null;
  //     io.to(roomId).emit("editor-updated", null);
  //   }

  //   io.to(roomId).emit("online-users", rooms[roomId].users);

  // });
socket.on("disconnect", () => {
  for (const roomId in rooms) {
    let before = rooms[roomId].users.length;

    rooms[roomId].users = rooms[roomId].users.filter(u => u.socket !== socket.id);

    if (rooms[roomId].users.length !== before) {
      io.to(roomId).emit("online-users", rooms[roomId].users);
    }
  }
});

});


server.listen(5000, () => console.log("Server running on 5000"));

