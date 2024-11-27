const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Inscription d'un utilisateur
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const user = new User({ username, email, password });
    await user.save();

    return res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur', error });
  }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: err });
  }
};

// Déconnexion (si tu gères les tokens côté serveur)
exports.logout = (req, res) => {
  // Ici, tu pourrais invalider le token côté serveur (si stocké) ou donner des instructions côté client.
  res.status(200).json({ message: 'Déconnexion réussie' });
};
