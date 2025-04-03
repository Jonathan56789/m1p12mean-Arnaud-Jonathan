const express = require('express');
const router = express.Router();
const Repair = require('../models/repairModel');
const auth = require('../middleware/authmiddleware');
const Infosup = require('../models/mecanicienModel')
// const validationResult= require('express-validator')
// const jwt = require('jsonwebtoken')

// Créer une réparation
router.post('/create', async (req, res) => {
    try {
        const { clientId, vehicleId, mecanicienId, startDate, details, cost } = req.body;

        let repair = new Repair({
            clientId: clientId,
            vehicleId: vehicleId,
            mecanicienId: mecanicienId,
            startDate: startDate,
            // estimatedCompletion: estimatedCompletion,
            details: details,
            cost: cost
        });


        const savedRepair = await repair.save();
        const updatedInfoSup = await Infosup.findOneAndUpdate(
            { mecanicienId: savedRepair.mecanicienId }, // Critère de recherche
            {
                $set: {
                    status: 'occupé'
                }
            },
            {
                upsert: true, // Crée le document s'il n'existe pas
                // new: true
            }
        );
        res.status(201).json(savedRepair);

    }
    catch (error) {
        res.status(500).json({ msg: 'Erreur serveur' });
    }
})
router.get('/myrepairs', auth, async (req, res) => {
    try {
        // Vérifier si le paramètre "all" est présent et égal à "true"
        const showAll = req.query.all === 'true';

        // Construire le filtre de base
        const filter = { clientId: req.userId };

        // Si showAll est false, ajouter la condition pour exclure "Terminé"
        if (!showAll) {
            filter.status = { $ne: 'Terminé' };
        }


        

    const repairs = await Repair.find(filter).populate('vehicleId')
                                             .populate('mecanicienId');
    res.json(repairs);
  } catch (error) {
    console.error('Erreur lors de la récupération des réparations:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }

});
//history
router.get('/history', auth, async (req, res) => {
    try {
      // Construire le filtre de base
      const filter = { clientId: req.userId };
  
      // Si showAll est false, ajouter la condition pour exclure "Terminé"
        filter.status = 'Terminé' ;
      
  
      const repairs = await Repair.find(filter).populate('vehicleId')
                                               .populate('mecanicienId');
      res.json(repairs);
    } catch (error) {
      console.error('Erreur lors de la récupération des réparations:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
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
router.get('/reparationMeca',auth, async (req, res) => {
    try {
        const repair = await Repair.find({ mecanicienId: req.userId })
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

