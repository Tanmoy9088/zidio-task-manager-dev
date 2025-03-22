const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) =>
  jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

// Register
router.post("/register", async (req, res) => {
  console.log("Request body:", req.body); // Check if data is being received
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);

    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        // Send a specific status code for redirecting (e.g., 409 Conflict)
        return res.status(409).json({ message: "Email already registered" });
      } else {
        return res.status(400).json({ message: "Username is already taken" });
      }
    }

    const newUser = new User({ username, email, password: hash });
    await newUser.save();

    const token = generateToken(newUser);

    res
      .status(201)
      .json({ newUser, token })
      .redirect("http://localhost:3000/home");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = generateToken(user);
    res.json({ token });
    res
      .status(200)
      .json({ user, message: "Login Successful", email: user.email, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  console.log({ message: "Logged out successfully" });
  res.json({ message: "Logged out" }).redirect("http://localhost:3000/");
});

module.exports = router;

