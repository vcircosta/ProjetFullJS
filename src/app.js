require('dotenv').config(); // Charger les variables d'environnement depuis un fichier .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const connectDB = require('./database'); // Connexion à la base de données
const authRouter = require('./routes/authRoutes'); // Routes d'authentification
const userRouter = require('./routes/userRoutes'); // Routes des utilisateurs et profils
const cvRouter = require('./routes/cvRoutes'); // Routes des CV
const recommendationRouter = require('./routes/recommendationRoutes'); // Routes des recommandations
const authMiddleware = require('./middleware/auth'); // Middleware d'authentification

// Initialiser l'application Express
const app = express();

// Middleware pour gérer les requêtes CORS
app.use(cors());

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Connexion à la base de données MongoDB via Mongoose
connectDB();

// Configuration de la documentation Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'CV API',
      version: '1.0.0',
      description: 'API pour la gestion des CV, des utilisateurs et des recommandations',
    },
    servers: [
      { url: process.env.SERVER_URL || 'http://localhost:5000/' },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    tags: [
      { name: 'Auth', description: 'Authentification' },
      { name: 'User', description: 'Gestion des profils utilisateurs' },
      { name: 'CVs', description: 'Gestion des CVs' },
      { name: 'Recommendations', description: 'Gestion des recommandations' },
    ],
  },
  apis: ['./src/routes/*.js'], // Assurez-vous que ce chemin est correct
};

// Initialisation de Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Route de test pour vérifier si le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Hello world');
});

// Routes pour l'authentification
app.use('/auth', authRouter);

// Routes pour gérer les utilisateurs et profils
app.use('/users', userRouter);

// Routes pour gérer les CVs
app.use('/cvs', cvRouter);

// Routes pour gérer les recommandations (avec authentification requise)
app.use('/recommendations', authMiddleware, recommendationRouter);

app.get('/api/healthcheck', (req, res) => {
  res.json({ message: 'Backend is connected!' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Une erreur interne est survenue.' });
});

// Gestion des routes non définies (404)
app.use((req, res) => {
  res.status(404).send("Désolé, cette route n'existe pas");
});

// Démarrage du serveur sur le port 5000
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});

module.exports = app;