const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Client = require('../models/clientModel');
const Vehicle = require('../models/vehicleModel');
const Appointment = require('../models/appointmentModel');
const Repair = require('../models/repairModel');
const Quote = require('../models/quoteModel');
const History=require('../models/historyRepairModel');
const Notification = require('../models/notificationModel');
const multer = require('multer');

//const nodemailer = require('nodemailer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Middleware pour vérifier le token JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Non autorisé' });
  try {
    const decoded = jwt.verify(token, 'secret_key'); // Remplacez par une clé secrète sécurisée
    req.clientId = decoded.clientId;
    console.log("clientId:", req.clientId);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
};
// Inscription d'un client
router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Vérifier si l'email existe déjà
      const existingClient = await Client.findOne({ email });
      if (existingClient) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }
  
      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Créer un nouveau client
      const newClient = new Client({
        name,
        email,
        password: hashedPassword
      });
  
      // Sauvegarder dans la base de données
      await newClient.save();
  
      res.status(201).json({ message: 'Inscription réussie', client: newClient });
  
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  });
  
// Connexion sécurisée
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const client = await Client.findOne({ email });
  if (!client || !(await bcrypt.compare(password, client.password))) {
    return res.status(401).json({ message: ' Tsy Identifiants invalides' });
  }
  const token = jwt.sign({ clientId: client._id }, 'secret_key', { expiresIn: '1h' });
  res.json({ token, message: 'Connexion réussie' });
});

// État des véhicules
// router.get('/repairs', auth, async (req, res) => {
//   const vehicles = await Repair.find({ clientId: req.clientId });
//   res.json(vehicles);
// });
router.get('/repairs', auth, async (req, res) => {
  try {
    // Vérifier si le paramètre "all" est présent et égal à "true"
    const showAll = req.query.all === 'true';

    // Construire le filtre de base
    const filter = { clientId: req.clientId };

    // Si showAll est false, ajouter la condition pour exclure "Terminé"
    if (!showAll) {
      filter.status = { $ne: 'Terminé' };
    }

    const repairs = await Repair.find(filter).populate('vehicleId', 'licensePlate');
    res.json(repairs);
  } catch (error) {
    console.error('Erreur lors de la récupération des réparations:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
// Prendre un rendez-vous
router.post('/appointment', auth, async (req, res) => {
  const { vehicleId, date, serviceType } = req.body;
  const appointment = new Appointment({ clientId: req.clientId, vehicleId, date, serviceType });
  await appointment.save();
  
  // Notification
  await new Notification({ clientId: req.clientId, message: 'Rendez-vous enregistré' }).save();
  res.json({ message: 'Rendez-vous pris', appointment });
});

// Historique des interventions
router.get('/historyrepairs', auth, async (req, res) => {
  const repairs = await Repair.find({ vehicleId: { $in: await Vehicle.find({ clientId: req.clientId }).select('_id') } });
  res.json(repairs);
});

// Demande de devis
router.post('/quote', auth, async (req, res) => {
  const { description, attachments } = req.body;
  const quote = new Quote({ clientId: req.clientId, description, attachments });
  await quote.save();
  res.json({ message: 'Demande de devis soumise', quote });
});

// Notifications
router.get('/notifications', auth, async (req, res) => {
  const notifications = await Notification.find({ clientId: req.clientId }).sort({ date: -1 });
  res.json(notifications);
});
// Nouvelle route pour récupérer les devis
router.get('/quotes', auth, async (req, res) => {
  const quotes = await Quote.find({ clientId: req.clientId }).sort({ date: -1 });
  res.json(quotes);
});

// Route mise à jour pour gérer les fichiers
router.post('/quote', auth, upload.array('attachments', 5), async (req, res) => {
  const { description } = req.body;
  const attachments = req.files.map(file => file.path);

  const quote = new Quote({
    clientId: req.clientId,
    description,
    attachments,
  });
  await quote.save();

  // Notification
  await new Notification({
    clientId: req.clientId,
    message: 'Demande de devis enregistrée',
  }).save();

  res.json({ message: 'Demande de devis soumise', quote });
});
router.get('/appointment', auth, async (req, res) => {
  try {
    // Récupérer tous les rendez-vous du client authentifié
    const appointments = await Appointment
      .find({ clientId: req.clientId })
      .populate('vehicleId', 'make model year') // Optionnel : populate les infos du véhicule
      .sort({ date: -1 }); // Tri par date décroissante

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: 'Aucun rendez-vous trouvé' });
    }

    res.json({
      message: 'Rendez-vous récupérés avec succès',
      appointments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous' });
  }
});
// Nouvelle route : Récupérer le profil du client authentifié
router.get('/profile', auth, async (req, res) => {
  try {
    // Trouver le client dans la base de données en utilisant le clientId du token
    const client = await Client.findById(req.clientId).select('-password'); // Exclut le mot de passe
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    // Retourner les informations du client
    res.json({
      message: 'Profil récupéré avec succès',
      client: {
        id: client._id,
        name: client.name,
        email: client.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  }
});
//liste mon vehicule
router.get('/vehicles', auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ clientId: req.clientId });
    res.json({ vehicles });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des véhicules' });
  }
});
//créer un vehicule
router.post('/vehicles', auth, async (req, res) => {
  try {
    const { userId, nameVehicle, marqueVehicle, licensePlate } = req.body;
    const vehicle = new Vehicle({
      userId: req.userId,
      nameVehicle,
      marqueVehicle,
      licensePlate
    });
    await vehicle.save();
    res.status(201).json({ vehicle, message: 'Véhicule créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du véhicule' });
  }
});
// Route DELETE pour supprimer un véhicule
router.delete('/vehicles/:id', auth, async (req, res) => {
  try {
    const vehicleId = req.params.id;
    // Vérifier que le véhicule existe et appartient au client connecté
    const vehicle = await Vehicle.findOneAndDelete({
      _id: vehicleId,
      clientId: req.clientId, // S’assure que le véhicule appartient au client
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Véhicule non trouvé ou vous n’êtes pas autorisé à le supprimer' });
    }

    res.status(200).json({ message: 'Véhicule supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du véhicule', error: error.message });
  }
});
router.post('/repairs', auth, async (req, res) => {
  try {
    const { vehicleId, details, estimatedCompletion, technician, progression } = req.body;

    // Vérification des données requises
    if (!vehicleId || !details) {
      return res.status(400).json({ message: "Le véhicule et les détails de la réparation sont obligatoires." });
    }

    // Création de la réparation
    const newRepair = new Repair({
      clientId: req.clientId, // Ajout automatique du clientId depuis l'authentification
      vehicleId,
      status: "En attente", // Par défaut, une réparation commence avec ce statut
      details,
      estimatedCompletion,
      technician,
      progression: progression ?? 0 // Par défaut, progression = 0
    });

    // Sauvegarde en base de données
    const savedRepair = await newRepair.save();

    // Réponse avec la réparation créée
    res.status(201).json(savedRepair);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de la réparation." });
  }
});

module.exports = router;