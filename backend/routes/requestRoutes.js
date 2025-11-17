const express = require('express');
const router = express.Router();
const AccessRequest = require('../models/AccessRequest');
const emailService = require('../utils/emailService');

router.post('/request-pass', async (req,res)=>{
  try {
    const { name, countryCode, mobile, email } = req.body;
    if(!name||!countryCode||!mobile||!email) return res.status(400).json({ error: 'Missing fields' });
    const rec = new AccessRequest({ name, countryCode, mobile, email });
    await rec.save();
    // send confirmation email (if configured)
    emailService.sendSimpleEmail(email, 'Access Request Received', `Hi ${name},\n\nWe received your request. We'll review and contact you.\n\n— The Alpha Network`);
    res.json({ success:true, message: 'Request saved' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
