const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  name: String,
  countryCode: String,
  mobile: String,
  email: String,
  bookingCode: String,
  bookingDate: String,
  bookingTime: String,
  createdAt: { type: Date, default: Date.now },
  ip: String
});

module.exports = mongoose.model('Booking', BookingSchema);
