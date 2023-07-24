const mongoose = require('mongoose');

const levelExpRatesSchema = new mongoose.Schema({
  LEVEL_RANK_ID: {
    type: String
  },
  DA_RATES_LOCAL: {
    type: Number
  },
  DA_RATES_OUTST: {
    type: Number
  },
  EXP_PER_KM_RATE: {
    type: Number
  },
  EXP_BUS_TRAIN: {
    type: Number
  },
  EXP_PLANE: {
    type: Number
  },
  EXP_TAXI_AUTO: {
    type: Number
  },
  EXP_VEH_REPAIR: {
    type: Number
  },
  EXP_HOTEL: {
    type: Number
  },
  EXP_STATIONARY: {
    type: Number
  },
  EXP_MOBILE_INTERNET: {
    type: Number
  },
  EXP_MISC: {
    type: Number
  },
  EXP_FUEL: {
    type: Number
  },
  MAX_ALLOWED_KM: {
    type: Number
  }
});

module.exports = mongoose.model('level_exp_rate', levelExpRatesSchema);
