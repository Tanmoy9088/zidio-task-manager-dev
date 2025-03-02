import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import socket from "../utils/socket";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:4000");

const TaskCalendar = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();

    // Listen for real-time updates
    socket.on("taskUpdated", () => {
      fetchTasks();
    });

    return () => socket.off("taskUpdated");
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:4000/api/tasks");
    const data = await response.json();
    setTasks(data);
  };

  return (
    <div className="h-[70vh] w-full">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={tasks.map((task) => ({
          id: task._id,
          title: task.title,
          start: task.dueDate,
          backgroundColor:
            task.priority === "High"
              ? "red"
              : task.priority === "Medium"
              ? "orange"
              : "green",
        }))}
        editable={true}
        eventClick={(info) => alert(`Task: ${info.event.title}`)}
        height="100%"
      />
    </div>
  );
};

export default TaskCalendar;
