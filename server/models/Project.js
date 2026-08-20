const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  techStack: { type: String, required: true },
  aiResponse: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);