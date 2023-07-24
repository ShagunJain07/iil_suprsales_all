const mongoose = require('mongoose');

const globalOrderSettingSchema = new mongoose.Schema({
  REGION_ID: { type: String, required: true },
  MAX_ACK_DAY_LIMIT: { type: Number, required: true },
});

const GlobalOrderSetting = mongoose.model('global_order_setting', globalOrderSettingSchema);

module.exports = GlobalOrderSetting;
