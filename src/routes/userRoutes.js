const express = require('express');
const router = express.Router();
const profileController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth'); // Middleware JWT pour sécuriser les routes

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Gestion des profils utilisateurs
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Récupération du profil utilisateur
 *     tags: [User]
 *     description: Permet de récupérer les informations du profil de l'utilisateur connecté.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profil récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Profil récupéré avec succès"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "61a8f0b4d6a84e24a8f4c2b9"
 *                     username:
 *                       type: string
 *                       example: "johndoe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *       401:
 *         description: Utilisateur non authentifié ou token invalide
 *       500:
 *         description: Erreur serveur
 */
router.get('/profile', authMiddleware, profileController.getUser);

/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Mise à jour du profil utilisateur
 *     tags: [User]
 *     description: Permet de mettre à jour les informations du profil de l'utilisateur connecté.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johnupdated"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.updated@example.com"
 *               bio:
 *                 type: string
 *                 example: "Développeur web passionné"
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Profil mis à jour avec succès"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "61a8f0b4d6a84e24a8f4c2b9"
 *                     username:
 *                       type: string
 *                       example: "johnupdated"
 *                     email:
 *                       type: string
 *                       example: "john.updated@example.com"
 *                     bio:
 *                       type: string
 *                       example: "Développeur web passionné"
 *       400:
 *         description: Données de mise à jour invalides ou incomplètes
 *       401:
 *         description: Utilisateur non authentifié ou token invalide
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/profile', authMiddleware, profileController.updateUser);

module.exports = router;
