const mongoose = require('mongoose');

const taskMasterSchema = new mongoose.Schema({
  TASK_ID: { type: Number, required: true },
  TASK_NAME: { type: String, required: true },
  START_DATE: { type: Date, required: true },
  COMPLETION_STATUS: { type: Number, required: true },
  CREATED_ON: { type: Date, required: true },
  CREATED_BY: { type: String, required: true },
  DUE_DATE: { type: Date, required: true },
  PRIORITY: { type: Number, required: true },
  NOTES: { type: String, required: true },
  UPDATED_ON: { type: Date, default: Date.now },
  COLOR: { type: Number, required: true },
  FLAG: { type: Boolean, required: true }
});

const TaskMaster = mongoose.model('task_master', taskMasterSchema);

module.exports = TaskMaster;
