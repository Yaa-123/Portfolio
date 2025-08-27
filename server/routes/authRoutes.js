const express = require("express");
const { refreshToken } = require("../middleware/authMiddleware");
const router = express.Router();

// Token refresh endpoint
router.post("/refresh", refreshToken);

// Logout endpoint (optional)
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
