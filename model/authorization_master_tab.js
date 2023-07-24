const mongoose = require('mongoose');

const Authorization_master_Schema = new mongoose.Schema({
   AUTH_ID:String,
   AUTH_NAME:String,
   DESCRIPTION:String,
   SCREEN_ID:Number,
   SCREEN_LINK:String,
   MODULE_ID:Number,
   FLAG:Number
});


module.exports = mongoose.model('authorization_masters', Authorization_master_Schema);