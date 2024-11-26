const Recommendation = require('../models/recommendation');

// Obtenir les recommandations d'un utilisateur
exports.getRecommendationsByUser = (req, res) => {
  const { userId } = req.params;
  Recommendation.find({ fromUser: userId })
    .populate('cv', 'nom prenom') // Peupler les champs du CV si nécessaire
    .then((recommendations) => res.status(200).json(recommendations))
    .catch((err) =>
      res.status(500).json({ message: 'Erreur lors de la récupération des recommandations', err })
    );
};

// Créer une nouvelle recommandation
exports.createRecommendation = (req, res) => {
  const { cv, fromUser, text } = req.body;

  const newRecommendation = new Recommendation({ cv, fromUser, text });

  newRecommendation
    .save()
    .then((recommendation) => res.status(201).json(recommendation))
    .catch((err) =>
      res.status(500).json({ message: 'Erreur lors de la création de la recommandation', err })
    );
};
