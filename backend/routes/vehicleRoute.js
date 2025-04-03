const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicleModel');
const auth = require('../middleware/authmiddleware');

// Create vehicle
router.post('/create', auth, async (req, res) => { //Mila auth
    try {
        const { userId, nameVehicle, licensePlate , marqueVehicle} = req.body;

        let vehicle = new Vehicle({
            userId: req.userId,
            nameVehicle: nameVehicle,
            licensePlate: licensePlate, 
            marqueVehicle: marqueVehicle
        })

        await vehicle.save();
        res.status(201).json({ vehicle, msg: 'Vehicule crée avec succès' })
    }
    catch (error) {
        res.status(500).json({
            msg: 'Erreur server'
        })
    }
})
//liste mon vehicule
router.get('/myvehicles', auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ userId: req.userId });
    res.json({ vehicles });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des véhicules' });
  }
});
//Lire toutes les vehicles

router.get('/', async (req, res) => {
    try {
        const vehicle = await Vehicle.find()
        res.json(vehicle)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Supprimer une véhicule
router.delete('/:id', async (req, res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id)
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
module.exports = router;
