const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
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
    ]
});

module.exports = mongoose.model('Cv', cvSchema);
