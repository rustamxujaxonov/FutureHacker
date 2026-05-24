const router = require('express').Router();
const User = require('../models/User');
const telegramAuth = require('../middleware/telegramAuth');

// Profil ma'lumotlari
router.get('/profile', telegramAuth, async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: String(req.telegramUser.id) });
    if (!user) return res.status(404).json({ error: 'Topilmadi' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
