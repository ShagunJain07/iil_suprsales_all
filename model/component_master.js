const mongoose = require('mongoose');

const Component_master_Schema = new mongoose.Schema({
  COMPONENT_ID:Number,
  COMPONENT_NAME:String,
  COMPONENT_DESCRIPTION:String,
  COMPONENT_OWNER:String,
  FLAG:Number,
  IDENTITY_FLAG:Number
});


module.exports = mongoose.model('component_master', Component_master_Schema);