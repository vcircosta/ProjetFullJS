const express = require('express');
const router = express.Router();
const recommendationsController = require('../controllers/recommendationController');

/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: Gestion des recommandations
 */

/**
 * @swagger
 * /recommendations:
 *   get:
 *     summary: Récupérer toutes les recommandations
 *     tags: [Recommendations]
 *     responses:
 *       200:
 *         description: Liste de toutes les recommandations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la recommandation.
 *                     example: "rec-001"
 *                   userId:
 *                     type: string
 *                     description: ID de l'utilisateur concerné.
 *                     example: "12345"
 *                   content:
 *                     type: string
 *                     description: Contenu de la recommandation.
 *                     example: "Great leadership skills!"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date de création de la recommandation.
 *                     example: "2024-11-26T12:00:00Z"
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/', recommendationsController.getAllRecommendations);

/**
 * @swagger
 * /recommendations:
 *   post:
 *     summary: Ajouter une recommandation
 *     tags: [Recommendations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur qui reçoit la recommandation.
 *                 example: "12345"
 *               content:
 *                 type: string
 *                 description: Contenu de la recommandation.
 *                 example: "Great teamwork skills!"
 *     responses:
 *       201:
 *         description: Recommandation créée avec succès.
 *       400:
 *         description: Données invalides.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/', recommendationsController.createRecommendation);

/**
 * @swagger
 * /recommendations/{id}:
 *   put:
 *     summary: Mettre à jour une recommandation
 *     tags: [Recommendations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recommandation à mettre à jour.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Nouveau contenu de la recommandation.
 *                 example: "Excellent communication skills!"
 *     responses:
 *       200:
 *         description: Recommandation mise à jour avec succès.
 *       400:
 *         description: Données invalides.
 *       404:
 *         description: Recommandation non trouvée.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put('/:id', recommendationsController.updateRecommendation);

/**
 * @swagger
 * /recommendations/{id}:
 *   delete:
 *     summary: Supprimer une recommandation
 *     tags: [Recommendations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la recommandation à supprimer.
 *     responses:
 *       200:
 *         description: Recommandation supprimée avec succès.
 *       404:
 *         description: Recommandation non trouvée.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete('/:id', recommendationsController.deleteRecommendation);

module.exports = router;
