const express = require('express');
const router = express.Router();
const { requestPayout, getPayouts } = require('../controllers/payoutController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
	.post(protect, requestPayout)
	.get(protect, getPayouts);

module.exports = router;

