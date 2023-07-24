const mongoose = require('mongoose');
const { Schema } = mongoose;

const vehicleMasterSchema = new Schema({
  VEHICLE_ID: {
    type: Number,
    required: true,
    unique: true
  },
  EMP_ID: {
    type: String,
    required: true
  },
  VEHICLE_OWNERSHIP: {
    type: Number,
    required: true
  },
  VEHICLE_TYPE: {
    type: String,
    required: true
  },
  PER_KM_RATE: {
    type: Number,
    required: true
  },
  MAX_ALLOWED_FUEL: {
    type: Number,
    required: true
  },
  MAX_ALLOWED_KM: {
    type: Number,
    required: true
  },
  FLAG: {
    type: Boolean,
    required: true
  }
});

const VehicleMaster = mongoose.model('vehicle_master', vehicleMasterSchema);

module.exports = VehicleMaster;
