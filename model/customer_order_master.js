const mongoose = require('mongoose');

const customerOrderMasterSchema = new mongoose.Schema({
  ORDER_ID: {
    type: Number,
    unique: true
  },
  ORDER_DATE: {
    type: Date,
    default: Date.now
  },
  APPROVED_BY: {
    type: String
  },
  CUSTOMER_ID: {
    type: String
  },
  CUST_TYPE_CODE: {
    type: String
  },
  PLANT_ID: {
    type: String
  },
  TOTAL_ORDER_VALUE: {
    type: Number
  },
  REMARKS: {
    type: String
  },
  APPROVE_STATUS: {
    type: Number
  },
  ACKNOWLEDGE_STATUS: {
    type: Boolean
  }
});

const CustomerOrderMaster = mongoose.model('customer_order_master', customerOrderMasterSchema);

module.exports = CustomerOrderMaster;
