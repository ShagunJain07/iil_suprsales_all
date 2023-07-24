const mongoose = require('mongoose');

const failedJobsSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.BigInt, required: true },
  uuid: { type: String, required: true },
  connection: { type: String, required: true },
  queue: { type: String, required: true },
  payload: { type: String, required: true },
  exception: { type: String, required: true },
  failed_at: { type: Date, default: Date.now }
});

const FailedJob = mongoose.model('failed_job', failedJobsSchema);

module.exports = FailedJob;
