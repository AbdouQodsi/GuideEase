const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  userType: String,
  license: String,
  introduction: String,
});

module.exports = mongoose.model('User', userSchema);
