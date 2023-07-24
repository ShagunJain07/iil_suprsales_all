const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farmerSchema = new Schema({
  FARMER_ID: { type: Number },
  FARMER_NAME: { type: String },
  FARMER_FATHER_NAME: { type: String },
  FARMER_DOB: { type: Date },
  FARMER_MOB: { type: String },
  FARMER_VILLAGE: { type: String },
  FARMER_TEHSIL: { type: String },
  FARMER_DISTRICT: { type: String },
  FARMER_PINCODE: { type: Number },
  FARMER_STATE: { type: String },
  MAJOR_CROP_1: { type: String },
  MAJOR_CROP_2: { type: String },
  MAJOR_CROP_3: { type: String },
  LAND_HOLDING: { type: String },
  FARMER_AADHAR_ID: { type: String },
  FARMER_BANK_ACC_NO: { type: String },
  REGION_ID: { type: String },
  UPDATED_BY: { type: String },
  UPDATED_ON: { type: Date, default: Date.now },
  AREA_ID: { type: Number },
  FLAG: { type: Boolean },
});

const Farmer = mongoose.model('farmer_master', farmerSchema);

module.exports = Farmer;
