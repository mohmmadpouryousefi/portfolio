// Load environment variables first
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

// Load environment variables

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  })
);
app.use(express.json({ limit: "10mb" })); // Increased limit for larger payloads
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Portfolio API",
  });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB successfully'");

    // Start server after successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server successfully running on port ${PORT}`);
      console.log(`📍 API URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);

    // Check if it's a network/DNS issue
    if (error.code === "ENOTFOUND") {
      console.log("💡 Possible solutions:");
      console.log("   1. Check your internet connection");
      console.log("   2. Verify your MongoDB Atlas cluster is running");
      console.log(
        "   3. Check if your IP address is whitelisted in MongoDB Atlas"
      );
      console.log("   4. Verify your MONGO_URI in .env file");
    }
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  console.log("❌ Unhandled Promise Rejection:", err.message);
  process.exit(1);
});

connectDB();
