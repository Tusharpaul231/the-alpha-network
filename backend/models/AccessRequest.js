const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessRequestSchema = new Schema({
  name: String,
  countryCode: String,
  mobile: String,
  email: String,
  city: String,
  dob: String,
  gender: String,
  qualification: String,
  semester: String,
  specialization: String,
  
  questions: {
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    q5: String,
    q6: String,
    q7: String,
    q8: String,
    q9: String,
    q10: String,
  },

  approved: { type: Boolean, default: false },
  alphaCodeId: { type: Schema.Types.ObjectId, ref: 'AlphaCode', default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AccessRequest', AccessRequestSchema);
