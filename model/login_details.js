const mongoose = require('mongoose');

const LoginDetailsSchema = new mongoose.Schema({
  LOGIN_TRAN_ID: { type: Number, required: true },
  LOGIN_TIME: { type: Date, required: true },
  APP_VERSION: { type: String, required: true },
  EMP_ID: { type: String, required: true },
  LOGIN_LONG: { type: Number, default: null },
  LOGIN_LAT: { type: Number, default: null },
  DEVICE_TYPE: { type: String, default: null },
  DEVICE_MODEL: { type: String, required: true },
  MAKE: { type: String, required: true },
  FORCE_LOGOUT_STATUS: { type: Boolean, default: false },
  LOGOUT_TIME: { type: Date, required: true },
  LOGOUT_LONG: { type: Number, default: null },
  LOGOUT_LAT: { type: Number, default: null },
});

const LoginDetails = mongoose.model('login_details', LoginDetailsSchema);

module.exports = LoginDetails;
