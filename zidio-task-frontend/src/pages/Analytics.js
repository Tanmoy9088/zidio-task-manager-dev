import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import socket from "../utils/socket";
import { Chart, ArcElement, Tooltip, Legend, registerables } from "chart.js";
// Register necessary Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

Chart.register(...registerables);

const Analytics = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();

    // ✅ Listen for new tasks added in real-time
    socket.on("taskAdded", (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });

    socket.on("taskDeleted", (taskId) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    });

    return () => {
      socket.off("taskAdded");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasks = tasks.length - completedTasks;

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Task Progress",
        data: [completedTasks, pendingTasks],
        backgroundColor: ["#4CAF50", "#FFC107"],
      },
    ],
  };

  const [taskData, setTaskData] = useState({ high: 0, medium: 0, low: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/tasks"); // Fetch tasks from backend
        const tasks = response.data;

        const high = tasks.filter((task) => task.priority === "High").length;
        const medium = tasks.filter(
          (task) => task.priority === "Medium"
        ).length;
        const low = tasks.filter((task) => task.priority === "Low").length;

        setTaskData({ high, medium, low });
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 100); // Auto-refresh every 100 miliseconds for real-time updates

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "Task Count",
        data: [taskData.high, taskData.medium, taskData.low],
        backgroundColor: ["#FF4D4D", "#FFC107", "#4CAF50"],
        borderColor: ["#B22222", "#FF9800", "#2E7D32"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Task Priority Distribution" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // const socket = io("http://localhost:4000");

  return (
    <main className="flex-1 p-4 pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add Task Form */}
        <div className=" bg-white rounded-lg shadow-lg col-span-1 lg:col-span-1 p-4">
          <h2 className="text-xl font-semibold text-center mb-4">
            Task Progress
          </h2>
          <div className=" px-2 overflow-hidden h-[320px]">
            <Doughnut
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "top" } },
              }}
            />
          </div>
          <p className="text-center mt-2 text-gray-600">
            Completed: {completedTasks} / {tasks.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg col-span-1 lg:col-span-1 h-[450px] pb-16 pt-4 ">
          <h2 className="text-xl font-semibold text-center mb-4">
            Task Progress Overview
          </h2>
          <Bar
            data={data}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
        <div className=" p-5 bg-white rounded-lg shadow-lg w-full h-[450px] max-w-md">
          <h2 className="text-xl font-semibold text-center mb-4">📊 Task Priority Chart</h2>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </main>
  );
};

export default Analytics;
