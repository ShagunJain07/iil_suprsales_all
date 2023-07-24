const mongoose = require('mongoose');

const Component_processor_Schema = new mongoose.Schema({
  COMPONENT_ID:Number,
 PROCESSOR_ID:String
});


module.exports = mongoose.model('component_processor', Component_processor_Schema);