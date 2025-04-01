const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/userModel');
// const validationResult= require('express-validator')
const jwt = require('jsonwebtoken')

//Créer un mécanicien
router.post('/register', async (req, res) => {
    try {
        const { nomComplet, email, mdp, role } = req.body;

        // Vérifier si l'email existe déjà
        let user = await User.findOne({ email: email, role: role });
        if (user) return res.status(400).json({ msg: 'Email déjà utilisé' });

        // Hacher le mot de passe avant de le sauvegarder
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(mdp, salt);

        // Créer le mécanicien avec le mot de passe hashé
        user = new User({
            nomComplet,
            email,
            mdp: hashedPassword,
            role // On enregistre le mot de passe chiffré
        });

        await user.save();
        res.status(201).json({ msg: 'Utilisateur créé avec succès' });

    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ msg: 'Cet email est déjà utilisé pour ce rôle' });
        } else {
            res.status(500).json({ msg: 'Erreur serveur', error });
        }
    }
});

router.post('/login', async (req, res) => {
    // console.log("Login route")
    try {
        const { email, mdp, role } = req.body;
        const user = await User.findOne({ email: email, role: role });
        if (!user) return res.status(400).json({ msg: 'Utilisateur non trouvé' });

        const isMatch = await bcrypt.compare(mdp, user.mdp);
        if (!isMatch) return res.status(400).json({ msg: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, nomComplet: user.nomComplet, email: user.email } });
        // console.log(token)
    } catch (error) {
        console.log("Erreur")
        res.status(500).json({ msg: 'Erreur serveur' });
    }
});

router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;

// Get user par rôle
router.get('/:role', async (req, res) => {
    try {
        let users = await User.find({ role: req.params.role })
        res.json(users)
    }
    catch (error) {
        res.status(500).json({ message: error.message });

    }
})
