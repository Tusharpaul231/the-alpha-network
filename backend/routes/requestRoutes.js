const express = require('express');
const router = express.Router();
const AccessRequest = require('../models/AccessRequest');
const emailService = require('../utils/emailService');

router.post('/request-pass', async (req, res) => {
  try {
    const { name, countryCode, mobile, email, city, qualification, dob, gender, questions } = req.body;

    if (!name || !countryCode || !mobile || !email || !city || !qualification || !dob || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!questions || !questions.q1 || !questions.q2 || !questions.q3 || !questions.q4 || !questions.q5) {
      return res.status(400).json({ error: "All questions must be answered" });
    }

    const entry = new AccessRequest({
      name,
      countryCode,
      mobile,
      email,
      city,
      qualification,
      dob,
      gender,
      questions
    });

    await entry.save();
    res.json({ success: true, message: "Request saved" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
