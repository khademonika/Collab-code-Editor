import { connectDB } from "./db/connectDB.js"
import authRoute from "./routes/auth.route.js"
import roomRoutes from "./routes/room.route.js"

import express from "express"
import dotenv from 'dotenv'
import cors from "cors";
import cookieParser from "cookie-parser";
import { protect } from "./middleware/authMiddleware.js"
dotenv.config()

connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cookieParser()); 
app.use(cors());
app.use(express.json())
app.use('/api/auth/', authRoute)
app.use("/api/room/",protect, roomRoutes);

app.get("/", (req,res)=>res.send("this is a home page"))
app.listen(PORT, ()=>console.log(`Server is running on http://localhost:${PORT}`))
