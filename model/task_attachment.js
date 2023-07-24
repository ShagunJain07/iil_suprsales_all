const mongoose = require('mongoose');

const taskAttachmentSchema = new mongoose.Schema({
  TASK_ID: { type: Number, required: true },
  TASK_ATTACHMENT: { type: String, required: true },
});

const TaskAttachment = mongoose.model('task_attachment', taskAttachmentSchema);

module.exports = TaskAttachment;
