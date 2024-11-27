const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Inscription d'un utilisateur
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Vérifier que les champs sont présents
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Créer un nouvel utilisateur
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
    
    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: err });
  }
};
