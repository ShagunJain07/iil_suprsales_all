const mongoose = require('mongoose');

const Beat_Paln_master_Schema = new mongoose.Schema({
   BEAT_PLAN_ID:Number,
   CREATED_BY:String,
   CREATED_FOR:String,
   BEAT_PLAN_DATE:Date,
   REMARKS:String,
   FLAG:Number
});


module.exports = mongoose.model('beat_plan_master_tab', Beat_Paln_master_Schema);