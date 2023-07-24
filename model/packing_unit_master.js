const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packingUnitMasterSchema = new Schema({
  UNIT_ID: { type: String },
  UNIT_TYPE: { type: String },
  UNIT_VALUE: { type: String },
  CATEGORY_ID: { type: String },
  FLAG: { type: String }
});

const PackingUnitMaster = mongoose.model('packing_unit_master', packingUnitMasterSchema);

module.exports = PackingUnitMaster;
