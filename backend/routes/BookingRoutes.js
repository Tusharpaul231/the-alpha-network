const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const emailService = require('../utils/emailService'); // existing util

router.post('/booking', async (req, res) => {
  try {
    const { name, countryCode, mobile, email, bookingCode, bookingDate } = req.body;
    if (!bookingCode || bookingCode !== process.env.ALPHA_CODE) {
      return res.status(401).json({ message: "Invalid Alpha Code" });
    }
    if (!name || !countryCode || !mobile || !email || !bookingDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const rec = new Booking({
      name, countryCode, mobile, email,
      bookingCode: bookingCode || null,
      bookingDate,
      ip: req.ip
    });
    await rec.save();

    // send confirmation email (if transporter configured)
    const subject = 'Masterclass Booking Received - The Alpha Network';
    const text = `Hi ${name},\n\nThanks for booking the Masterclass on \n${bookingDate}.\nWe will contact you with next steps.\n\nRegards,\nThe Alpha Network`;
    emailService.sendSimpleEmail(email, subject, text).catch(err => console.warn('Email fail:', err.message));

    res.json({ success: true, message: 'Booking saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
