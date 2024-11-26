// src/models/cv.js
const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  skills: [String],
  experience: [String],
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'private',
  },
}, { timestamps: true });

module.exports = mongoose.model('CV', cvSchema);
