const mongoose = require('mongoose');

const RetailerMasterSchema = new mongoose.Schema({
  RETAILER_ID: { type: Number},
  RETAILER_NAME: { type: String},
  RETAILER_DOB: { type: Date},
  RETAILER_MOB: { type: String},
  RETAILER_PAN: { type: String},
  RETAILER_DISTRICT: { type: String},
  RETAILER_STATE: { type: String},
  RETAILER_PINCODE: { type: Number},
  RETAILER_ADDRESS1: { type: String},
  RETAILER_ADDRESS2: { type: String},
  RETAILER_ADDRESS3: { type: String},
  RETAILER_GSTIN: { type: String},
  RETAILER_AADHAR_ID: { type: String},
  RETAILER_BANK_ACC_NO: { type: String},
  REGION_ID: { type: String},
  UPDATED_BY: { type: String},
  UPDATED_ON: { type: Date, default: Date.now },
  RETAILER_LONG: { type: Number},
  RETAILER_LAT: { type: Number},
  AREA_ID: { type: Number},
  FLAG: { type: Boolean, default: true },
});

const RetailerMaster = mongoose.model('retailer_masters', RetailerMasterSchema);

module.exports = RetailerMaster;
