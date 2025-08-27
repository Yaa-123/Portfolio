const express = require("express");

const router = express.Router();

// Example public route: Home
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the public API!" });
});

// Example public route: About
router.get("/about", (req, res) => {
  res.json({ message: "This is the about page." });
});

module.exports = router;
