const User = require('../models/user');

// Récupérer le profil de l'utilisateur connecté
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Exclure le mot de passe
    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil :', error);
    res.status(500).json({ success: false, message: 'Erreur serveur lors de la récupération du profil', error: error.message });
  }
};

// Mettre à jour le profil de l'utilisateur
exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;

    // Vérification des mises à jour vides
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'Aucune donnée à mettre à jour' });
    }

    const user = await User.findByIdAndUpdate(req.user.userId, updates, { 
      new: true, 
      runValidators: true 
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé pour mise à jour' });
    }

    res.status(200).json({ success: true, message: 'Profil mis à jour avec succès', data: user });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil :', error);
    res.status(500).json({ success: false, message: 'Erreur serveur lors de la mise à jour du profil', error: error.message });
  }
};
