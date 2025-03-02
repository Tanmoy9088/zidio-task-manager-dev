import { useState } from "react";
import axios from "axios";
import socket from "../utils/socket";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const response = await fetch("http://localhost:4000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Feedback sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send feedback.");
      }
    } catch (error) {
      setStatus("Error sending feedback.");
    }
  };

  return (
    <div className=" contact-container flex flex-col items-center justify-center">
      <div className=" contact-card max-w-4xl w-full bg-blue-50 shadow-xl rounded-lg p-8">
        <h2 className=" contact-title text-3xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h2>
        <p className="text-xl text-center text-gray-600 mb-8">We would love to hear from you! Fill out the form below or reach out via email or phone.</p>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Contact Info Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <p className="text-gray-700">support@zidiotaskmanager.com</p>
            </div>
            <div className="flex items-center space-x-3">
              <p className="text-gray-700">+91 123 9088 123</p>
            </div>
            <div className="flex items-center space-x-3">
              <p className="text-gray-700">
                123 Task Manager, Bengaluru, India
              </p>
            </div>
          </div>

          <div>


            {" "}
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className=" contact-form space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className=" hh w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className=" hh w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className=" status-messgage w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>

          </div>
        </div>

        {/* Status Message */}
        {status && (
          <p className="text-center mt-4 text-sm text-gray-600">{status}</p>
        )}
      </div>
    </div>
  );
}

export default Contact;
