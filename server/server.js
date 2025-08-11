import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000; // Use 10000 for Render

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", // For development
      "https://portfolio-1z8.pages.dev", // Your production frontend
      "https://portfolio-jwp8.onrender.com", // Your backend (for any self-requests)
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Basic route for health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Portfolio API",
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Start server FIRST, then connect to MongoDB
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 Health check: http://0.0.0.0:${PORT}/health`);
  
  // Connect to MongoDB after server starts
  connectDB();
});

// Connect to MongoDB (separate from server startup)
const connectDB = async () => {
  try {
    console.log("🔄 Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    
    // Don't exit the process - let the server continue running
    // This allows Render to detect the port even if MongoDB fails
    console.log("⚠️ Server will continue running without MongoDB");
    console.log("💡 Please check your MONGO_URI environment variable");
    
    // Retry connection after 10 seconds
    setTimeout(connectDB, 10000);
  }
};

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received. Shutting down gracefully...");
  mongoose.connection.close();
  process.exit(0);
});

process.on("unhandledRejection", (err) => {
  console.log("❌ Unhandled Promise Rejection:", err.message);
  // Don't exit on unhandled rejections in production
});