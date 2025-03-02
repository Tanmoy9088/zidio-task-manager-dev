const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const nodemailer = require('nodemailer');
const { io } = require('../server'); // Import socket instance

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Submit feedback
router.post('/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newFeedback = new Feedback({ name, email, message });

    await newFeedback.save();
    
    // Emit real-time update
    io.emit('newFeedback', newFeedback);

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for your feedback!',
      text: `Hello ${name},\n\nThank you for your feedback:\n"${message}"\n\nBest regards, Task Manager Team`
    };
    
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });

  } catch (error) {
    res.status(500).json({ error: 'Error submitting feedback' });
  }
});

module.exports = router;
