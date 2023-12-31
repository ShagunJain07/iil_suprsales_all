const mongoose = require('mongoose');
const distributorSchema = new mongoose.Schema({
  DISTRIBUTOR_ID: { type: String },
  DISTRIBUTOR_NAME: { type: String },
  DISTRIBUTOR_EMAIL_ID: { type: String },
  DISTRIBUTOR_MOB_NO: { type: String },
  DISTRIBUTOR_DISTRICT: { type: String },
  DISTRIBUTOR_STATE: { type: String },
  DISTRIBUTOR_PINCODE: { type: String },
  VERIFICATION_DOC: { type: String },
  VERIFICATION_STATUS: { type: Number },
  LICENCE_NO: { type: String },
  DISTRIBUTOR_ADDRESS1: { type: String },
  DISTRIBUTOR_ADDRESS2: { type: String },
  DISTRIBUTOR_ADDRESS3: { type: String },
  DISTRIBUTOR_GSTIN: { type: String },
  DISTRIBUTOR_PAN: { type: String },
  DISTRIBUTOR_AADHAR_ID: { type: String },
  DISTRIBUTOR_BANK_ACC_NO: { type: String },
  REGION_ID: { type: String },
  PRICE_GROUP: { type: String },
  UPDATED_BY: { type: String },
  UPDATED_ON: { type: Date, default: Date.now },
  DISTRIBUTOR_LONG: { type: Number },
  DISTRIBUTOR_LAT: { type: Number },
  IMAGE: { type: String },
  PASSWORD: { type: String },
  FLAG: { type: String },
});

module.exports = mongoose.model('distributor_masters', distributorSchema);
