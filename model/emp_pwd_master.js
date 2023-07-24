const mongoose = require('mongoose');

const EmpPwdMasterSchema = new mongoose.Schema({
  EMP_ID: {
    type: String,
    required: true
  },
  CURRENT_PWD: {
    type: String,
    required: true
  },
  SECOND_LAST_PWD: {
    type: String,
    required: true
  },
  LAST_PWD: {
    type: String,
    required: true
  },
  UPDATED_ON: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const EmpPwdMaster = mongoose.model('emp_pwd_master ', EmpPwdMasterSchema);

module.exports = EmpPwdMaster;
