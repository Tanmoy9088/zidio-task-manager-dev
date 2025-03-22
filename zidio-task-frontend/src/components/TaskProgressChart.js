import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import socket from "../utils/socket";
Chart.register(...registerables);
const TaskProgressChart = ({progress}) => {
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      fetchTasks();
      const interval = setInterval(fetchTasks, 100); // Auto-update every 100 miliSeconds
      return () => clearInterval(interval);
    }, []);
  
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    const data = {
      labels: tasks.map(task => task.title),
      datasets: [
        {
          label: "Task Progress (%)",
          data: tasks.map(task => task.status==="completed"?100:0),
          backgroundColor: tasks.map(task => (task.progress === 100 ? "Green" : "Red")),
        },
      ],
    };
  
    return (
      <div className="w-full p-2 mt-6 pb-20 bg-white shadow-lg rounded-lg max-h-[400px]">
        <h2 className="text-xl font-bold mb-4 text-center">Task Progress Overview</h2>
        <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    );
  };
  
  export default TaskProgressChart;
  