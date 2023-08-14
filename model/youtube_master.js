const mongoose = require('mongoose');

const youtubeSchema = new mongoose.Schema({
  YOUTUBE_ID: {
    type: String
  },
  DATE: {
    type: Date
  },
  YOUTUBE_LINK: {
    type: String
  },
  HEADER: {
    type: String
  },
  STATUS: {
    type: Boolean
  }
});

const YoutubeMaster = mongoose.model('youtube_master', youtubeSchema);

module.exports = YoutubeMaster;
