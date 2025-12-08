import mongoose from "mongoose"

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1) // procees code :1 code means exit with the failure and 0 means success
    }
}