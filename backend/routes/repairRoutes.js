const express = require('express');
const router = express.Router();
const Repair = require('../models/repairModel');
// const validationResult= require('express-validator')
// const jwt = require('jsonwebtoken')

// Créer une réparation
router.post('/create', async (req, res) => {
    try {
        const { clientId, vehicleId, mecanicienId, startDate, estimatedCompletion, details, cost } = req.body;

        let repair = new Repair({
            clientId: clientId,
            vehicleId: vehicleId,
            mecanicienId: mecanicienId,
            startDate: startDate,
            estimatedCompletion: estimatedCompletion,
            details: details, 
            cost: cost
        })

        await repair.save();
        res.status(201).json({ msg: 'Réparation crée avec succès' })
    }
    catch (error) {
        res.status(500).json({ msg: 'Erreur serveur' });
    }
})

//Lire toutes les réparations

router.get('/', async (req, res) => {
    try {
        const repair = await Repair.find()
            .populate('vehicleId')
            .populate('clientId')
            .populate('mecanicienId');
        res.json(repair)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Modifier une réparation
router.put('/:id', async (req, res) => {
    try {
        const repair = await Repair.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(repair)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get réparation par mécanicien
router.get('/:idMeca', async (req, res) => {
    try {
        const repair = await Repair.find({ mecanicienId: req.params.idMeca })
            .populate('vehicleId')
            .populate('clientId');
        res.json(repair)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Get réparation par Id
router.get('/detail/:idRepair', async (req, res) => {
    try {
        const repair = await Repair.findById(req.params.idRepair)
            .populate('vehicleId')
            .populate('clientId');
        res.json(repair)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Supprimer une réparation
router.delete('/:id', async (req, res) => {
    try {
        await Repair.findByIdAndDelete(req.params.id)
        res.json({
            msg: 'Repair deleted successfully'
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

module.exports = router;

