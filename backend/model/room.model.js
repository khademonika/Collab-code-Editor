import mongoose from "mongoose";

// const roomSchema = new mongoose.Schema(
//   {
//     roomName: {
//       type: String,
    
//       trim: true,
//     },

//     description: {
//       type: String,
    
//     },

//     roomCode: {
//       type: String,
     
//       unique: true,
//     },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     members: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       }
//     ]
//   },
//   {
//     timestamps: true,
//   }
// );

// Auto-generate roomCode if not provided
// roomSchema.pre("save", function (next) {
//   if (!this.roomCode) {
//     this.roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
//     // Example: 3FD9A2
//   }
//   next();
// });

const roomSchema = new mongoose.Schema({
  roomName: {
    type:String,
    required:true
  },
  description: String,
  roomCode: {
    type: String,
    unique: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
   participants: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: String
    }
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}, { timestamps: true });


const Room = mongoose.model("Room", roomSchema);

export default Room;
