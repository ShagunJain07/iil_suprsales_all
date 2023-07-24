const mongoose = require('mongoose');

const territorySchema = new mongoose.Schema({
  TERRITORY_ID: {
    type: Number,
    required: true
  },
  TERRITORY_NAME: {
    type: String,
    required: true
  },
  AREA_ID: {
    type: Number,
    required: true
  },
  FLAG: {
    type: Boolean,
    required: true,
    default: true
  }
});

const Territory = mongoose.model('territory_master', territorySchema);

module.exports = Territory;
