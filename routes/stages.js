const router = require('express').Router();
const Stage = require('../models/Stage');
const User = require('../models/User');
const telegramAuth = require('../middleware/telegramAuth');

// Barcha faol bosqichlarni olish
router.get('/', telegramAuth, async (req, res) => {
  try {
    const stages = await Stage.find({ isActive: true }).sort({ order: 1 });
    res.json(stages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bosqichni yakunlash va coin qo'shish
router.post('/:id/complete', telegramAuth, async (req, res) => {
  try {
    const stageId = parseInt(req.params.id);
    const stage = await Stage.findOne({ id: stageId });
    if (!stage) return res.status(404).json({ error: 'Bosqich topilmadi' });

    const user = await User.findOne({ telegramId: String(req.telegramUser.id) });
    if (!user) return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });

    // Allaqachon bajarilganmi?
    if (user.completedStages.includes(stageId)) {
      return res.json({ ok: true, alreadyDone: true, user });
    }

    user.completedStages.push(stageId);
    user.coins += stage.coins;
    user.currentStage = Math.max(user.currentStage, stageId);
    await user.save();

    res.json({ ok: true, coinsEarned: stage.coins, totalCoins: user.coins, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
