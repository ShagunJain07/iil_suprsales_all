const mongoose = require('mongoose');
const { Schema } = mongoose;

const regionMasterSchema = new Schema({
  REGION_ID: {
    type: String
  },
  REGION_NAME: {
    type: String
  },
  ZONE_ID: {
    type: Number
  },
  REGION_CENTER_LAT: {
    type: Number
  },
  REGION_CENTER_LONG: {
    type: Number
  },
  FLAG: {
    type: Boolean,
    default: true
  }
});

const RegionMaster = mongoose.model('region_master', regionMasterSchema);

module.exports = RegionMaster;
