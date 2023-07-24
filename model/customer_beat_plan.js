const mongoose = require('mongoose');

const Customer_Beat_Plan_Schema = new mongoose.Schema({
  BEAT_PLAN_ID:Number,
  CUSTOMER_ID:Number,
  STATUS:Number
});


module.exports = mongoose.model('customer_beat_plan', Customer_Beat_Plan_Schema);