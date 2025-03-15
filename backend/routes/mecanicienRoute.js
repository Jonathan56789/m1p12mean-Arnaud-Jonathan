const express = require('express');
const router = express.Router();
const Mecanicien = require('../model/mecanicienModel');

//Créer un mécanicien
router.post('/', async (req, res) => {
    try {
        const newMeca = new Mecanicien(req.body)
        await newMeca.save();
        res.status(201).json(newMeca)
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//Lire tous les mécaniciens

router.get('/', async (req, res) => {
    try {
        const meca = await Mecanicien.find()
        res.json(meca)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Modifier un mécanicien
router.put('/:id', async (req, res) => {
    try {
        const meca = await Mecanicien.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(meca)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Supprimer un mécanicien
router.delete('/:id', async(req, res)=>{
    try{
        await Mecanicien.findByIdAndDelete(req.params.id)
    }
    catch (error){
        res.status(400).json({
            message: error.message
        })
    }
})

// Get 1 mécanicien
router.get('/:id', async(req,res)=>{
    try{
        const meca= await Mecanicien.findById(req.params.id)
        res.json(meca)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports=router;