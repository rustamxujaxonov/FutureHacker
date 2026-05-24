const router = require('express').Router();
const User = require('../models/User');
const telegramAuth = require('../middleware/telegramAuth');

// Top 20 foydalanuvchilar
router.get('/', telegramAuth, async (req, res) => {
  try {
    const top = await User.find()
      .sort({ coins: -1 })
      .limit(20)
      .select('username firstName coins completedStages currentStage');
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Foydalanuvchining o'z reytingi
router.get('/rank', telegramAuth, async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: String(req.telegramUser.id) });
    if (!user) return res.status(404).json({ error: 'Topilmadi' });
    const rank = await User.countDocuments({ coins: { $gt: user.coins } });
    res.json({ rank: rank + 1, coins: user.coins });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
