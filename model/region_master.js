const mongoose = require('mongoose');
const { Schema } = mongoose;

const regionMasterSchema = new Schema({
  REGION_ID: {
    type: String,
    required: true
  },
  REGION_NAME: {
    type: String,
    required: true
  },
  ZONE_ID: {
    type: Number,
    required: true
  },
  REGION_CENTER_LAT: {
    type: Number,
    required: true
  },
  REGION_CENTER_LONG: {
    type: Number,
    required: true
  },
  FLAG: {
    type: Boolean,
    required: true,
    default: true
  }
});

const RegionMaster = mongoose.model('region_master', regionMasterSchema);

module.exports = RegionMaster;
