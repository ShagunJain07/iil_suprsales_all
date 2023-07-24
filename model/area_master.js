const mongoose = require('mongoose');

const Area_master_Schema = new mongoose.Schema({
   AREA_ID:Number,
   AREA_NAME:String,
   REGION_ID:String,
   FLAG:Number
});


module.exports = mongoose.model('area_master', Area_master_Schema);