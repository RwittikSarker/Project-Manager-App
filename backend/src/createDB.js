const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: String,
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  permissions: { type: [String], default: [] },
  activityHistory: { type: [String], default: [] }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

