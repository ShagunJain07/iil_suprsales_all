const mongoose = require('mongoose');

const youtubeSchema = new mongoose.Schema({
  youtube_id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  youtube_link: {
    type: String,
    required: true
  },
  header: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
});

const YoutubeMaster = mongoose.model('youtube_master', youtubeSchema);

module.exports = YoutubeMaster;
