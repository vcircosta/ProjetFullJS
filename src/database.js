const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Mongo URI:', process.env.MONGO_URI); // Vérifier l'URI
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connexion à MongoDB Atlas réussie');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB Atlas', error);
    process.exit(1); // Arrêter si la connexion échoue
  }
};

module.exports = connectDB;