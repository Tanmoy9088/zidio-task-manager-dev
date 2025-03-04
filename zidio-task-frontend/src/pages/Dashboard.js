import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
// import Calendar from "react-calendar";
// import { Bar } from "react-chartjs-2";

import "react-calendar/dist/Calendar.css";
import TaskList from "../components/TaskList";
import TaskCalendar from "../components/TaskCalendar";
import RealTimeChart from "../components/RealTimeChart";
import ProgressChart from "../components/ProgressChart";
import { io } from "socket.io-client";
import AddTask from "../components/AddTask";
import TaskProgressChart from "../components/TaskProgressChart";
import TaskPriorityChart from "../components/TaskPriorityChart";

const socket = io("http://localhost:4000"); //backend url
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks!");
    }
  };

  // Add a new task
  const handleAddTask = async (task) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/tasks",
        task
      );
      const newTask = response.data;
      setTasks([...tasks, newTask]);

      // Emit socket event
      socket.emit("task-added", newTask);

      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task!");
    }
  };

  // Real-time updates using Socket.IO
  useEffect(() => {
    fetchTasks();

    // Listen for real-time updates
    socket.on("task-updated", (updatedTask) => {
      setTasks((prevTasks) => [...prevTasks, updatedTask]);
    });

    return () => socket.disconnect();
  }, []);

  //   const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-20">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 lg:w-1/5 bg-gray-800 text-white rounded-md p-4 md:h-screen">
        <nav className="space-y-3">
          <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/tasks"
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                ✅ Tasks
              </Link>
            </li>
            <li>
              <Link
                to="/analytics"
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                📈 Analytics
              </Link>
            </li>
            <li>
              <button className="w-full text-left py-2 px-4 bg-red-600 hover:bg-red-700 rounded">
                🔒 Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Add Task Form */}
          <div className="col-span-1 lg:col-span-1">
            <AddTask onAddTask={handleAddTask} />
          </div>

          {/* Task List */}
          <div className="col-span-1 lg:col-span-1 ">
            <TaskList tasks={tasks} setTasks={setTasks} />
          </div>

          {/* Progress Chart */}
          <div className="">
            <ProgressChart tasks={tasks} />
          </div>
        </div>
        <div>
          <TaskPriorityChart />
        </div>
        <div className="">
          <TaskProgressChart />
        </div>

        {/* Calendar View */}
        <div className="bg-white shadow-md rounded-md p-4 mt-6 ">
          <TaskCalendar tasks={tasks} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
