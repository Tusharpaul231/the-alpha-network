const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginRecordSchema = new Schema({
  name: String,
  countryCode: String,
  mobile: String,
  email: String,
  alphaCode: String,
  captchaId: String,
  accepted: { type: Boolean, default: false },
  ip: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoginRecord', LoginRecordSchema);
