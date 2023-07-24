const mongoose = require('mongoose');
const { Schema } = mongoose;

const monthMasterSchema = new Schema({
  ID: {
    type: Number,
    required: true
  },
  MONTH_NAME: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('month_master', monthMasterSchema);
