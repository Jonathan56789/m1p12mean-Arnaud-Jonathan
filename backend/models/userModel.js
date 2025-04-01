const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nomComplet: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mdp: { type: String, required: true },
    role: { type: String, enum:['mecanicien', 'client', 'manager']}
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
