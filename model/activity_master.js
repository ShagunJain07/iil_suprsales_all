const mongoose = require('mongoose');

const Activity_master_Schema = new mongoose.Schema({
      ACTIVITY_ID:Number,
      ACTIVITY_HEADER:String,
      ACTIVITY_DESCRIPTION:String,
      START_DATE:Date,
      DUE_DATE:Date,
      COMPLETION_STATUS:Number,
      DELIGATION_STATUS:Number,
      ACTIVITY_ATTACHMENT:String,
      FLAG:Number

});


module.exports = mongoose.model('activity_master', Activity_master_Schema);