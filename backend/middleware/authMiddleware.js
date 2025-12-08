import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import dotenv from "dotenv"
dotenv.config()
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized. No token." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token failed or expired." });
  }
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
console.log("AUTH HEADER:", req.headers.authorization);

    if (!token) return res.status(401).json({ message: "Unauthorized-no token" });
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("DECODED:", decoded);
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      console.log(("User not found"));
      
      return res.status(404).json({ message: "User not found in DB" });
    }
    req.user = user; 
   console.log("Auth middelware");
   console.log("JWT SECRET:", process.env.JWT_SECRET);

    next();
  } catch (error) {
    console.log("Auth error", error);
    
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
