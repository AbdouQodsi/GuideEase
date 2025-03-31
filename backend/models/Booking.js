const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

  userId: String,
  tourId: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  totalPrice: Number,
  cardNumber: String,
  expiryMonth: String,
  expiryYear: String,
  securityNo: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
