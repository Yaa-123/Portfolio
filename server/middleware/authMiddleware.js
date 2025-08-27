const jwt = require("jsonwebtoken");
const supabase = require("../supabaseClient");

// Verify JWT token middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verify admin exists in Supabase
    const { data: admin, error } = await supabase
      .from("admins")
      .select("id, email, name, role")
      .eq("id", decoded.id)
      .single();

    if (error || !admin) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired" });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
};

// Generate JWT tokens
const generateTokens = (admin) => {
  const accessToken = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      role: admin.role,
      isAdmin: true,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: admin.id },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

// Refresh token function
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    );

    // Verify admin exists in Supabase
    const { data: admin, error } = await supabase
      .from("admins")
      .select("id, email, name, role")
      .eq("id", decoded.id)
      .single();

    if (error || !admin) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate new tokens
    const tokens = generateTokens(admin);

    res.json({
      message: "Token refreshed successfully",
      tokens,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Refresh token expired" });
    }
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

// Middleware to check if user has specific role
const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.admin || req.admin.role !== role) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  };
};

// Middleware to check if user is the owner of the resource
const isOwnerOrAdmin = (tableName, idParam = "id") => {
  return async (req, res, next) => {
    try {
      const { data: resource, error } = await supabase
        .from(tableName)
        .select("admin_id")
        .eq("id", req.params[idParam])
        .single();

      if (error) {
        return res.status(404).json({ message: "Resource not found" });
      }

      // Check if user is admin or owner of the resource
      if (req.admin.role === "admin" || resource.admin_id === req.admin.id) {
        next();
      } else {
        return res.status(403).json({ message: "Access denied" });
      }
    } catch (error) {
      console.error("Owner check error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
};

module.exports = {
  authenticateToken,
  generateTokens,
  refreshToken,
  requireRole,
  isOwnerOrAdmin,
};
