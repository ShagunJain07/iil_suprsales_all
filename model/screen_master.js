const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
  SCREEN_ID: {
    type: Number,
    required: true,
  },
  SCREEN_NAME: {
    type: String,
    required: true,
  },
  SCREEN_DESCRIPTION: {
    type: String,
    required: true,
  },
  SCREEN_LINK: {
    type: String,
    required: true,
  },
  FLAG: {
    type: Boolean,
    required: true,
    default: true,
  },
  UPDATED_AT: {
    type: Date,
    required: true,
    default: Date.now,
  },
  CREATED_AT: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Screen = mongoose.model('screen_master', screenSchema);

module.exports = Screen;
