const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
  clientId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, 
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  mecanicienId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Id du User mécanicien
  startDate: { type: Date, required: true }, // Date de début
  estimatedCompletion: { type: Date, required: true }, // Date estimée de finalisation
  status: { type: String, enum: ['En attente', 'En cours', 'Terminé'], default: 'En attente' },
  endDate: { type: Date, default: null }, // Date de fin
  progression: { type: Number, min: 0, max: 100, default: 0 }, // Pour le progress-bar
  details: { type: String, required: true},// Détails de l'intervention (ex. "Remplacement des plaquettes de frein")
}, { timestamps: true });

module.exports = mongoose.model('Repair', repairSchema);