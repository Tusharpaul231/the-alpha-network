const express = require('express');
const router = express.Router();
const AccessRequest = require('../models/AccessRequest');
const emailService = require('../utils/emailService');

router.post('/request-pass', async (req,res)=>{
  try {
    const { name, countryCode, mobile, email, questions } = req.body;

    if (!questions || !questions.q1 || !questions.q2 || !questions.q3 || !questions.q4 || !questions.q5) {
    return res.status(400).json({ error: "All questions must be answered" });
    }

    const entry = new AccessRequest({
      name,
      countryCode,
      mobile,
      email,
      questions
    });

    await entry.save();

    // send confirmation email (if configured)
    emailService.sendSimpleEmail(email, 'Access Request Received', `Hi ${name},\n\nWe received your request. We'll review and contact you.\n\n— The Alpha Network`);
    res.json({ success:true, message: 'Request saved' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
