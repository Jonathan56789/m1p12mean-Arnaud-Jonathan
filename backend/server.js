const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connecté"))
    .catch(err => console.log(err));
// Routes
app.use('/mecanicien', require('./routes/mecanicienRoute'));
app.use('/api/client',require('./routes/clientRoutes'));
app.listen(PORT, () => console.log(`Serveur démarré sur le port${PORT}`));
