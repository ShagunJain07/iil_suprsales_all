const mongoose = require('mongoose');

const Activity_owner_Schema = new mongoose.Schema({
      ACTIVITY_ID:Number,
      ACTIVITY_OWNER:String

});


module.exports = mongoose.model('activity_owner_master', Activity_owner_Schema);