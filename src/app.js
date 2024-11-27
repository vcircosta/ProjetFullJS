require('dotenv').config();
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

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
connectDB();

// Swagger Documentation
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'CV API',
      version: '1.0.0',
      description: 'API pour la gestion des CV, des utilisateurs et des recommandations',
    },
    servers: [
      { url: process.env.SERVER_URL || 'http://localhost:3000/' },
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

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Test route
app.get('/', (req, res) => {
  res.send('Hello world');
});

// Routes pour l'authentification
app.use('/auth', authRouter);

// Routes des utilisateurs et profils
app.use('/users', userRouter);

// Routes des CVs
app.use('/cvs', cvRouter);

// Routes des recommandations (avec authentification)
app.use('/recommendations', authMiddleware, recommendationRouter);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Une erreur interne est survenue.' });
});

// Gestion des routes non définies
app.use((req, res) => {
  res.status(404).send("Désolé, cette route n'existe pas");
});

module.exports = app;
