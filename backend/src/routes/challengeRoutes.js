const express = require('express');
const router = express.Router();
const { createChallenge, getChallenges, getChallengeById } = require('../controllers/challengeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
	.post(protect, createChallenge)
	.get(protect, getChallenges);

router.get('/:id', protect, getChallengeById);

module.exports = router;

