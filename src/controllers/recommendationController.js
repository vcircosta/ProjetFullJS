const Recommendation = require('../models/recommendation');

exports.getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find();
    res.status(200).json(recommendations);
  } catch (error) {
    console.error('Erreur lors de la récupération des recommandations :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
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
