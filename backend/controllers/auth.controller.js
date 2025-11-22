import User from "../model/user.model.js";
import bcrypt from "bcrypt";

export const signupController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    
    // Create new user
    const newUser = await User.create({
      username,
      password
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
      },
    });

  } catch (error) {
    console.error("Error in signupController:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};



export const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }


    // 4. Send response
    res.json({
      message: "Login successful",
   
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).json({ message: "Server error" });
  }
};
