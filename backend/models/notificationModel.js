const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  details: { type: String }, // Contexte supplémentaire (ex. "Le technicien a commencé les réparations")
  read: { type: Boolean, default: false },
  urgent: { type: Boolean, default: false }, // Pour notifications urgentes
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);