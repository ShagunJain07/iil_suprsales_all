const mongoose = require('mongoose');

const Category_master_Schema = new mongoose.Schema({
   CATEGORY_ID:String,
   CATEGORY_NAME:String,
   FLAG:Number
});


module.exports = mongoose.model('category_master', Category_master_Schema);