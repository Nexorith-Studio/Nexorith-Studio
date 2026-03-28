const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 320 },
    projectType: { type: String, required: true, trim: true, maxlength: 120 },
    budgetRange: { type: String, required: true, trim: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 8000 },
    contacted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

leadSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Lead", leadSchema);
