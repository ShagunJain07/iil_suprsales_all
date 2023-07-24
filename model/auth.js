const mongoose = require('mongoose');
var conn2     = mongoose.createConnection('mongodb://0.0.0.0/suprsales_saas');


var Authorization_master_Schema= conn2.model('authorization_master', new mongoose.Schema({
      AUTH_ID:Number,
      AUTH_NAME:String,
      DESCRIPTION:String,
      SCREEN_ID:Number,
      MODULE_ID:Number,
      FLAG:Number
    }));



module.exports =  Authorization_master_Schema