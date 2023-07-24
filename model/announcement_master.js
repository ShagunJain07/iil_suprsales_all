const mongoose = require('mongoose');

const Announcement_master_Schema = new mongoose.Schema({
      ANNOUNCE_ID:Number,
      ANNOUNCEMENT_ID:Number,
      TITLE:String,
      CREATED_BY:String,
      VALID_FROM:Date,
      VALID_TILL:Date,
      IMAGE:String,
      DESCRIPTION:String,
      REGION_ID:String,
      FLAG:Number,
      updated_at:Date,
      created_at:Date,
      IDENTITY_FLAG:Number,
      PDF:String

});


module.exports = mongoose.model('announcement_master', Announcement_master_Schema);