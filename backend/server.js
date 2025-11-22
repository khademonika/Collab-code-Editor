import express from "express"
import { connectDB } from "./db/connectDB.js"
import authRoute from "./routes/auth.route.js"
import dotenv from 'dotenv'
import cors from "cors";
dotenv.config()


const app = express()
app.use(cors());
const PORT = process.env.PORT || 5000
app.use(express.json())

app.get("/", (req,res)=>res.send("this is a home page"))
app.use('/api/auth/', authRoute)
connectDB()
app.listen(PORT, ()=>console.log(`Server is running on http://localhost:${PORT}`))
