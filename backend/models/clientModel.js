const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashé avec bcrypt
  name: { type: String, required: true },
});

module.exports = mongoose.model('Client', clientSchema);