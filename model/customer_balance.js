const mongoose = require('mongoose');

const customerBalanceSchema = new mongoose.Schema({
  CUSTOMER_ID: { type: String},
  TYPE_CODE: { type: String},
  CLOSING_BALANCE: { type: String},
  OPENING_BALANCE: { type: String},
  OPENING_BALANCE_TIME: { type: Date},
  IMM_DUES: { type: String},
  TOTAL_OUTSTANDING: { type: String},
  ADVANCE: { type: String},
  UPTO30_DAYS: { type: String},
  UPTO60_DAYS: { type: String},
  UPTO90_DAYS: { type: String},
  UPTO120_DAYS: { type: String},
  UPTO150_DAYS: { type: String},
  UPTO180_DAYS: { type: String},
  ABOVE180_DAYS: { type: String},
  TOTAL_CREDIT_LIMIT: { type: String},
  REMAINING_CREDIT_LIMIT: { type: String},
  UPDATED_AT: { type: Date}
});
module.exports = mongoose.model('customer_balance', customerBalanceSchema);

