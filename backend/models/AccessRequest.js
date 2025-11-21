const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessRequestSchema = new Schema({
  name: String,
  countryCode: String,
  mobile: String,
  email: String,
  questions: {
    q1: { type: String, required: true },
    q2: { type: String, required: true },
    q3: { type: String, required: true },
    q4: { type: String, required: true },
    q5: { type: String, required: true },
  },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  alphaCodeId: { type: Schema.Types.ObjectId, ref: 'AlphaCode', default: null }
});

module.exports = mongoose.model('AccessRequest', AccessRequestSchema);
