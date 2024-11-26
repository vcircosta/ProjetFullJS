const express = require('express');
const router = express.Router();
const recommendationsController = require('../controllers/recommendationController');


// Ajoute une recommandation
router.post('/', recommendationsController.createRecommendation);

// Retourne les recommandations d'un utilisateur spécifique
router.get('/:userId', recommendationsController.getRecommendationsByUser);

module.exports = router;
