const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ledgerMasterSchema = new Schema({
  TRANSACTION_ID: { type: String},
  TRANSACTION_TYPE: { type: String},
  TRANSACTION_AMOUNT: { type: Number},
  TRANSACTION_DESCRIPTION: { type: String},
  TRANSACTION_TIME: { type: Date},
  TIME: { type: String},
  CUSTOMER_ID: { type: String},
  CUST_TYPE_CODE: { type: String, default: 'DIS' },
  TYPE: { type: String},
  BALANCE: { type: Number},
  INVOICE_NO: { type: String},
});

const LedgerMaster = mongoose.model('ledger_master', ledgerMasterSchema);

module.exports = LedgerMaster;
