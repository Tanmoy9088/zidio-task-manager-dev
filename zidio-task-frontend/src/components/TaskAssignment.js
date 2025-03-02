// import React, { useState } from "react";

// const TaskAssignment = () => {
 
//     onst [title, setTitle] = useState("");
//     const [priority, setPriority] = useState("Medium");
//     const [dueDate, setDueDate] = useState("");
//     const [dueTime, setDueTime] = useState("");
//     const [subtasks, setSubtasks] = useState([]);
//     const [subtaskInput, setSubtaskInput] = useState("");
  
//     const handleAddSubtask = () => {
//       if (subtaskInput.trim()) {
//         setSubtasks([...subtasks, subtaskInput.trim()]);
//         setSubtaskInput("");
//       }
//     };
  
//     const handleRemoveSubtask = (index) => {
//       setSubtasks(subtasks.filter((_, i) => i !== index));
//     };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title.trim()) return;
    
//         const newTask = {
//             title,
//             priority,
//             dueDate,
//             dueTime,
//             subtasks,
//             status: "pending",
//         };
      
//           try {
//             const response = await axios.post("http://localhost:4000/tasks", newTask);
//             socket.emit("taskAdded", response.data);
//             setTitle("");
//             setPriority("Medium");
//             setDueDate("");
//             setDueTime("");
//             setSubtasks([]);
//           } catch (error) {
//             console.error("Error adding task:", error);
//         }
//     };
    

//   return (
//     <div className="w-1/2 bg-blue-50 rounded-lg p-4 shadow-lg">
//       <form onSubmit={handleSubmit}>
//         <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
//           Task Assignment
//         </h2>
//         <input
//           type="text"
//           placeholder="Task Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="border px-4 py-2 rounded w-full mb-2"
//         />
//         <select
//           value={priority}
//           onChange={(e) => setPriority(e.target.value)}
//           className="border px-4 py-2 rounded w-full mb-2"
//         >
//           <option value="High">High</option>
//           <option value="Medium">Medium</option>
//           <option value="Low">Low</option>
//         </select>
//         {subtasks.map((subtask, index) => (
//           <input
//             key={index}
//             type="text"
//             placeholder={`Subtask ${index + 1}`}
//             value={subtask}
//             onChange={(e) =>
//               setSubtasks((prev) =>
//                 prev.map((s, i) => (i === index ? e.target.value : s))
//               )
//             }
//             className="border px-4 py-2 rounded w-full mb-2"
//           />
//         ))}
//         <button
//           type="button"
//           onClick={() => setSubtasks([...subtasks, ""])}
//           className="text-blue-600 mb-2"
//         >
//           + Add Subtask
//         </button>
//         <input
//           type="date"
//           value={deadline}
//           onChange={(e) => setDeadline(e.target.value)}
//           className="border px-4 py-2 rounded w-full mb-2"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-2 hover:bg-blue-500"
//         >
//           <b>ADD TASK</b>
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TaskAssignment;
