const mongoose = require('mongoose');

const levelMasterSchema = new mongoose.Schema({
  LEVEL_RANK_ID: {
    type: String
  },
  LEVEL_NAME: {
    type: String
  },
  LEVEL_DESC: {
    type: String
  }
});

const LevelMaster = mongoose.model('level_master', levelMasterSchema);

module.exports = LevelMaster;
