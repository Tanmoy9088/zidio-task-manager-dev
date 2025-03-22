const express = require("express");
const Task = require("../models/Task"); // Import Task model
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// router.post("/set-token", (req, res) => {
//   res.cookie("authToken", req.body.token, { httpOnly: true, secure: true });
//   res.json({ msg: "Token stored in cookies" });
// });
// // ✅ Create a Task and Broadcast the Event
// router.post("/tasks", async (req, res) => {
//   try {
//     const task = new Task(req.body);
//     await task.save();
//     io.emit("taskAdded", task); // Broadcast new task
//     res.status(201).json(task);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// router.get("/tasks", async (req, res) => {
//   const tasks = await Task.find();
//   res.json(tasks);
// });
// // ✅ Emit updates when a task is updated
// router.put("/tasks/:id", async (req, res) => {
//   try {
//     const { status } = req.body;
//     let progress = 0;

//     if (status === "pending") progress = 0;
//     if (status === "in-progress") progress = 50;
//     if (status === "completed") progress = 100;

//     const updatedTask = await Task.findByIdAndUpdate(
//       req.params.id,
//       { status, progress },
//       { new: true }
//     );

//     if (!updatedTask) return res.status(404).json({ error: "Task not found" });

//     console.log("Emitting taskUpdated:", updatedTask); // ✅ Debug log
//     io.emit("taskUpdated", updatedTask);

//     res.status(200).json(updatedTask);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update task" });
//   }
// });
// // ✅ Delete Task (Real-Time)
// router.delete("/tasks/:id", async (req, res) => {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id);

//     if (!task) return res.status(404).json({ error: "Task not found" });

//     io.emit("taskDeleted", task._id); // Emit event to all clients
//     res.json({ message: "Task deleted" });
//   } catch (error) {
//     res.status(500).json({ error: "Error deleting task" });
//   }
// });
// // Get tasks by priority
// router.get("/tasks/filter/:priority", async (req, res) => {
//   try {
//     const tasks = await Task.find({ priority: req.params.priority });
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: "Server Error" });
//   }
// });
// // Get tasks completed in a given time frame
// router.get("/tasks/progress/:timeframe", async (req, res) => {
//   try {
//     let dateRange;
//     const now = new Date();

//     if (req.params.timeframe === "daily") {
//       dateRange = new Date(now.setDate(now.getDate() - 1));
//     } else if (req.params.timeframe === "weekly") {
//       dateRange = new Date(now.setDate(now.getDate() - 7));
//     } else if (req.params.timeframe === "monthly") {
//       dateRange = new Date(now.setMonth(now.getMonth() - 1));
//     }

//     const tasks = await Task.find({
//       status: "Completed",
//       createdAt: { $gte: dateRange },
//     });
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: "Server Error" });
//   }


// ✅ Create a Task and Broadcast the Event
router.post("/tasks", async (req, res) => {
    try {
      const task = new Task(req.body);
      await task.save();
      io.emit("taskAdded", task); // Broadcast new task
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
  });
  // ✅ Emit updates when a task is updated
  router.put("/tasks/:id", async (req, res) => {
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
  router.delete("/tasks/:id", async (req, res) => {
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
  router.get("/tasks/filter/:priority", async (req, res) => {
    try {
      const tasks = await Task.find({ priority: req.params.priority });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  });
  // Get tasks completed in a given time frame
  router.get("/tasks/progress/:timeframe", async (req, res) => {
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
  socket.on('updateTask', (task) => {
    io.emit('taskUpdated', task);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

module.exports = router;
