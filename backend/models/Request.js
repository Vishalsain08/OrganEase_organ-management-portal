const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  organ: { type: mongoose.Schema.Types.ObjectId, ref: 'Organ' },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  patientName: String,
  patientBloodGroup: String,
  reason: String,
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
  requestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', requestSchema);
