const mongoose = require('mongoose');

const priceMasterSchema = new mongoose.Schema({
  SKU_ID: { type: String},
  REGION_ID: { type: String},
  UPDATED_BY: { type: String},
  UPDATED_ON: { type: Date, default: Date.now },
  PRICE: { type: Number},
  PRICE_GROUP: { type: String},
  DISCOUNT: { type: Number},
  FLAG: { type: String}
});

const PriceMaster = mongoose.model('price_master', priceMasterSchema);

module.exports = PriceMaster;
