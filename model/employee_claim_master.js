const mongoose = require('mongoose');

const employeeClaimSchema = new mongoose.Schema({
  CLAIM_ID: { type: Number},
  EMPLOYEE_ID: { type: String},
  EXP_BUS_TRAIN: { type: Number},
  EXP_TAXI_AUTO: { type: Number},
  EXP_HOTEL: { type: Number},
  EXP_STATIONARY: { type: Number},
  EXP_MOBILE_INTERNET: { type: Number},
  DA_RATES_LOCAL: { type: Number},
  DA_RATES_OUTST: { type: Number},
  EXP_PLANE: { type: Number},
  EXP_VEH_REPAIR: { type: Number},
  EXP_MISC: { type: Number},
  TOTAL_CLAIMED_AMOUNT: { type: Number},
  CLAIM_DATE: { type: Date},
  START_KM: { type: Number},
  MISC_COMMENTS: { type: String},
  END_KM: { type: Number},
  EXP_FUEL: { type: Number},
  APPROVAL_STATUS: { type: Number},
});

const EmployeeClaim = mongoose.model('employee_claim_master', employeeClaimSchema);

module.exports = EmployeeClaim;
