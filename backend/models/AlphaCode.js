const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlphaCodeSchema = new Schema({
  code: { type: String, unique: true },
  singleUse: { type: Boolean, default: true },
  issuedToEmail: { type: String, default: null },
  issuedToMobile: { type: String, default: null },
  used: { type: Boolean, default: false },
  issuedAt: { type: Date, default: Date.now },
  usedAt: { type: Date, default: null },
  expiresAt: { type: Date, default: null },
  issuedBy: { type: String, default: null },
  note: { type: String, default: null }
});

module.exports = mongoose.model('AlphaCode', AlphaCodeSchema);
