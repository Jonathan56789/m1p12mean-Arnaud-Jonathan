const express = require('express');
const router = express.Router();
const RendezVous = require('../model/rendezVousModel');
// Créer un rdv
router.post('/', async (req, res) => {
    try {
        const rdv = new RendezVous(req.body);
        await rdv.save();
        res.status(201).json(rdv);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Lire tous les rdv
router.get('/', async (req, res) => {
    try {
        const rdv = await RendezVous.find();
        res.json(rdv);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour  rdv
router.put('/:id', async (req, res) => {
    try {
        const rdv = await RendezVous.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(rdv);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Supprimer rdv
router.delete('/:id', async (req, res) => {
    try {
        await RendezVous.findByIdAndDelete(req.params.id);
        res.json({ message: "Article supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
