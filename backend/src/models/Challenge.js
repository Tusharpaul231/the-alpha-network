const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	challengeType: {
		type: String,
		enum: ['alpha-starter', 'alpha-pro', 'alpha-elite', 'instant-alpha'],
		required: true,
	},
	accountSize: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		enum: ['pending', 'active', 'passed', 'failed', 'funded'],
		default: 'pending',
	},
	profitTarget: Number,
	maxDrawdown: Number,
	dailyDrawdown: Number,
	currentBalance: Number,
	currentProfit: Number,
	profitSplit: {
		type: Number,
		default: 100,
	},
	startDate: Date,
	endDate: Date,
	paymentStatus: {
		type: String,
		enum: ['pending', 'completed', 'failed'],
		default: 'pending',
	},
	paymentId: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Challenge', challengeSchema);

