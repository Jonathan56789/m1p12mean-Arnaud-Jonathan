const mongoose = require('mongoose');

const MecanicienSchema = new mongoose.Schema({
    mecanicienId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    status: { type: String, enum: ['non-occupé', 'occupé'], default: 'non-occupé' },

}, { timestamps: true });

module.exports = mongoose.model('InfoSupMecanicien', MecanicienSchema);
