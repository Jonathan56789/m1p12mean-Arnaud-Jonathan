const express = require('express');
const router = express.Router();
const Mecanicien = require('../model/mecanicienModel');

//Créer un mécanicien
router.post('/register', async (req, res) => {
    try {
        const { nomComplet, email, mdp } = req.body;

        // Vérifier si l'email existe déjà
        let meca = await Mecanicien.findOne({ email });
        if (meca) return res.status(400).json({ msg: 'Email déjà utilisé' });

        // Hacher le mot de passe avant de le sauvegarder
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(mdp, salt);

        // Créer le mécanicien avec le mot de passe hashé
        meca = new Mecanicien({
            nomComplet,
            email,
            mdp: hashedPassword // On enregistre le mot de passe chiffré
        });

        await meca.save();
        res.status(201).json({ msg: 'Mécanicien créé avec succès' });

    } catch (error) {
        res.status(500).json({ msg: 'Erreur serveur' });
    }
});


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
router.delete('/:id', async (req, res) => {
    try {
        await Mecanicien.findByIdAndDelete(req.params.id)
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})



// Get 1 mécanicien par email
router.get('/:param', async (req, res) => {
    try {
        if (req.params.param.includes('@')) {
            const meca = await Mecanicien.findOne({ email: req.params.param });
            if (!meca) {
                return res.status(404).json({ message: 'Mécanicien non trouvé' });
            }
            res.status(200).json(meca);
        }
        else {
            const meca = await Mecanicien.findById(req.params.param)
            if (!meca) {
                return res.status(404).json({ message: 'Mécanicien non trouvé' });
            }
            res.status(200).json(meca);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})
// router.post('/register', async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//     try {
//         const { email, mdp } = req.body;
//         const meca = await Mecanicien.findOne({ email });
//         if (!meca) return res.status(400).json({ msg: 'Mécanicien non trouvé' });

//         const isMatch = await bcrypt.compare(mdp, meca.mdp);
//         if (!isMatch) return res.status(400).json({ msg: 'Mot de passe incorrect' });


//         const token = jwt.sign({ id: meca._id }, 'SECRET_KEY', { expiresIn: '1h' });
//         res.json({ token, meca: { id: meca._id, nomComplet: meca.nomComplet, email: meca.email } });
//     } catch (error) {
//         res.status(500).json({ msg: 'Erreur serveur' });
//     }
// });


module.exports = router;