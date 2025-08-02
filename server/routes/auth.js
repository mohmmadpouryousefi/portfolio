import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ 
        success: false,
        msg: "Username and password are required" 
      });
    }

    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ 
        success: false,
        msg: "User already exists" 
      });
    }

    // Create new user
    user = new User({
      username,
      password,
      isAdmin: true, // For simplicity, making the first user an admin
    });

    await user.save();

    // Create JWT
    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          console.error("JWT signing error:", err);
          return res.status(500).json({ 
            success: false,
            msg: "Error generating token" 
          });
        }
        res.json({ 
          success: true,
          token,
          user: {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
          }
        });
      }
    );
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ 
        success: false,
        msg: "Username and password are required" 
      });
    }

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ 
        success: false,
        msg: "Invalid credentials" 
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        msg: "Invalid credentials" 
      });
    }

    // Create JWT
    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          console.error("JWT signing error:", err);
          return res.status(500).json({ 
            success: false,
            msg: "Error generating token" 
          });
        }
        res.json({ 
          success: true,
          token, 
          isAdmin: user.isAdmin,
          user: {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
          }
        });
      }
    );
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ 
        success: false,
        msg: "User not found" 
      });
    }
    res.json({ 
      success: true,
      user 
    });
  } catch (err) {
    console.error("Get user error:", err.message);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});


export default router;