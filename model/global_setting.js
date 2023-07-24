const mongoose = require('mongoose');

const globalSettingSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  maxClaimDaysLimit: {
    type: Number
  },
  companyLogo: {
    type: String
  },
  companyName: {
    type: String
  }
});

const GlobalSetting = mongoose.model('global_setting', globalSettingSchema);

module.exports = GlobalSetting;
