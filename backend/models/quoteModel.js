const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  description: { type: String, required: true },
  attachments: [{ type: String }], // URLs des fichiers joints
  status: { type: String, enum: ['En attente', 'Répondu'], default: 'En attente' },
  response: { type: String }, // Réponse du garage
});

module.exports = mongoose.model('Quote', quoteSchema);