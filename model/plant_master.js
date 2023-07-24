const mongoose = require('mongoose');

const plantMasterSchema = new mongoose.Schema({
  PLANT_ID: { type: String },
  PLANT_DESCRIPTION: { type: String },
  PLANT_ADDRESS: { type: String },
  PLANT_LONGITUDE: { type: Number },
  PLANT_LATITUDE: { type: Number },
  REGION_ID: { type: String },
  PLANT_POC_ID: { type: String },
  FLAG: { type: String }
});

const PlantMaster = mongoose.model('plant_master', plantMasterSchema);

module.exports = PlantMaster;
