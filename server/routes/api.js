const express = require("express");
const router = express.Router();

// GET all items
router.get("/items", async (req, res) => {
  try {
    // Replace with actual database call
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new item
router.post("/items", async (req, res) => {
  try {
    const { name } = req.body;
    // Save to database
    const newItem = { id: Date.now(), name };
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
