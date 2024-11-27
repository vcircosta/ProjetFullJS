const mongoose = require('mongoose');
require('dotenv').config(); // Charger les variables d'environnement depuis .env

const connectDB = async () => {
  try {
    console.log('Mongo URI:', process.env.MONGO_URI); // Vérifier l'URI
    await mongoose.connect(process.env.MONGO_URI); // Plus besoin des options deprecated
    console.log('Connexion à MongoDB Atlas réussie');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB Atlas', error);
    process.exit(1); // Arrêter l'application si la connexion échoue
  }
};

module.exports = connectDB;
