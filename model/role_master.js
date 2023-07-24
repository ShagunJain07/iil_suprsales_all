const mongoose = require('mongoose');

const roleMasterSchema = new mongoose.Schema({
  ROLE_ID: {
    type: Number,
   
  },
  ROLE_NAME: {
    type: String,
   
  },
  ROLE_DESCRIPTION: {
    type: String,
   
  },
  AUTH_ID: {
    type: String,
   
  },
  FLAG: {
    type: Boolean,
   
    default: true,
  },
});

const RoleMaster = mongoose.model('role_master', roleMasterSchema);

module.exports = RoleMaster;
