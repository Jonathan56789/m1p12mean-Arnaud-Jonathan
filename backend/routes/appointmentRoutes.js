const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointmentModel');
const Notification = require('../models/notificationModel');
const auth = require('../middleware/authmiddleware'); // Importation explicite du middleware

router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment
      .find({ clientId: req.userId })
      .populate('vehicleId')
      .sort({ date: -1 });
    
    if (!appointments.length) {
      return res.status(404).json({ message: 'Aucun rendez-vous trouvé' });
    }
    res.json({ message: 'Rendez-vous récupérés avec succès', appointments });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { vehicleId, date, serviceType } = req.body;
    if (!vehicleId || !date || !serviceType) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
    
    const appointment = new Appointment({ 
      clientId: req.userId, 
      vehicleId, 
      date, 
      serviceType 
    });
    await appointment.save();
    
    await new Notification({ 
      clientId: req.userId, 
      message: 'Rendez-vous enregistré' 
    }).save();
    
    res.status(201).json({ message: 'Rendez-vous créé avec succès', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

module.exports = router;