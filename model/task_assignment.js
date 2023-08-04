const mongoose = require('mongoose');

const taskAssignmentSchema = new mongoose.Schema({
  TASK_ID: {
    type: Number
  },
  ASSIGNED_TO: {
    type: String
  },
  FLAG: {
    type: Boolean,
    default: true,
  },
});

const TaskAssignment = mongoose.model('task_assignment', taskAssignmentSchema);

module.exports = TaskAssignment;
