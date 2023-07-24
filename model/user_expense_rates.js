const mongoose = require('mongoose');

const userExpenseRatesSchema = new mongoose.Schema({
  EMPLOYEE_ID: {
    type: String
  },
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
  EXP_MISC: {
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
  CHANGED_STATUS: {
    type: Number
  },
  EXP_FUEL: {
    type: Number
  },
  MAX_ALLOWED_KM: {
    type: Number
  }
}, {
  collection: 'user_expense_rates'
});

module.exports = mongoose.model('user_expense_rates', userExpenseRatesSchema);
