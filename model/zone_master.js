const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
  ZONE_ID: { type: Number, required: true },
  ZONE_NAME: { type: String, required: true },
  FLAG: { type: Boolean, required: true }
});

const Zone = mongoose.model('zone_master', zoneSchema);

module.exports = Zone;
