const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find({})
      .select("username firstName lastName birthday createdAt")
      .sort({ createdAt: -1 });

    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
