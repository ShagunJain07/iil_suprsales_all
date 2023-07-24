const mongoose = require('mongoose');
const { Schema } = mongoose;

const regionYoutubeMappingSchema = new Schema({
  REGION_ID: { type: String, required: true },
  YOUTUBE_ID: { type: String, required: true },
});

const RegionYoutubeMapping = mongoose.model('region_youtube_mapping', regionYoutubeMappingSchema);

module.exports = RegionYoutubeMapping;
