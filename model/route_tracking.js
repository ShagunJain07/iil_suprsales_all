const mongoose = require('mongoose');

const routeTrackingSchema = new mongoose.Schema({
  EMP_ID: {
    type: String,
    required: true,
  },
  DATE_TIME: {
    type: Date,
    required: true,
  },
  LATITUDE: {
    type: Number,
    required: true,
  },
  LONGITUDE: {
    type: Number,
    required: true,
  },
});

const RouteTracking = mongoose.model('route_tracking', routeTrackingSchema);

module.exports = RouteTracking;
