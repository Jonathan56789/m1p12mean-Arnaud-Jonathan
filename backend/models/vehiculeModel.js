const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  licensePlate: { type: String, required: true },
  status: { type: String, enum: ['En attente', 'En cours', 'Terminé'], default: 'En attente' },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);