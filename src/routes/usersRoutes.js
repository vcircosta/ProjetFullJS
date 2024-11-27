const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/auth'); // Middleware JWT pour sécuriser les routes

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription d'un utilisateur
 *     tags: [User]
 *     description: Crée un nouvel utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       500:
 *         description: Erreur lors de la création de l'utilisateur
 */
router.post('/auth/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [User]
 *     description: Permet à un utilisateur de se connecter.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Identifiants incorrects
 *       500:
 *         description: Erreur lors de la connexion
 */
router.post('/auth/login', authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Déconnexion d'un utilisateur
 *     tags: [User]
 *     description: Déconnecte un utilisateur en invalidant son token.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *       401:
 *         description: Utilisateur non authentifié
 */
router.post('/auth/logout', authMiddleware, authController.logout);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Récupération du profil de l'utilisateur
 *     tags: [User]
 *     description: Permet de récupérer les informations du profil de l'utilisateur connecté.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profil récupéré avec succès
 *       401:
 *         description: Utilisateur non authentifié
 */
router.get('/profile', authMiddleware, profileController.getProfile);

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Mise à jour du profil de l'utilisateur
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
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *       401:
 *         description: Utilisateur non authentifié
 */
router.put('/profile', authMiddleware, profileController.updateProfile);

/**
 * @swagger
 * /profile:
 *   delete:
 *     summary: Suppression du profil de l'utilisateur
 *     tags: [User]
 *     description: Permet de supprimer le profil de l'utilisateur connecté.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profil supprimé avec succès
 *       401:
 *         description: Utilisateur non authentifié
 */
router.delete('/profile', authMiddleware, profileController.deleteProfile);

module.exports = router;
