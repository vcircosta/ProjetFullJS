const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');
const authMiddleware = require('../middleware/auth'); // Middleware d'authentification

/**
 * @swagger
 * tags:
 *   name: CVs
 *   description: Gestion des CV
 */

/**
 * @swagger
 * /cvs/public:
 *   get:
 *     summary: Récupérer tous les CV publics
 *     tags: [CVs]
 *     responses:
 *       200:
 *         description: Liste de tous les CV disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/public', cvController.getAllCvs);

/**
 * @swagger
 * /cvs/search:
 *   get:
 *     summary: Rechercher des CV par nom ou prénom
 *     tags: [CVs]
 *     parameters:
 *       - in: query
 *         name: nom
 *         schema:
 *           type: string
 *         description: Nom à rechercher
 *       - in: query
 *         name: prenom
 *         schema:
 *           type: string
 *         description: Prénom à rechercher
 *     responses:
 *       200:
 *         description: Résultat de la recherche
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: Aucun CV trouvé
 */
router.get('/search', cvController.searchCvs);

/**
 * @swagger
 * /cvs/{id}:
 *   get:
 *     summary: Récupérer les détails d'un CV par ID
 *     tags: [CVs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du CV
 *     responses:
 *       200:
 *         description: CV trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: CV introuvable
 */
router.get('/:id', authMiddleware, cvController.getCvById);

/**
 * @swagger
 * /cvs/mycv:
 *   get:
 *     summary: Récupérer le CV de l'utilisateur connecté
 *     tags: [CVs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: CV de l'utilisateur connecté
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: CV non trouvé
 *       401:
 *         description: Non autorisé
 */
router.get('/mycv', authMiddleware, cvController.getMyCv);

/**
 * @swagger
 * /cvs/mycv:
 *   post:
 *     summary: Créer un nouveau CV pour l'utilisateur connecté
 *     tags: [CVs]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *               prenom:
 *                 type: string
 *                 description: Prénom de l'utilisateur
 *               description:
 *                 type: string
 *                 description: Description du CV
 *               experiencesPedagogiques:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       description: Type de l'expérience pédagogique (Diplôme, Certification, Formation)
 *                     detail:
 *                       type: string
 *                       description: Détail de l'expérience pédagogique
 *               experiencesProfessionnelles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     poste:
 *                       type: string
 *                       description: Poste occupé
 *                     entreprise:
 *                       type: string
 *                       description: Entreprise
 *                     missions:
 *                       type: string
 *                       description: Missions réalisées
 *               visibility:
 *                 type: string
 *                 enum: [public, private]
 *                 description: Visibilité du CV
 *     responses:
 *       201:
 *         description: CV créé avec succès
 *       400:
 *         description: Champs manquants ou invalides
 *       401:
 *         description: Non autorisé
 */
router.post('/mycv', authMiddleware, cvController.createCV);

/**
 * @swagger
 * /cvs/mycv:
 *   put:
 *     summary: Mettre à jour le CV de l'utilisateur connecté
 *     tags: [CVs]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               description:
 *                 type: string
 *               experiencesPedagogiques:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       description: Type de l'expérience pédagogique (Diplôme, Certification, Formation)
 *                     detail:
 *                       type: string
 *                       description: Détail de l'expérience pédagogique
 *               experiencesProfessionnelles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     poste:
 *                       type: string
 *                     entreprise:
 *                       type: string
 *                     missions:
 *                       type: string
 *               visibility:
 *                 type: string
 *                 enum: [public, private]
 *     responses:
 *       200:
 *         description: CV mis à jour avec succès
 *       404:
 *         description: CV non trouvé
 *       401:
 *         description: Non autorisé
 */
router.put('/mycv', authMiddleware, cvController.updateCV);

/**
 * @swagger
 * /cvs/mycv:
 *   delete:
 *     summary: Supprimer le CV de l'utilisateur connecté
 *     tags: [CVs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: CV supprimé avec succès
 *       404:
 *         description: CV non trouvé
 *       401:
 *         description: Non autorisé
 */
router.delete('/mycv', authMiddleware, cvController.deleteCV);

module.exports = router;
