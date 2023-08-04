const mongoose = require('mongoose');

const materialGroupMasterSchema = new mongoose.Schema({
  GROUP_ID: {
    type: String
  },
  GROUP_NAME: {
    type: String
  },
  CATEGORY_ID: {
    type: String
  },
  FLAG: {
    type: Boolean
  }
});

const MaterialGroupMaster = mongoose.model('material_group_master', materialGroupMasterSchema);

module.exports = MaterialGroupMaster;
