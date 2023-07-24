const mongoose = require('mongoose');

const submissionCycleSchema = new mongoose.Schema({
  CYCLE_ID: {
    type: Number,
    required: true
  },
  SUBMISSION_CYCLE: {
    type: String,
    required: true
  },
  MONTH: {
    type: Number,
    required: true
  },
  YEAR: {
    type: Number,
    required: true
  }
});

const SubmissionCycle = mongoose.model('submission_cycle', submissionCycleSchema);

module.exports = SubmissionCycle;
