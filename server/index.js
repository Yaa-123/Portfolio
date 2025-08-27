const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Enhanced CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://yourdomain.com"]
        : [
            "http://localhost:3000",
            "http://localhost:5000",
            "http://127.0.0.1:3000",
          ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
  })
);

// Handle preflight requests
app.options("*", cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "production" ? 100 : 1000, // limit each IP
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsing middleware with limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Supabase connection check
const supabase = require("./supabaseClient");
console.log("Supabase client initialized successfully");

// Test Supabase connection
async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("count")
      .limit(1);

    if (error) {
      console.warn("Supabase connection test warning:", error.message);
    } else {
      console.log("Supabase connected successfully");
    }
  } catch (error) {
    console.error("Supabase connection test error:", error.message);
  }
}

testSupabaseConnection();

// Import routes
const adminRoutes = require("./routes/AdminRoutes");
const publicRoutes = require("./routes/PublicRoutes");
const authRoutes = require("./routes/authRoutes");

// API routes
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    // Test database connection
    const { error } = await supabase.from("projects").select("id").limit(1);

    res.status(200).json({
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      database: error ? "Disconnected" : "Connected",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Health check failed",
    });
  }
});

// API info endpoint
app.get("/api", (_req, res) => {
  res.json({
    message: "Welcome to the Portfolio Website API!",
    version: "1.0.0",
    endpoints: {
      admin: "/api/admin",
      public: "/api/public",
      auth: "/api/auth",
      health: "/api/health",
    },
    documentation: "https://yourdomain.com/api-docs",
  });
});

// Serve static files from the client build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
} else {
  // Development mode - basic route for testing
  app.get("/", (req, res) => {
    res.json({
      message: "Server is running in development mode",
      client: "http://localhost:3000",
      api: "http://localhost:5000/api",
      database: "Supabase (PostgreSQL)",
    });
  });
}

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    error: "API endpoint not found",
    path: req.originalUrl,
    availableEndpoints: [
      "/api/admin",
      "/api/public",
      "/api/auth",
      "/api/health",
    ],
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  // Supabase errors
  if (err.code && err.code.startsWith("2")) {
    return res.status(400).json({
      error: "Database Error",
      message: err.message,
      details: err.details,
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired" });
  }

  // Default error
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Something went wrong!"
        : err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`API available at: http://localhost:${PORT}/api`);
  console.log(`Database: Supabase`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

module.exports = app;
