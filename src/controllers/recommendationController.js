const Recommendation = require('../models/recommendation');

exports.getAllRecommendations = (req, res) => {
  Recommendation.find()
    .populate('cv', 'nom prenom')
    .then((recommendations) => res.status(200).json(recommendations))
    .catch((err) =>
      res.status(500).json({ message: 'Erreur lors de la récupération des recommandations', err })
    );
};

exports.getRecommendationsByUser = (req, res) => {
  const { userId } = req.params;
  Recommendation.find({ fromUser: userId })
    .populate('cv', 'nom prenom')
    .then((recommendations) => res.status(200).json(recommendations))
    .catch((err) =>
      res.status(500).json({ message: 'Erreur lors de la récupération des recommandations', err })
    );
};

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

exports.updateRecommendation = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  Recommendation.findByIdAndUpdate(
    id,
    { text },
    { new: true, runValidators: true }
  )
    .then((updatedRecommendation) => {
      if (!updatedRecommendation) {
        return res.status(404).json({ message: 'Recommandation non trouvée' });
      }
      res.status(200).json(updatedRecommendation);
    })
    .catch((err) =>
      res.status(500).json({ message: 'Erreur lors de la mise à jour de la recommandation', err })
    );
};

exports.deleteRecommendation = (req, res) => {
  const { id } = req.params;

  Recommendation.findByIdAndDelete(id)
    .then((deletedRecommendation) => {
      if (!deletedRecommendation) {
        return res.status(404).json({ message: 'Recommandation non trouvée' });
      }
      res.status(200).json({ message: 'Recommandation supprimée avec succès' });
    })
    .catch((err) =>
      res.status(500).json({ message: 'Erreur lors de la suppression de la recommandation', err })
    );
};
