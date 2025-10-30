const Payout = require('../models/Payout');
const Challenge = require('../models/Challenge');

// @desc    Request payout
// @route   POST /api/payouts
// @access  Private
exports.requestPayout = async (req, res) => {
	try {
		const { challengeId, amount, method, walletAddress } = req.body;

		const challenge = await Challenge.findById(challengeId);

		if (!challenge || challenge.user.toString() !== req.user._id.toString()) {
			return res.status(404).json({ message: 'Challenge not found' });
		}

		if (challenge.status !== 'funded') {
			return res.status(400).json({ message: 'Challenge is not funded yet' });
		}

		const payout = await Payout.create({
			user: req.user._id,
			challenge: challengeId,
			amount,
			method,
			walletAddress,
		});

		res.status(201).json(payout);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc    Get user payouts
// @route   GET /api/payouts
// @access  Private
exports.getPayouts = async (req, res) => {
	try {
		const payouts = await Payout.find({ user: req.user._id })
			.populate('challenge')
			.sort('-requestedAt');
		res.json(payouts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

