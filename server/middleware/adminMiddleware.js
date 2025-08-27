const jwt = require("jsonwebtoken");
const supabase = require("../supabaseClient");

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Account lock check middleware
const checkAccountLock = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(); // Continue if no email provided
    }

    // Check if account is locked in Supabase
    const { data: admin, error } = await supabase
      .from("admins")
      .select("is_locked, login_attempts")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      // Ignore "not found" errors
      console.error("Account lock check error:", error);
      return next();
    }

    if (admin && admin.is_locked) {
      return res.status(423).json({
        message: "Account is locked. Please contact administrator.",
      });
    }

    next();
  } catch (error) {
    console.error("Account lock check error:", error);
    next(); // Continue on error
  }
};

// 2FA requirement middleware
const require2FA = async (req, res, next) => {
  try {
    // Get admin ID from JWT token (assuming token is already verified)
    const adminId = req.user?.id;

    if (!adminId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Check if admin has 2FA enabled in Supabase
    const { data: admin, error } = await supabase
      .from("admins")
      .select("two_fa_enabled, two_fa_verified")
      .eq("id", adminId)
      .single();

    if (error) {
      console.error("2FA check error:", error);
      return res.status(500).json({ message: "Error checking 2FA status" });
    }

    if (admin.two_fa_enabled && !admin.two_fa_verified) {
      return res.status(403).json({
        message: "2FA verification required",
        requires2FA: true,
      });
    }

    next();
  } catch (error) {
    console.error("2FA requirement error:", error);
    res.status(500).json({ message: "Server error during 2FA check" });
  }
};

// Export named functions
module.exports = {
  authenticateAdmin,
  checkAccountLock,
  require2FA,
};
