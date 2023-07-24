const mongoose = require('mongoose');

const taskActivityMappingSchema = new mongoose.Schema({
  task_id: {
    type: Number,
    required: true
  },
  activity_id: {
    type: Number,
    required: true
  }
});

const TaskActivityMapping = mongoose.model('task_activity_mapping', taskActivityMappingSchema);

module.exports = TaskActivityMapping;
