const mongoose = require('mongoose');

const Activity_attachment_Schema = new mongoose.Schema({
      ACTIVITY_ID:Number,
      DELIGATED_TO:String,
      DELIGATION_FROM:String,
      DELIGATION_LEVEL:Number,
      DELIGATION_DATE:Date

});


module.exports = mongoose.model('activity_deligation_master', Activity_attachment_Schema);