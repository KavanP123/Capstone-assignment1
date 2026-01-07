const express = require("express");
const User = require("./models/User");
const auth = require("./middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const users = await User.find()
    .select("username firstName lastName birthday createdAt");

  res.json({ users });
});

module.exports = router;
