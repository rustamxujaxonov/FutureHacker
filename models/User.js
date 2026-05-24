const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username:   { type: String, default: 'Noma\'lum' },
  firstName:  { type: String, default: '' },
  coins:      { type: Number, default: 0 },
  currentStage: { type: Number, default: 0 },
  completedStages: [{ type: Number }],
  joinedAt:   { type: Date, default: Date.now },
  lastSeen:   { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
