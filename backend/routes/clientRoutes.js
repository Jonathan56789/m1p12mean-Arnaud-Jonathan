const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Client = require('../models/clientModel');
const Vehicle = require('../models/vehicleModel');
const Appointment = require('../models/appointmentModel');
const Repair = require('../models/repairModel');
const Quote = require('../models/quoteModel');
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
router.get('/vehicles', auth, async (req, res) => {
  const vehicles = await Vehicle.find({ clientId: req.clientId });
  res.json(vehicles);
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
router.get('/repairs', auth, async (req, res) => {
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
module.exports = router;