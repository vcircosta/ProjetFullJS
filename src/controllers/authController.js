const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Inscription d'un utilisateur
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifie que tous les champs sont remplis
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérifie si l'email est déjà utilisé
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Crée un nouvel utilisateur
    const user = new User({ username, email, password });
    await user.save();

    return res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l’inscription :', error);
    return res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur', error });
  }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Email reçu :', email);
    console.log('Mot de passe reçu :', password);

    // Vérifie si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Utilisateur non trouvé.');
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    console.log('Utilisateur trouvé :', user);

    // Vérifie le mot de passe
    const isPasswordValid = await user.comparePassword(password);
    console.log('Mot de passe valide ?', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Génère un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token généré :', token);

    res.status(200).json({ token, message: 'Connexion réussie' });
  } catch (err) {
    console.error('Erreur lors de la connexion :', err);
    res.status(500).json({ message: 'Erreur lors de la connexion', error: err });
  }
};


// Déconnexion (généralement géré côté client en supprimant le token)
exports.logout = (req, res) => {
  // Note : Le backend ne gère pas forcément la déconnexion sauf si un système de token invalide est en place.
  res.status(200).json({ message: 'Déconnexion réussie' });
};
