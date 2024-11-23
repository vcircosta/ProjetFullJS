const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Données des CV en dur
const cvs = [
    {
        id: 1,
        nom: "Dupont",
        prenom: "Jean",
        description: "Développeur web passionné.",
        experiencesPedagogiques: [
            { type: "Diplôme", detail: "Licence en informatique" },
            { type: "Certification", detail: "Certifié JavaScript avancé" }
        ],
        experiencesProfessionnelles: [
            { poste: "Développeur Front-end", entreprise: "TechCorp", missions: "Création d'interfaces utilisateur." },
            { poste: "Développeur Fullstack", entreprise: "WebDev", missions: "Développement de sites web dynamiques." }
        ]
    },
    {
        id: 2,
        nom: "Martin",
        prenom: "Claire",
        description: "Designer UI/UX expérimentée.",
        experiencesPedagogiques: [
            { type: "Formation", detail: "Design graphique avancé" },
            { type: "Diplôme", detail: "Master en design numérique" }
        ],
        experiencesProfessionnelles: [
            { poste: "Designer UX", entreprise: "CreativeStudio", missions: "Optimisation d'expériences utilisateur." },
            { poste: "Consultante UX", entreprise: "DesignPro", missions: "Recherche utilisateur et wireframing." }
        ]
    },
    {
        id: 3,
        nom: "Leclerc",
        prenom: "Alice",
        description: "Manager de projets IT.",
        experiencesPedagogiques: [
            { type: "Diplôme", detail: "MBA en gestion de projet" },
            { type: "Certification", detail: "Certifiée PMP" }
        ],
        experiencesProfessionnelles: [
            { poste: "Chef de projet IT", entreprise: "Innovatech", missions: "Supervision de projets technologiques." },
            { poste: "Consultante IT", entreprise: "SolutionsPlus", missions: "Mise en œuvre de solutions IT." }
        ]
    }
];


// Route pour obtenir tous les CV
app.get('/cvs', (req, res) => {
    res.json(cvs);
});

// Route pour obtenir un CV spécifique via son ID
app.get('/cvs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cv = cvs.find(cv => cv.id === id);
    if (cv) {
        res.json(cv);
    } else {
        res.status(404).json({ error: "CV non trouvé" });
    }
});

// Route pour créer un nouveau CV
app.post('/cvs', (req, res) => {
    const { nom, prenom, description, experiencesPedagogiques, experiencesProfessionnelles } = req.body;

    // Validation des données
    if (
        !nom || typeof nom !== 'string' ||
        !prenom || typeof prenom !== 'string' ||
        !description || typeof description !== 'string' ||
        (experiencesPedagogiques && !Array.isArray(experiencesPedagogiques)) ||
        (experiencesProfessionnelles && !Array.isArray(experiencesProfessionnelles))
    ) {
        return res.status(400).json({ error: "Données invalides ou incomplètes" });
    }

    // Création d'un nouvel ID unique pour le CV
    const newId = cvs.length > 0 ? cvs[cvs.length - 1].id + 1 : 1;

    // Création du nouveau CV
    const newCv = {
        id: newId,
        nom,
        prenom,
        description,
        experiencesPedagogiques: experiencesPedagogiques || [],
        experiencesProfessionnelles: experiencesProfessionnelles || []
    };

    // Ajout du CV dans le tableau
    cvs.push(newCv);

    // Réponse avec le CV créé
    res.status(201).json({ message: "CV créé avec succès", cv: newCv });
});


// Route pour supprimer un CV via son ID
app.delete('/cvs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cvs.findIndex(cv => cv.id === id);
    
    if (index !== -1) {
        const deletedCv = cvs.splice(index, 1); // Supprime l'élément du tableau
        res.json({ message: "CV supprimé avec succès", cv: deletedCv[0] });
    } else {
        res.status(404).json({ error: "CV non trouvé" });
    }
});

// Route pour modifier un CV via son ID
app.put('/cvs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cvs.findIndex(cv => cv.id === id);

    if (index !== -1) {
        // Mise à jour des informations
        cvs[index] = {
            ...cvs[index], // Garde les données existantes pour ne pas tout remplacer
            ...req.body // Remplace uniquement les données envoyées dans le corps de la requête
        };
        res.json({ message: "CV modifié avec succès", cv: cvs[index] });
    } else {
        res.status(404).json({ error: "CV non trouvé" });
    }
});



// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
