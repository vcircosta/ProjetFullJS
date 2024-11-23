// Données en mémoire (tableau)
let cvs = [
    {
        id: 1,
        nom: 'Dupont',
        prenom: 'Jean',
        description: 'Développeur web passionné.',
        experiencesPedagogiques: [
            { type: 'Diplôme', detail: 'Licence en informatique' },
            { type: 'Certification', detail: 'Certifié JavaScript avancé' },
        ],
        experiencesProfessionnelles: [
            { poste: 'Développeur Front-end', entreprise: 'TechCorp', missions: 'Création d\'interfaces utilisateur.' },
        ],
    },
    {
        id: 2,
        nom: 'Martin',
        prenom: 'Claire',
        description: 'Designer UI/UX expérimentée.',
        experiencesPedagogiques: [
            { type: 'Formation', detail: 'Design graphique avancé' },
        ],
        experiencesProfessionnelles: [
            { poste: 'Designer UX', entreprise: 'CreativeStudio', missions: 'Optimisation d\'expériences utilisateur.' },
        ],
    },
];

// Récupérer tous les CV
exports.getAllCvs = (req, res) => {
    res.json(cvs);
};

// Récupérer un CV par ID
exports.getCvById = (req, res) => {
    const id = parseInt(req.params.id);
    const cv = cvs.find((cv) => cv.id === id);
    if (!cv) {
        return res.status(404).json({ message: 'CV non trouvé' });
    }
    res.json(cv);
};

// Créer un nouveau CV
exports.createCv = (req, res) => {
    const { nom, prenom, description, experiencesPedagogiques, experiencesProfessionnelles } = req.body;

    if (!nom || !prenom || !description) {
        return res.status(400).json({ message: 'Les champs nom, prenom et description sont obligatoires.' });
    }

    const newCv = {
        id: cvs.length > 0 ? cvs[cvs.length - 1].id + 1 : 1,
        nom,
        prenom,
        description,
        experiencesPedagogiques: experiencesPedagogiques || [],
        experiencesProfessionnelles: experiencesProfessionnelles || [],
    };

    cvs.push(newCv);
    res.status(201).json({ message: 'CV créé avec succès.', cv: newCv });
};

// Mettre à jour un CV
exports.updateCv = (req, res) => {
    const id = parseInt(req.params.id);
    const cvIndex = cvs.findIndex((cv) => cv.id === id);

    if (cvIndex === -1) {
        return res.status(404).json({ message: 'CV non trouvé.' });
    }

    const { nom, prenom, description, experiencesPedagogiques, experiencesProfessionnelles } = req.body;

    if (!nom && !prenom && !description) {
        return res.status(400).json({ message: 'Au moins un champ est requis pour la mise à jour.' });
    }

    cvs[cvIndex] = {
        ...cvs[cvIndex],
        ...req.body,
    };

    res.json({ message: 'CV mis à jour avec succès.', cv: cvs[cvIndex] });
};

// Supprimer un CV
exports.deleteCv = (req, res) => {
    const id = parseInt(req.params.id);
    const cvIndex = cvs.findIndex((cv) => cv.id === id);

    if (cvIndex === -1) {
        return res.status(404).json({ message: 'CV non trouvé.' });
    }

    const deletedCv = cvs.splice(cvIndex, 1);
    res.json({ message: 'CV supprimé avec succès.', cv: deletedCv[0] });
};
