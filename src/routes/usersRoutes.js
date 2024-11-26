// usersRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: "Inscription d'un utilisateur"
 *     tags: [User]
 *     description: "Crée un nouvel utilisateur."
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
 *         description: "Utilisateur créé avec succès"
 *       500:
 *         description: "Erreur lors de la création de l'utilisateur"
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: "Connexion d'un utilisateur"
 *     tags: [User]
 *     description: "Permet à un utilisateur de se connecter."
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
 *         description: "Connexion réussie"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: "Identifiants incorrects"
 *       500:
 *         description: "Erreur lors de la connexion"
 */
router.post('/login', userController.login);

module.exports = router;
