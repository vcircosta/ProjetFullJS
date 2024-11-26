require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const connectDB = require('./database'); // Connexion à la base de données
const cvRouter = require('./routes/cvRoutes'); // Routes des CV
const userRouter = require('./routes/usersRoutes'); // Routes des utilisateurs
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
      description: 'API pour la gestion des CV et des utilisateurs',
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
      { name: 'User', description: 'Gestion des utilisateurs' }, // Tag User d'abord
      { name: 'CVs', description: 'Gestion des CV' },            // Tag CVs ensuite
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

// Routes directes
app.use('/users', userRouter);  // Routes des utilisateurs en premier
app.use('/cvs', cvRouter);      // Routes des CV après
app.use('/recommendations', authMiddleware, recommendationRouter); // Routes des recommandations

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
