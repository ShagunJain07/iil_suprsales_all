const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpLocationMasterSchema = new Schema({
  EMP_ID: { type: String, required: true },
  LOCATION_ID: { type: Number, required: true },
  LOC_LONG: { type: Number, required: true },
  LOC_LAT: { type: Number, required: true },
  LOC_TIME: { type: Date, default: Date.now }
});

const EmpLocationMaster = mongoose.model('emp_location_master ', EmpLocationMasterSchema);

module.exports = EmpLocationMaster;
