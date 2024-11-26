const CV = require('../models/cv');

// Créer un CV
exports.createCV = async (req, res) => {
  try {
    const { title, description, skills, experience, visibility } = req.body;
    const cv = new CV({
      userId: req.user.userId, // Assurez-vous que l'authMiddleware ajoute req.user
      title,
      description,
      skills,
      experience,
      visibility,
    });
    await cv.save();
    res.status(201).json({ message: 'CV créé avec succès', cv });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du CV', error });
  }
};

// Mettre à jour un CV
exports.updateCV = async (req, res) => {
  try {
    const { cvId } = req.params;
    const updates = req.body;
    const cv = await CV.findOneAndUpdate(
      { _id: cvId, userId: req.user.userId }, // Assurez-vous que seul le propriétaire peut mettre à jour
      updates,
      { new: true }
    );
    if (!cv) {
      return res.status(404).json({ message: 'CV non trouvé' });
    }
    res.json({ message: 'CV mis à jour avec succès', cv });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du CV', error });
  }
};

// Supprimer un CV
exports.deleteCV = async (req, res) => {
  try {
    const { cvId } = req.params;
    const cv = await CV.findOneAndDelete({ _id: cvId, userId: req.user.userId });
    if (!cv) {
      return res.status(404).json({ message: 'CV non trouvé' });
    }
    res.json({ message: 'CV supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du CV', error });
  }
};

// Obtenir tous les CV
exports.getCVs = async (req, res) => {
  try {
    let cvs;
    if (req.user) {
      // Si l'utilisateur est connecté, on récupère ses CV privés et publics
      cvs = await CV.find({ userId: req.user.userId });
    } else {
      // Si l'utilisateur n'est pas connecté, on ne récupère que les CV publics
      cvs = await CV.find({ visibility: 'public' });
    }
    res.json(cvs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des CV', error });
  }
};
