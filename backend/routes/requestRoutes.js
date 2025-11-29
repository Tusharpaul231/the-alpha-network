const express = require('express');
const router = express.Router();
const AccessRequest = require('../models/AccessRequest');
const emailService = require('../utils/emailService');

router.post('/request-pass', async (req, res) => {
  try {
    const { 
      name, countryCode, mobile, email,
      city, dob, gender, qualification, semester, specialization,
      questions 
    } = req.body;

    if (!name || !countryCode || !mobile || !email) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    for (let i = 1; i <= 10; i++) {
      if (!questions[`q${i}`]) {
        return res.status(400).json({ error: "All questions must be answered" });
      }
    }

    const entry = new AccessRequest({
      name,
      countryCode,
      mobile,
      email,
      city,
      dob,
      gender,
      qualification,
      semester,
      specialization,
      questions
    });

    await entry.save();

    // Send Email (Resend)
    emailService.sendSimpleEmail(
      email,
      "Access Request Received",
      `Hi ${name},\n\nWe received your request.\n\n— The Alpha Network`
    );

    res.json({ success: true, message: "Request saved" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
