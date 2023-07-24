const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  DISTRICT_ID: { type: Number, required: true },
  DISTRICT_NAME: { type: String, required: true },
  STATE_ID: { type: String, required: true }
});

const District = mongoose.model('district_masters', districtSchema);

module.exports = District;
