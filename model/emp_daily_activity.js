const mongoose = require('mongoose');

const empDailyActivitySchema = new mongoose.Schema({
  EMP_ID: { type: String, required: true },
  CUSTOMER_ID: { type: Number, required: true },
  DATE: { type: Date, default: Date.now },
  IMAGE1: { type: String, required: true },
  IMAGE2: { type: String, required: true },
  REMARKS: { type: String, required: true },
});

const EmpDailyActivity = mongoose.model('emp_daily_activity', empDailyActivitySchema);

module.exports = EmpDailyActivity;
