const mongoose = require('mongoose');

const taskMasterSchema = new mongoose.Schema({
  TASK_ID: { type: Number },
  TASK_NAME: { type: String },
  START_DATE: { type: Date },
  COMPLETION_STATUS: { type: Number },
  CREATED_ON: { type: Date },
  CREATED_BY: { type: String },
  DUE_DATE: { type: Date },
  PRIORITY: { type: Number },
  NOTES: { type: String },
  UPDATED_ON: { type: Date, default: Date.now },
  COLOR: { type: Number },
  FLAG: { type: Boolean }
});

const TaskMaster = mongoose.model('task_master', taskMasterSchema);

module.exports = TaskMaster;
