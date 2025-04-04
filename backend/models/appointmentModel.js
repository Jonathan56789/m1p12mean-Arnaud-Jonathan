const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  date: { type: Date, required: true },
  serviceType: { type: String, required: true },
  // confirmed: { type: Boolean, default: false },
  status: { type: String, enum: ['En attente', 'Confirmé', 'Terminé' , 'Assigné'], default: 'En attente' },
  details: { type: String }, // Optionnel : pour des notes supplémentaires
});

module.exports = mongoose.model('Appointment', appointmentSchema);