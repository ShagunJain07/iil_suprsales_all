const mongoose = require('mongoose');

const distributorBeatPlanTabSchema = new mongoose.Schema({
  BEAT_PLAN_ID: {
    type: Number,
    required: true
  },
  DISTRIBUTOR_ID: {
    type: Number,
    required: true
  },
  FLAG: {
    type: Boolean,
    required: true
  }
});

const DistributorBeatPlanTab = mongoose.model('distributor_beat_plan_tab', distributorBeatPlanTabSchema);

module.exports = DistributorBeatPlanTab;
