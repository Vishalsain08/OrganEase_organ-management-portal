const mongoose = require('mongoose');

const organSchema = new mongoose.Schema({
  organType: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  donorAge: Number,
  center: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isReserved: { type: Boolean, default: false },
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Organ', organSchema);
