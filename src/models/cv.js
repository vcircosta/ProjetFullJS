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
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  description: { type: String, required: true },
  experiencesPedagogiques: [
    {
      type: { type: String },
      detail: { type: String }
    }
  ],
  experiencesProfessionnelles: [
    {
      poste: { type: String },
      entreprise: { type: String },
      missions: { type: String }
    }
  ],
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'private',
  },
}, { timestamps: true });

module.exports = mongoose.model('CV', cvSchema);
