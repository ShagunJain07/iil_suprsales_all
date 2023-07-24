const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  STATE_ID: {
    type: Number,
    required: true,
  },
  STATE_NAME: {
    type: String,
    required: true,
  },
});

const State = mongoose.model('state_master', stateSchema);

module.exports = State;
