const mongoose = require('mongoose');

const employeeMasterSchema = new mongoose.Schema({
  EMP_ID: {
    type: String
  },
  EMP_NAME: {
    type: String
  },
  EMP_EMAIL: {
    type: String
  },
  EMP_MOBILE_NO: {
    type: String
  },
  EMP_DESIGNATION: {
    type: String,
    default: null
  },
  EMP_CODE: {
    type: String
  },
  REPORTING_MANAGER_ID: {
    type: String
  },
  IS_ADMIN: {
    type: Number,
    default: null
  },
  EMP_TYPE: {
    type: Number
  },
  EMP_CONTRACT_TYPE: {
    type: Number
  },
  EMP_IMAGE: {
    type: String,
    default: null
  },
  AREA_ID: {
    type: String
  },
  REGION_ID: {
    type: String
  },
  LEVEL_ID: {
    type: String
  },
  IS_APPROVER: {
    type: String
  },
  PLANT_ID: {
    type: String
  },
  LOCATION_ID: {
    type: String
  },
  APPROVER_ID: {
    type: String
  },
  EMP_PWD: {
    type: String
  },
  EDITED_BY: {
    type: String
  },
  VEHICLE_OWNERSHIP: {
    type: Number
  },
  VEHICLE_TYPE: {
    type: Number
  },
  EMP_LAT: {
    type: mongoose.Decimal128
  },
  EMP_LONG: {
    type: mongoose.Decimal128
  },
  FLAG: {
    type: String
  },
  PASSWORD: {
    type: String
  }
});

const EmployeeMaster = mongoose.model('employee_master', employeeMasterSchema);

module.exports = EmployeeMaster;
