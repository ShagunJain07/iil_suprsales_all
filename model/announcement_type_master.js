const mongoose = require('mongoose');

const Announcement__Type_master_Schema = new mongoose.Schema({
     
      ANNOUNCEMENT_ID:Number,
      ANNOUNCEMENT_TYPE:String,
      FLAG:Number
});


module.exports = mongoose.model('announcement_type_master', Announcement__Type_master_Schema);