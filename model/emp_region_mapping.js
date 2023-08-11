const mongoose = require('mongoose');

const empRegionMappingSchema = new mongoose.Schema({
  ID: { type: Number },
  EMP_ID: { type: String },
  REGION_ID: { type: String },
});

const EmpRegionMapping = mongoose.model('emp_region_mapping ', empRegionMappingSchema);

module.exports = EmpRegionMapping;
