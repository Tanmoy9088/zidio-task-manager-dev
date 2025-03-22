import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";
const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   // const [dropdownOpen, setDropdownOpen] = useState(false);
//   return (
//     <nav className="bg-green-200 text-gray-700 shadow-md fixed w-full top-0 left-0 z-50 h-16 flex items-center">
//       <div className="container mx-auto flex justify-between items-center p-4">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-blue-600">
//           <img className="w-1/6" src="/image/logo.png" alt="Logo" />
//         </Link>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden text-2xl"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         {/* Menu Items */}
//         <ul className={`md:flex space-x-6 hidden`}>
//           <NavItem to="/home" text="Home" />
//           <NavItem to="/dashboard" text="Dashboard" />
//           <NavItem to="/about" text="About" />
//           <NavItem to="/services" text="Services" />
//           <NavItem to="/careers" text="Careers" />
//           <NavItem to="/contact" text="Contact" />
//           <NavItem to="/profile" text="Profile" />
//           {/* <NavItem to="/login" text="Login" /> */}
//         </ul>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <ul className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col space-y-4 p-4 md:hidden">
//             <NavItem to="/home" text="Home" onClick={() => setIsOpen(false)} />
//             <NavItem
//               to="/dashboard"
//               text="Dashboard"
//               onClick={() => setIsOpen(false)}
//             />
//             <NavItem
//               to="/about"
//               text="About"
//               onClick={() => setIsOpen(false)}
//             />
//             <NavItem
//               to="/services"
//               text="Services"
//               onClick={() => setIsOpen(false)}
//             />
//             <NavItem
//               to="/careers"
//               text="Careers"
//               onClick={() => setIsOpen(false)}
//             />
//             <NavItem
//               to="/contact"
//               text="Contact Us"
//               onClick={() => setIsOpen(false)}
//             />
//             <NavItem
//               to="/profile"
//               text="Profile"
//               onClick={() => setIsOpen(false)}
//             />
//           </ul>
//         )}
//       </div>
//     </nav>
//   );
// };

// // Navbar Item Component
// const NavItem = ({ to, text, onClick }) => (
//   <li>
//     <Link
//       to={to}
//       className="text-grey-600 hover:text-blue-500 transition"
//       onClick={onClick}
//     >
//       {text}
//     </Link>
//   </li>
// );
const { user } = useSelector((state) => state.auth);
const dispatch = useDispatch();

return (
  <div className='flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0'>
    <div className='flex gap-4'>
      <button
        onClick={() => dispatch(setOpenSidebar(true))}
        className='text-2xl text-gray-500 block md:hidden'
      >
        ☰
      </button>

      <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
        <MdOutlineSearch className='text-gray-500 text-xl' />

        <input
          type='text'
          placeholder='Search....'
          className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
        />
      </div>
    </div>

    <div className='flex gap-2 items-center'>
      <NotificationPanel />

      <UserAvatar />
    </div>
  </div>
);
};




export default Navbar;
