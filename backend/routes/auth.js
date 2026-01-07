/**
 * auth.js
 * -----------------------------------
 * Handles:
 * - User registration
 * - User login
 *
 * Key security concepts:
 * - Password hashing (bcrypt)
 * - JWT creation
 * - Input validation
 */

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const {
    username,
    password,
    confirmPassword,
    firstName,
    lastName,
    birthday
  } = req.body;

  if (!username || !password || !confirmPassword || !firstName || !lastName || !birthday) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const exists = await User.findOne({ username });
  if (exists) {
    return res.status(409).json({ message: "Username already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await User.create({
    username,
    passwordHash,
    firstName,
    lastName,
    birthday
  });

  res.status(201).json({ message: "User registered" });
});

/**
 * LOGIN
 * Verifies credentials and returns JWT
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create token
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, user });
});

module.exports = router;
