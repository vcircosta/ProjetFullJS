const CV = require('../models/cv'); // Modèle CV
const User = require('../models/user'); // Si nécessaire pour les utilisateurs

// Voir mon profil
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Assurez-vous que l'authMiddleware ajoute req.user
    if (!user) {
      return res.status(404).json({ message: 'Profil non trouvé.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du profil', error });
  }
};

// Créer un CV
exports.createCV = async (req, res) => {
  try {
    const { title, nom, prenom, description, experiencesPedagogiques, experiencesProfessionnelles, visibility } =
      req.body;

    const existingCv = await CV.findOne({ userId: req.user.userId });
    if (existingCv) {
      return res.status(400).json({ message: 'Un CV existe déjà pour cet utilisateur.' });
    }

    const cv = new CV({
      userId: req.user.userId, // Assurez-vous que l'authMiddleware ajoute req.user
      title,
      nom,
      prenom,
      description,
      experiencesPedagogiques,
      experiencesProfessionnelles,
      visibility,
    });
    await cv.save();
    res.status(201).json({ message: 'CV créé avec succès', cv });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du CV', error });
  }
};

// Voir mon CV
exports.getMyCv = async (req, res) => {
  try {
    const cv = await CV.findOne({ userId: req.user.userId });
    if (!cv) {
      return res.status(404).json({ message: 'CV non trouvé.' });
    }
    res.json(cv);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du CV', error });
  }
};

// Mettre à jour un CV avec remplacement des champs vides par les données existantes
exports.updateCV = async (req, res) => {
  try {
    // Récupérer le CV existant pour l'utilisateur connecté
    const existingCv = await CV.findOne({ userId: req.user.userId });
    if (!existingCv) {
      return res.status(404).json({
        message: 'CV non trouvé. Vous devez d\'abord créer un CV avant de le mettre à jour.',
      });
    }

    // Récupérer les données envoyées par le client
    const updates = req.body;

    // Fusionner les données existantes avec celles envoyées par le client
    const updatedData = {
      title: updates.title || existingCv.title, // Conserver le titre existant si non fourni
      description: updates.description || existingCv.description, // Conserver la description existante
      experiencesPedagogiques: updates.experiencesPedagogiques?.length
        ? updates.experiencesPedagogiques
        : existingCv.experiencesPedagogiques, // Conserver les expériences pédagogiques si non fournies
      experiencesProfessionnelles: updates.experiencesProfessionnelles?.length
        ? updates.experiencesProfessionnelles
        : existingCv.experiencesProfessionnelles, // Conserver les expériences professionnelles si non fournies
      visibility: updates.visibility || existingCv.visibility, // Conserver la visibilité existante
    };

    // Mettre à jour le CV dans la base de données
    const updatedCv = await CV.findOneAndUpdate(
      { userId: req.user.userId },
      { $set: updatedData },
      { new: true, runValidators: true } // Retourner le CV mis à jour et valider les données
    );

    // Retourner le CV mis à jour
    res.json({
      message: 'CV mis à jour avec succès.',
      cv: updatedCv,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du CV.', error });
  }
};


// Supprimer un CV
exports.deleteCV = async (req, res) => {
  try {
    const cv = await CV.findOneAndDelete({ userId: req.user.userId });
    if (!cv) {
      return res.status(404).json({ message: 'CV non trouvé' });
    }
    res.json({ message: 'CV supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du CV', error });
  }
};

// Rechercher des CV publics
exports.searchCvs = async (req, res) => {
  try {
    const { nom, prenom } = req.query;

    if (!nom && !prenom) {
      return res.status(400).json({ message: 'Veuillez fournir un nom ou un prénom pour la recherche.' });
    }

    const query = {
      visibility: 'public',
      ...(nom && { nom: { $regex: nom, $options: 'i' } }), // Recherche insensible à la casse
      ...(prenom && { prenom: { $regex: prenom, $options: 'i' } }),
    };

    const results = await CV.find(query);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Aucun CV correspondant trouvé.' });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche des CV', error });
  }
};

// Voir tous les CV publics
exports.getAllCvs = async (req, res) => {
  try {
    // Filtrer uniquement les CV ayant la visibilité définie sur "public"
    const cvs = await CV.find({ visibility: 'public' });
    res.json(cvs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des CV', error });
  }
};
