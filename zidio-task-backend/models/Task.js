const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
});
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority:  { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
  dueDate: Date,
  subtasks: [{type:String}],
  status: { type: String, enum: ["pending","in-progress", "completed"], default: "pending" }, // ✅ Added status field
  progress: { type: Number, default: 0 }, // ✅ Added progress field (0% by default)
  deleted: { type: Boolean, default: false }, // New field
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);
