const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  checkAccountLock,
  require2FA,
} = require("../middleware/adminMiddleware");
const {
  login,
  setup2FA,
  verify2FA,
  disable2FA,
  getDashboard,
} = require("../controllers/adminController");
const {
  createProject,
  updateProject,
  deleteProject,
  getAdminProjects,
  getProjects,
  getProject,
} = require("../controllers/portfolioController");

const router = express.Router();

// Admin login route with account lock check
router.post("/login", checkAccountLock, login);

// Protected routes (require authentication)
router.use(authenticateToken);

// Dashboard route with 2FA requirement
router.get("/dashboard", require2FA, getDashboard);

// Project management routes with 2FA requirement
router.get("/projects", require2FA, getAdminProjects);
router.post("/projects", require2FA, createProject);
router.put("/projects/:id", require2FA, updateProject);
router.delete("/projects/:id", require2FA, deleteProject);

// 2FA routes
router.post("/2fa/setup", setup2FA);
router.post("/2fa/verify", verify2FA);
router.post("/2fa/disable", require2FA, disable2FA);

module.exports = router;
