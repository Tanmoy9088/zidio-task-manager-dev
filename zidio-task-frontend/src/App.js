import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Services from "./pages/Services";
import Auth from "./components/Auth";
import Dashboard from "./pages/Dashboard";
import AddTask from "./components/AddTask";
import Navbar from "./pages/Navbar";
import Sidebar from "./components/sidebar";
import TaskList from "./pages/TaskList";
import Analytics from "./pages/Analytics";
import Login from "./pages/loginS";
// import PrivateRoute from "./components/PrivateRoutes";

const App = () => {
  return (
    <Router>
        <Navbar />
      <main className="container mx-auto ">
      
        <Routes>
          <Route path="/login" element={<Auth isSignup={false} />} />
          <Route path="/signup" element={<Auth isSignup={true} />} />
          {/* <Route element={<PrivateRoute />}> */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* </Route> */}
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={ <TaskList />} />
          <Route path="/analytics" element={ <Analytics />} />
          <Route path="/login" element={<Login />} />
         
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
