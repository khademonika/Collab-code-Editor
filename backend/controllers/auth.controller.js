import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
export const signupController = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ email, password, username });

    // ----- CREATE TOKEN -----
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      token,      
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username
      },
    });


  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ message: "Server Error" });
  }
};

export const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ password,username });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // 2. Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 3. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    // console.log("JWT SECRET:", process.env.JWT_SECRET);

    // 4. Send token in JSON + user
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,   
      user,    // so your frontend login(data.user, data.token)
    });

  } catch (error) {
    console.error("Error in loginController:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const logoutController = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // delete cookie immediately
      sameSite: "strict",
      secure: false,
    });

    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error:", error);
    res.status(500).json({ success: false, message: "Failed to logout" });
  }
};

export const meController = async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
}

export const deleteAccountController = async (req, res) => {
  try {
    const userId = req.user && (req.user.id || req.user._id || req.user.userId);
    if (!userId) return res.status(400).json({ success: false, message: 'No user id' });

    // remove user document
    await User.findByIdAndDelete(userId);

    // clear auth cookie
    res.cookie('token', '', { httpOnly: true, expires: new Date(0), sameSite: 'strict', secure: false });

    return res.json({ success: true, message: 'Account deleted' });
  } catch (error) {
    console.error('deleteAccountController error', error);
    return res.status(500).json({ success: false, message: 'Failed to delete account' });
  }
}

