const mongoose = require('mongoose');

const moduleMasterSchema = new mongoose.Schema({
  MODULE_ID: {
    type: Number,
    required: true
  },
  MODULE_NAME: {
    type: String,
    required: true
  },
  MODULE_DESCRIPTION: {
    type: String,
    required: true
  },
  MODULE_PATH: {
    type: String,
    required: true
  },
  FLAG: {
    type: Boolean,
    required: true,
    default: true
  },
  UPDATED_AT: {
    type: Date,
    default: null
  },
  CREATED_AT: {
    type: Date,
    default: null
  }
});

const ModuleMaster = mongoose.model('module_master', moduleMasterSchema);

module.exports = ModuleMaster;
