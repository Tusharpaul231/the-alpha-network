const Challenge = require('../models/Challenge');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create new challenge purchase
// @route   POST /api/challenges
// @access  Private
exports.createChallenge = async (req, res) => {
	try {
		const { challengeType, accountSize, price } = req.body;

		const challenge = await Challenge.create({
			user: req.user._id,
			challengeType,
			accountSize,
			price,
			currentBalance: accountSize,
			currentProfit: 0,
		});

		res.status(201).json(challenge);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc    Get user challenges
// @route   GET /api/challenges
// @access  Private
exports.getChallenges = async (req, res) => {
	try {
		const challenges = await Challenge.find({ user: req.user._id });
		res.json(challenges);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc    Get challenge by ID
// @route   GET /api/challenges/:id
// @access  Private
exports.getChallengeById = async (req, res) => {
	try {
		const challenge = await Challenge.findById(req.params.id);

		if (challenge && challenge.user.toString() === req.user._id.toString()) {
			res.json(challenge);
		} else {
			res.status(404).json({ message: 'Challenge not found' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

