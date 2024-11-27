const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Gestion de l'authentification des utilisateurs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription d'un utilisateur
 *     tags: [Auth]
 *     description: Crée un nouvel utilisateur en utilisant un `username`, un `email` et un `password`.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: toto
 *               email:
 *                 type: string
 *                 format: email
 *                 example: toto@toto.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Utilisateur inscrit avec succès
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
 *                   example: "Inscription réussie"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "61a8f0b4d6a84e24a8f4c2b9"
 *                     username:
 *                       type: string
 *                       example: toto
 *                     email:
 *                       type: string
 *                       example: toto@toto.com
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Auth]
 *     description: Authentifie un utilisateur en utilisant son `email` et son `password`. Renvoie un token JWT si l'authentification est réussie.
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
 *                 example: toto@toto.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Connexion réussie
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
 *                   example: "Connexion réussie"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Déconnexion d'un utilisateur
 *     tags: [Auth]
 *     description: Invalide le token JWT pour déconnecter l'utilisateur.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
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
 *                   example: "Déconnexion réussie"
 *       401:
 *         description: Token JWT manquant ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.post('/logout', authController.logout);

module.exports = router;
