exports.validateCv = (req, res, next) => {
    const { nom, prenom, description } = req.body;

    if (!nom || !prenom || !description) {
        return res.status(400).json({ error: "Les champs 'nom', 'prenom' et 'description' sont obligatoires." });
    }

    next();
};
