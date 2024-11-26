const mongoose = require('mongoose');

// Schéma pour les expériences pédagogiques
const pedagogiqueSchema = new mongoose.Schema({
  type: { type: String, enum: ['Diplôme', 'Certification', 'Formation'], required: true },
  detail: { type: String, required: true },
});

// Schéma pour les expériences professionnelles
const professionnelSchema = new mongoose.Schema({
  poste: { type: String, required: true },
  entreprise: { type: String, required: true },
  missions: { type: String, required: true },
});

// Schéma principal pour le CV
const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    description: { type: String, required: true },
    experiencesPedagogiques: [pedagogiqueSchema], // Tableau de sous-documents pédagogiques
    experiencesProfessionnelles: [professionnelSchema], // Tableau de sous-documents professionnels
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'private',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CV', cvSchema);
