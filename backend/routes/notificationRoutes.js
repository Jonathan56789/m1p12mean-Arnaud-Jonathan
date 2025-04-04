const express = require('express');
const router = express.Router();
const Notification = require('../models/notificationModel');
const auth = require('../middleware/authmiddleware');
// Notifications
router.get('/', auth, async (req, res) => {
  const notifications = await Notification.find({ receiverId: req.userId }).sort({ date: -1 });
  res.json(notifications);
});
module.exports = router;