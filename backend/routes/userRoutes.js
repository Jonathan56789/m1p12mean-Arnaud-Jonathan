const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/userModel');
//const upload = multer({ storage });
const jwt = require('jsonwebtoken');
const multer = require('multer');
const auth = require('../middleware/authmiddleware');
// const validationResult= require('express-validator')
//const nodemailer = require('nodemailer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
//Créer un mécanicien
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Vérifier si l'email existe déjà
        let user = await User.findOne({ email: email, role: role });
        if (user) return res.status(400).json({ msg: 'Email déjà utilisé' });

        // Hacher le mot de passe avant de le sauvegarder
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Créer le mécanicien avec le mot de passe hashé
        newUser = new User({
            name,
            email,
            password: hashedPassword,
            role // On enregistre le mot de passe chiffré
        });

        await newUser.save();
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
        const { email, password, role } = req.body;
        const user = await User.findOne({ email: email, role: role });
        if (!user) return res.status(400).json({ msg: 'Utilisateur non trouvé' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Mot de passe incorrect' });

        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
        res.json({ token, user: { userId: user._id, name: user.name, email: user.email } });
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
router.get('/profile',auth, async (req, res) => {
    try {
      console.log("hjhj");
      // Trouver le client dans la base de données en utilisant le clientId du token
      let user = await User.findById(req.userId).select('-password'); // Exclut le mot de passe
      if (!user) {
        return res.status(404).json({ message: 'Client non trouvé' });
      }
  
      // Retourner les informations du client
      res.json({
        message: 'Profil récupéré avec succès',
       // user
        user: {
          userId: user._id,
          name: user.name,
          email: user.email,
          role:user.role
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
    }
  });


// Get user par rôle
router.get('/listuser/:role', async (req, res) => {
    try {
        let users = await User.find({ role: req.params.role }).select('-password');
        res.json(users)
    }
    catch (error) {
        res.status(500).json({ message: error.message });

    }
});
// Dans votre fichier de routes (ajoutez ceci après la route profile)
// Mettre à jour le profil utilisateur
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, email } = req.body;
        
        // Vérifier si le nouvel email est déjà utilisé par un autre utilisateur
        if (email) {
            const existingUser = await User.findOne({ 
                email: email, 
                _id: { $ne: req.userId } 
            });
            if (existingUser) {
                return res.status(400).json({ msg: 'Cet email est déjà utilisé' });
            }
        }

        // Préparer les champs à mettre à jour
        const updateFields = {};
        if (name) updateFields.name = name;
        if (email) updateFields.email = email;

        // Mettre à jour l'utilisateur
        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ msg: 'Utilisateur non trouvé' });
        }

        res.json({
            msg: 'Profil mis à jour avec succès',
            user: {
                userId: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role
            }
        });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            res.status(400).json({ msg: 'Cet email est déjà utilisé' });
        } else {
            res.status(500).json({ msg: 'Erreur lors de la mise à jour du profil' });
        }
    }
});
module.exports = router;
