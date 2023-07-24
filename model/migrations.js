const mongoose = require('mongoose');

const MigrationSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  migration: {
    type: String,
    required: true
  },
  batch: {
    type: Number,
    required: true
  }
});

const Migration = mongoose.model('migration', MigrationSchema);

module.exports = Migration;
