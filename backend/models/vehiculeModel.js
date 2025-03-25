// const mongoose = require('mongoose');

// const vehicleSchema = new mongoose.Schema({
//   clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
//   licensePlate: { type: String, required: true },
//   status: { type: String, enum: ['En attente', 'En cours', 'Terminé'], default: 'En attente' },
// });

// module.exports = mongoose.model('Vehicle', vehicleSchema);

const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  licensePlate: { type: String, required: true },
  status: { type: String, enum: ['En attente', 'En cours', 'Terminé'], default: 'En attente' },
  details: { type: String }, // Détails de l'intervention (ex. "Remplacement des plaquettes de frein")
  estimatedCompletion: { type: Date }, // Date estimée de finalisation
  technician: { type: String }, // Nom du technicien (ex. "Michel Martin")
});

module.exports = mongoose.model('Vehicle', vehicleSchema);