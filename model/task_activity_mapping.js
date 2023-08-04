const mongoose = require('mongoose');

const taskActivityMappingSchema = new mongoose.Schema({
  TASK_ID: {
    type: Number
  },
  ACTIVITY_ID: {
    type: Number
  }
});

const TaskActivityMapping = mongoose.model('task_activity_mapping', taskActivityMappingSchema);

module.exports = TaskActivityMapping;
