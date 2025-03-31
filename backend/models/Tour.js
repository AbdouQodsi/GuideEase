const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: String,
  image: String, 
  description: String,
  date: String,
  map: String,
  numberOfPeople: Number,
  duration: String,
  language: String,
  meetingPoint: String,
  included: String,
  activity: String,
  priceAdult: Number,
  priceChild: Number,
  category: String,
  userId: String,
  mapEmbed: String,

});

module.exports = mongoose.model('Tour', tourSchema);
