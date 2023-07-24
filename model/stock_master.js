const mongoose = require('mongoose');

const stockMasterSchema = new mongoose.Schema({
  SKU_ID: { type: String, required: true },
  PLANT_ID: { type: String, required: true },
  QUANTITY: { type: Number, required: true },
  UNIT_ID: { type: Number, required: true },
  FLAG: { type: Boolean, required: true },
});

module.exports = mongoose.model('stock_master', stockMasterSchema);
