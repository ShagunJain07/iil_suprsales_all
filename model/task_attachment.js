const mongoose = require('mongoose');

const taskAttachmentSchema = new mongoose.Schema({
  TASK_ID: { type: Number},
  TASK_ATTACHMENT: { type: String},
});

const TaskAttachment = mongoose.model('task_attachment', taskAttachmentSchema);

module.exports = TaskAttachment;
