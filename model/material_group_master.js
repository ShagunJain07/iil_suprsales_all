const mongoose = require('mongoose');

const materialGroupMasterSchema = new mongoose.Schema({
  GROUP_ID: {
    type: String,
    required: true
  },
  GROUP_NAME: {
    type: String,
    required: true
  },
  CATEGORY_ID: {
    type: String,
    required: true
  },
  FLAG: {
    type: Boolean,
    required: true
  }
});

const MaterialGroupMaster = mongoose.model('material_group_master', materialGroupMasterSchema);

module.exports = MaterialGroupMaster;
