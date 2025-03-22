const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const aboutRoutes = require("./routes/aboutRoutes"); // Import About Routes
const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const Task = require("./models/Task");
const User = require("./models/userModel");
const Feedback = require("./models/Feedback");
const verifyToken = require("./middleware/verifyToken");
dotenv.config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/api/auth", authRoutes);
// app.use("/", taskRoutes);
app.use("/api/about", aboutRoutes); // Add About API Route
app.use("/", feedbackRoutes);
app.use(cookieParser());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.callbackURL,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      });

      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
// Google OAuth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/dashboard",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  console.log({ message: "Logged out successfully" });
  res.redirect("http://localhost:3000/");
});
app.get("/user", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Register Endpoint
app.post("/register", async (req, res) => {
  console.log("Request body:", req.body); // Check if data is being received
  try {
    const { username, email, password } = req.body;
    // const hash = await bcrypt.hash(password, 12);
    // res.redirect("http://localhost:3000/dashboard");

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
      // .redirect("http://localhost:3000/login");
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res
      .status(201)
      .json({ redirect: "/dashboard", message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(400)
        .json({ redirect: "/", message: "Email already registered" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
});

// Login Endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .json({ message: "Invalid credentials", redirect: "/register" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, "secretkey");
  // res.json({ token });
  //   return success response
  res.status(200).json({
    message: "Login Successful",
    email: user.email,
    token,
  });
  console.log({message:"login successful"});
});

// Protected Route (To Check Persistent Login)
app.get("/user", (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    res.json({ userId: decoded.id });
  });
});

app.post("/set-token", (req, res) => {
  res.cookie("authToken", req.body.token, { httpOnly: true, secure: true });
  res.json({ msg: "Token stored in cookies" });
});
// ✅ Create a Task and Broadcast the Event
app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    io.emit("taskAdded", task); // Broadcast new task
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});
// ✅ Emit updates when a task is updated
app.put("/tasks/:id", async (req, res) => {
  try {
    const { status, progress } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status, progress },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ error: "Task not found" });

    console.log("Emitting taskUpdated:", updatedTask); // ✅ Debug log
    io.emit("taskUpdated", updatedTask);

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});
// ✅ Delete Task (Real-Time)
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ error: "Task not found" });

    io.emit("taskDeleted", task._id); // Emit event to all clients
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});
// Get tasks by priority
app.get("/tasks/filter/:priority", async (req, res) => {
  try {
    const tasks = await Task.find({ priority: req.params.priority });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});
// Get tasks completed in a given time frame
app.get("/tasks/progress/:timeframe", async (req, res) => {
  try {
    let dateRange;
    const now = new Date();

    if (req.params.timeframe === "daily") {
      dateRange = new Date(now.setDate(now.getDate() - 1));
    } else if (req.params.timeframe === "weekly") {
      dateRange = new Date(now.setDate(now.getDate() - 7));
    } else if (req.params.timeframe === "monthly") {
      dateRange = new Date(now.setMonth(now.getMonth() - 1));
    }

    const tasks = await Task.find({
      status: "Completed",
      createdAt: { $gte: dateRange },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Submit feedback
app.post("/feedback", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newFeedback = new Feedback({ name, email, message });

    await newFeedback.save();

    // Emit real-time update
    io.emit("newFeedback", newFeedback);
    console.log(newFeedback);
    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    res.status(500).json({ error: "Error submitting feedback" });
  }
});

// Google OAuth Strategy

//   new GoogleStrategy(
//     {

// 📌 WebSocket Connection
io.on("connection", (socket) => {
  console.log("✅User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
