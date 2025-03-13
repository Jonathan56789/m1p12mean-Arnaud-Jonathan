const mongoose = require('mongoose');

const RendezVousSchema = new mongoose.Schema({
    date: { type: Date, required: true }, // Stocke la date complète
    heure: { type: String, required: true }, // Format HH:MM
    voiture: { type: String, required: true }, // Marque et modèle
    proprietaire: { type: String, required: true }, // Nom du client (peut être remplacé par idClient)
    service: { type: String, required: true }, // Service demandé (ex: vidange, réparation)
}, { timestamps: true });

module.exports = mongoose.model('RendezVous', RendezVousSchema);
