const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  firstname: { type: String, required: true},
  lastname: { type: String, required: true},
  username: { type: String, required: true, unique: true },
  email: { type: String, trim: true, unique: true }, 
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  permissions: { type: [String], default: ["createProject","deleteProject","createTask","deleteTask"] },
  activityHistory: { type: [String], default: [] }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

