const mongoose = require('mongoose');

const StageSchema = new mongoose.Schema({
  id:          { type: Number, required: true, unique: true },
  title:       { type: String, required: true },
  description: { type: String },
  coins:       { type: Number, default: 100 },
  prompt:      { type: String, default: 'fh@kali:~$' },
  advisorText: { type: String },
  commands:    [{
    input:    String,
    output:   String,
    progress: Number,
    isWin:    { type: Boolean, default: false }
  }],
  errorHint:   { type: String },
  isActive:    { type: Boolean, default: true },
  order:       { type: Number, default: 0 },
});

module.exports = mongoose.model('Stage', StageSchema);
