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

/**
 * @swagger
 * /auth/test-password:
 *   post:
 *     summary: Test de la méthode comparePassword
 *     tags: [Auth]
 *     description: Teste la comparaison de mot de passe en fournissant un email et un mot de passe.
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
 *         description: Mot de passe correct
 *       401:
 *         description: Mot de passe incorrect
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.post('/test-password', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await require('../models/user').findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      return res.status(200).json({ message: 'Mot de passe correct' });
    } else {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la vérification', error });
  }
});

module.exports = router;
