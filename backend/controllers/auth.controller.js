import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    
    // Create new user
    const newUser = await User.create({
      email,
      password
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("Error in signupController:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};



export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

    // 4. Send response
    res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .json({
      success: true,
      user,
      message: "Login successful"
    });

  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutController = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // delete cookie immediately
      sameSite: "lax",
      secure: false,
    });

    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error:", error);
    res.status(500).json({ success: false, message: "Failed to logout" });
  }
};

export const meController = async (req,res)=>{
   res.json({
    success: true,
    user: req.user
  });
}



