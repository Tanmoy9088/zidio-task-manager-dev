import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = ({ user,handleLogout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg mt-10">
     {/* Logo */}
     <Link to="/" className="text-white font-bold text-lg">
        Task Manager
      </Link>

      {/* User Profile Section */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <img
            src={user?.avatar || "https://via.placeholder.com/40"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="text-white font-medium">{user?.name || "Guest"}</span>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
            <div className="px-4 py-2 text-gray-700">
              <p className="font-bold">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <hr />
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
            >
              View Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      </div>
    );
  };
  
  export default Profile;
  