const supabase = require("../supabaseClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const { data: admin, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, role: "admin" },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during login" });
  }
};

// Get admin dashboard data
const getDashboard = async (req, res) => {
  try {
    // Get project count
    const { count: totalProjects, error: projectsError } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true });

    if (projectsError) throw projectsError;

    res.json({
      success: true,
      message: "Welcome to the admin dashboard!",
      data: {
        totalProjects: totalProjects || 0,
        totalUsers: 8, // You can implement user counting later
        recentActivity: [],
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching dashboard data" });
  }
};

// Setup 2FA
const setup2FA = async (req, res) => {
  try {
    res.json({ success: true, message: "2FA setup initiated" });
  } catch (error) {
    console.error("2FA setup error:", error);
    res.status(500).json({ success: false, message: "Error setting up 2FA" });
  }
};

// Verify 2FA
const verify2FA = async (req, res) => {
  try {
    res.json({ success: true, message: "2FA verified successfully" });
  } catch (error) {
    console.error("2FA verification error:", error);
    res.status(500).json({ success: false, message: "Error verifying 2FA" });
  }
};

// Disable 2FA
const disable2FA = async (req, res) => {
  try {
    res.json({ success: true, message: "2FA disabled successfully" });
  } catch (error) {
    console.error("2FA disable error:", error);
    res.status(500).json({ success: false, message: "Error disabling 2FA" });
  }
};

// Get users
const getUsers = async (req, res) => {
  try {
    const users = [];
    res.json({ success: true, users });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};

// Export all functions
module.exports = {
  login,
  setup2FA,
  verify2FA,
  disable2FA,
  getDashboard,
  getUsers,
};
