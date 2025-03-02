import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-200 text-gray-700 shadow-md fixed w-full top-0 left-0 z-50 h-16 flex items-center">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
        <img className="w-1/6" src="/image/logo.png" alt="Logo" />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu Items */}
        <ul className={`md:flex space-x-6 hidden`}>
          <NavItem to="/" text="Home" />
          <NavItem to="/dashboard" text="Dashboard" />
          <NavItem to="/about" text="About" />
          <NavItem to="/services" text="Services" />
          <NavItem to="/careers" text="Careers" />
          <NavItem to="/contact" text="Contact" />
          <NavItem to="/login" text="Sign in" />
        </ul>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col space-y-4 p-4 md:hidden">
            <NavItem to="/" text="Home" onClick={() => setIsOpen(false)} />
            <NavItem
              to="/dashboard"
              text="Dashboard"
              onClick={() => setIsOpen(false)}
            />
            <NavItem
              to="/about"
              text="About"
              onClick={() => setIsOpen(false)}
            />
            <NavItem
              to="/services"
              text="Services"
              onClick={() => setIsOpen(false)}
            />
            <NavItem
              to="/careers"
              text="Careers"
              onClick={() => setIsOpen(false)}
            />
            <NavItem
              to="/contact"
              text="Contact Us"
              onClick={() => setIsOpen(false)}
            />
            <NavItem
              to="/login"
              text="Sign up/ Sign up"
              onClick={() => setIsOpen(false)}
            />
          </ul>
        )}
      </div>
    </nav>
  );
};

// Navbar Item Component
const NavItem = ({ to, text, onClick }) => (
  <li>
    <Link
      to={to}
      className="text-grey-600 hover:text-blue-500 transition"
      onClick={onClick}
    >
      {text}
    </Link>
  </li>
);

export default Navbar;
