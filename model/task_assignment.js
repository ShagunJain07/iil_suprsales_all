const mongoose = require('mongoose');

const taskAssignmentSchema = new mongoose.Schema({
  task_id: {
    type: Number,
    required: true,
  },
  assigned_to: {
    type: String,
    required: true,
  },
  flag: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const TaskAssignment = mongoose.model('task_assignment', taskAssignmentSchema);

module.exports = TaskAssignment;
