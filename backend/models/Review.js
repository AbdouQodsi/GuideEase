const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

  tourId: String,
  userId: String,
  name: String, 
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: String,
  feedback: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
