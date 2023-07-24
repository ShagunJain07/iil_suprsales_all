const mongoose = require('mongoose');

const userMonthlyExpensesSchema = new mongoose.Schema({
  EMP_ID: {
    type: String
  },
  LEFT_MAX_ALLOWED_FUEL: {
    type: String
  },
  LEFT_MAX_MOBILE_INTERNET: {
    type: String
  },
  LEFT_MAX_MISC: {
    type: String
  },
  LEFT_MAX_ALLOWED_KM: {
    type: String
  }
});

module.exports  = mongoose.model('user_monthly_expense', userMonthlyExpensesSchema);

// module.exports = UserMonthlyExpenses;
