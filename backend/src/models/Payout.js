const mongoose = require('mongoose');

const payoutSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	challenge: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Challenge',
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	method: {
		type: String,
		enum: ['crypto', 'bank', 'paypal', 'wise'],
		required: true,
	},
	status: {
		type: String,
		enum: ['pending', 'processing', 'completed', 'rejected'],
		default: 'pending',
	},
	walletAddress: String,
	transactionId: String,
	requestedAt: {
		type: Date,
		default: Date.now,
	},
	processedAt: Date,
});

module.exports = mongoose.model('Payout', payoutSchema);

