const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: String,
  tourId: String,
  reason: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["in progress", "processed", "rejected"],
    default: "in progress"
  }
  
});

module.exports = mongoose.model('Report', reportSchema);
