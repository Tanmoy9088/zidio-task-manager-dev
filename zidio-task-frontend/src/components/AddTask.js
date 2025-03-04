import React, { useState } from "react";
import axios from "axios";
import socket from "../utils/socket";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:4000");

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskInput, setSubtaskInput] = useState("");

  const handleAddSubtask = () => {
    if (subtaskInput.trim()) {
      setSubtasks([...subtasks, subtaskInput.trim()]);
      setSubtaskInput("");
    }
  };

  const handleRemoveSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title,
      priority,
      dueDate,
      dueTime,
      subtasks,
      status: "pending",
    };

    try {
      const response = await axios.post("http://localhost:4000/tasks", newTask);
      socket.emit("taskAdded", response.data);
      setTitle("");
      setPriority("Medium");
      setDueDate("");
      setDueTime("");
      setSubtasks([]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="bg-blue-300 px-6 pt-2 rounded-lg shadow-lg w-full h-[400px] max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Add New Task</h2>

      <form onSubmit={handleAddTask} className="space-y-4">
        {/* Task Title */}
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Task Title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        {/* Priority Dropdown */}
        <select
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">🔥 High</option>
          <option value="Medium">⚡ Medium</option>
          <option value="Low">✅ Low</option>
        </select>

        {/* Due Date & Time */}
        <div className="flex space-x-2">
          <input
            type="date"
            className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <input
            type="time"
            className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
          />
        </div>

        {/* Subtasks Input */}
        <div>
          <div className="flex">
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Add subtask..."
              value={subtaskInput}
              onChange={(e) => setSubtaskInput(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddSubtask}
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              +
            </button>
          </div>
          <ul className="mt-2 space-y-1">
            {subtasks.map((subtask, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
              >
                {subtask}
                <button
                  onClick={() => handleRemoveSubtask(index)}
                  className="text-red-500 font-bold"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
