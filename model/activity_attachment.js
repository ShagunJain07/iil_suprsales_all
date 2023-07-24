const mongoose = require('mongoose');

const Activity_attachment_Schema = new mongoose.Schema({
     ACTIVITY_ID:Number,
     ACTIVITY_ATTACHMENT:String 
});


module.exports = mongoose.model('activity_attachment', Activity_attachment_Schema);