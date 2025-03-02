const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const aboutRoutes = require("./routes/aboutRoutes"); // Import About Routes
const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const Task = require("./models/Task");
const Feedback = require("./models/Feedback");
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use("/api/login", authRoutes);
app.use("/api/signup", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/about", aboutRoutes); // Add About API Route
app.use("/api/feedback", feedbackRoutes);


// ✅ Create a Task and Broadcast the Event
app.post("/api/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    io.emit("taskAdded", task); // Broadcast new task
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});
// ✅ Emit updates when a task is updated
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
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
// Get tasks by priority
app.get("/api/tasks/filter/:priority", async (req, res) => {
  try {
    const tasks = await Task.find({ priority: req.params.priority });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});
// Get tasks completed in a given time frame
app.get("/api/tasks/progress/:timeframe", async (req, res) => {
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

// 📌 WebSocket Connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
