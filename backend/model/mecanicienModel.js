const mongoose = require('mongoose');

const MecanicienSchema = new mongoose.Schema({
    nomComplet: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mdp: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Mecanicien', MecanicienSchema);
