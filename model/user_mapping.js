const mongoose = require('mongoose');

const userMappingSchema = new mongoose.Schema({
  EMP_ID: {
    type: String
  },
  ROLE_ID: {
    type: Number
  },
  FLAG: {
    type: Number,
    default: 1
  }
});

const UserMapping = mongoose.model('usermapping', userMappingSchema);

module.exports = UserMapping;
