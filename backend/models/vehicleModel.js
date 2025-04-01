const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nameVehicle: { type: String, required: true },
  marqueVehicle: { type: String, required: true },
  licensePlate: { type: String, required: true },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);