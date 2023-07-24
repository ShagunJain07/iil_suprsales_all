const mongoose = require('mongoose');

const empRegionMappingSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  empId: { type: String, required: true },
  regionId: { type: String, required: true },
});

const EmpRegionMapping = mongoose.model('emp_region_mapping ', empRegionMappingSchema);

module.exports = EmpRegionMapping;
