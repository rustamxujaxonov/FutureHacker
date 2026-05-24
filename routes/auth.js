const router = require('express').Router();
const User = require('../models/User');
const telegramAuth = require('../middleware/telegramAuth');

// Telegram orqali kirish yoki ro'yxatdan o'tish
router.post('/login', telegramAuth, async (req, res) => {
  try {
    const tg = req.telegramUser;
    let user = await User.findOne({ telegramId: String(tg.id) });

    if (!user) {
      user = await User.create({
        telegramId: String(tg.id),
        username: tg.username || 'hacker',
        firstName: tg.first_name || '',
      });
    } else {
      user.lastSeen = new Date();
      await user.save();
    }

    res.json({ ok: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Foydalanuvchi profilini olish
router.get('/me', telegramAuth, async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: String(req.telegramUser.id) });
    if (!user) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
