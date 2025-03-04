import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove user token from storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed">
      <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link to="/tasks" className="block py-2 px-4 hover:bg-gray-700 rounded">
            ✅ Tasks
          </Link>
        </li>
        <li>
          <Link to="/analytics" className="block py-2 px-4 hover:bg-gray-700 rounded">
            📈 Analytics
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full text-left py-2 px-4 bg-red-600 hover:bg-red-700 rounded"
          >
            🔒 Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
