const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  date: { type: Date, required: true },
  serviceType: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Appointment', appointmentSchema);