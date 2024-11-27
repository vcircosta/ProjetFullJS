const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ajout de la contrainte unique
  password: { type: String, required: true, minlength: 6 } // Validation de longueur
});

// Hashage du mot de passe avant sauvegarde
userSchema.pre('save', async function (next) {
  try {
    // Ne hache pas le mot de passe s'il n'a pas été modifié
    if (!this.isModified('password')) return next();

    // Hache le mot de passe avec un salt de 10
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (err) {
    next(err);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
