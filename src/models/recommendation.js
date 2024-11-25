const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  cv: { type: mongoose.Schema.Types.ObjectId, ref: 'Cv', required: true }, // Référence au CV recevant la recommandation
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Utilisateur qui laisse la recommandation
  text: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
