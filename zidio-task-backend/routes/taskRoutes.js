const express = require("express");
const Task = require("../models/Task"); // Import Task model
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// ✅ 1. Create a Task (POST /tasks)
router.post("/api/", async (req, res) => {
  try {
    const { title, description, priority, dueDate, subtasks } = req.body;
    const newTask = new Task({ title, description, priority, dueDate, subtasks });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// ✅ 2. Get All Tasks (GET /tasks)
router.get("/api/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// ✅ 3. Get a Single Task by ID (GET /tasks/:id)
router.get("/api/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error fetching task" });
  }
});

// ✅ 4. Update a Task (PUT /tasks/:id)
router.put("/api/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const progress = status === "completed" ? 100 : 0; // ✅ Update progress

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status, progress },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ error: "Task not found" });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task status" });
  }
});

// ✅ 5. Delete a Task (DELETE /tasks/:id)
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;

