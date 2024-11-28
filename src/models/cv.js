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
      type: { type: String, required: true},
      detail: { type: String, required: true}
    }
  ],
  experiencesProfessionnelles: [
    {
      poste: { type: String, required: true },
      entreprise: { type: String, required: true },
      missions: { type: String, required: true }
    }
  ],
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
}, { timestamps: true });

module.exports = mongoose.model('CV', cvSchema);
