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

// io.on("request-edit", ({ roomId, user }) => {
//   if (!rooms[roomId].editor) {
//     rooms[roomId].editor = user;
//     io.to(roomId).emit("editor-updated", user);
//   } else {
//     socket.emit("edit-denied", rooms[roomId].editor);
//   }
// });



// io.on("connection", (socket) => {
  
//   socket.on("code-change", ({ roomId, code }) => {
//     rooms[roomId].code = code;
//     socket.to(roomId).emit("update-code", code);
//   });

//   socket.on("disconnect", () => {
//     const roomId = socket.roomId;
//     const socketId = socket.id; // Use the socket ID for removal

//     if (roomId && rooms[roomId]) {
//       // Filter out the user object that has the disconnecting socket's ID
//       rooms[roomId].users = rooms[roomId].users.filter(u => u.socket !== socketId);

//       // If the editor disconnects, release the editor access
//       if (roomEditors[roomId] && roomEditors[roomId].socket === socketId) {
//         roomEditors[roomId] = null;
//         io.to(roomId).emit("editor-updated", null);
//       }

//       // Emit the updated list to all remaining users in the room
//       io.to(roomId).emit("online-users", rooms[roomId].users);
//     }
//   });

//   // Update the join-room logic to use socket ID for identification:
//   socket.on("join-room", ({ roomId, user }) => {
//     socket.join(roomId);
//     socket.roomId = roomId;
//     socket.userId = user.id; // Keep userId for optional tracking

//     if (!rooms[roomId]) rooms[roomId] = { users: [], code: "" };
//     if (!roomEditors[roomId]) roomEditors[roomId] = null; // Initialize editor tracking

//     // Filter out previous connection attempts from the *same socket* or other users with the *same user id*
//     // It's safer to filter by socket ID if you want multiple tabs for the same user name to be counted
//     rooms[roomId].users = rooms[roomId].users.filter(u => u.socket !== socket.id);

//     // Add fresh user object
//     rooms[roomId].users.push({
//       socket: socket.id,
//       id: user.id,
//       name: user.username
//     });

//     // Send the current editor status
//     socket.emit("editor-updated", roomEditors[roomId]);

//     io.to(roomId).emit("online-users", rooms[roomId].users);

//     // Load existing code only for this new socket
//     socket.emit("update-code", rooms[roomId].code);
//   });
//   socket.on("request-edit", ({ roomId, user }) => {
//     // Use roomEditors for tracking editor as in your commented out code
//     if (!roomEditors[roomId]) {
//       roomEditors[roomId] = user;
//       io.to(roomId).emit("editor-updated", user);
//     } else {
//       // rooms[roomId].editor is not defined in your storage, use roomEditors
//       socket.emit("edit-denied", roomEditors[roomId]);
//     }
//   });

//   socket.on("code-change", ({ roomId, code }) => {
//     rooms[roomId].code = code;
//     // Send code change to all **other** sockets in the room
//     socket.to(roomId).emit("update-code", code);
//   });

//   socket.on("release-editor", ({ roomId }) => {
//     roomEditors[roomId] = null;
//     io.to(roomId).emit("editor-updated", null);
//   });
//  socket.on("cursor-change", ({ roomId, user, position }) => {
//   socket.to(roomId).emit("cursor-update", { user, position });
// });

// });
// server.js (socket part)


io.on("connection", (socket) => {
  console.log("WS connected:", socket.id);

  socket.on("join-room", ({ roomId, user }) => {
    if (!roomId || !user) return;

    socket.join(roomId);
    socket.roomId = roomId;

    if (!rooms[roomId]) rooms[roomId] = { users: [], code: "", language: "javascript", editor: null };

    // remove any existing entries for this socket
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

  // request / release editor
  socket.on("request-edit", ({ roomId, user }) => {
    if (!roomId) return;
    if (!rooms[roomId]) rooms[roomId] = { users: [], code: "", language: "javascript", editor: null };

    if (!rooms[roomId].editor) {
      rooms[roomId].editor = { socket: socket.id, ...user };
      io.to(roomId).emit("editor-updated", rooms[roomId].editor);
    } else {
      socket.emit("edit-denied", rooms[roomId].editor);
    }
  });

  socket.on("release-editor", ({ roomId }) => {
    if (!roomId || !rooms[roomId]) return;
    rooms[roomId].editor = null;
    io.to(roomId).emit("editor-updated", null);
  });

  // cursor positions: broadcast to others in the room
  socket.on("cursor-change", ({ roomId, cursor }) => {
    if (!roomId) return;
    socket.to(roomId).emit("cursor-change", { socketId: socket.id, cursor });
  });

  socket.on("disconnect", () => {
    const roomId = socket.roomId;
    if (!roomId || !rooms[roomId]) return;

    // remove user by socket id
    rooms[roomId].users = rooms[roomId].users.filter(u => u.socket !== socket.id);

    // if editor was this socket, release editor
    if (rooms[roomId].editor && rooms[roomId].editor.socket === socket.id) {
      rooms[roomId].editor = null;
      io.to(roomId).emit("editor-updated", null);
    }

    io.to(roomId).emit("online-users", rooms[roomId].users);
  });
 
});


server.listen(5000, () => console.log("Server running on 5000"));