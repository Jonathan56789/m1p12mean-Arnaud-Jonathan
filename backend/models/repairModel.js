

const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  status: { type: String, enum: ['En attente', 'En cours', 'Terminé'], default: 'En attente' },
  details: { type: String }, // Détails de l'intervention (ex. "Remplacement des plaquettes de frein")
  estimatedCompletion: { type: Date }, // Date estimée de finalisation
  technician: { type: String }, // Nom du technicien (ex. "Michel Martin")
  progression:{type:Number,min:0,max:100,default:0}
});

module.exports = mongoose.model('Repair', repairSchema);