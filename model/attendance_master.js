const mongoose = require('mongoose');

const Attendance_master_Schema = new mongoose.Schema({
   EMP_ID:String,
   DATE:Date,
   LOG_IN_TIME:Date,
   LOG_OUT_TIME:Date,
   STATUS:Number
});


module.exports = mongoose.model('attendance_master', Attendance_master_Schema);