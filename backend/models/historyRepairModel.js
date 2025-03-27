const mongoose = require('mongoose');

const historyRepairSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  date: { type: Date, required: true },
  serviceType: { type: String, required: true },
  cost: { type: Number, required: true },
  invoice: { type: String }, // Chemin ou URL du PDF
});

module.exports = mongoose.model('HistoryRepair', historyRepairSchema);