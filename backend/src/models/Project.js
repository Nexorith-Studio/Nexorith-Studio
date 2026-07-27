const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ai_summary: { type: String, required: true }, // Max 2 sentences strictly for the LLM
  isFeatured: { type: Boolean, default: false }
});

module.exports = mongoose.model('Project', projectSchema);
