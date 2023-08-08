const mongoose = require('mongoose');

const orderMasterSchema = new mongoose.Schema({
  ORDER_ID: {
    type: String
  },
  ORDER_DATE: {
    type: Date,
    default: Date.now
  },
  CREATED_BY: {
    type: String
  },
  CUSTOMER_ID: {
    type: String
  },
  CUST_TYPE_CODE: {
    type: String
  },
  PLANT_ID: {
    type: Number
  },
  TOTAL_ORDER_VALUE: {
    type: Number
  },
  REMARKS: {
    type: String
  },
  STATUS: {
    type: String
  },
  CUSTOMER_ORDER_ID: {
    type: Number
  }
});

const OrderMaster = mongoose.model('order_master', orderMasterSchema);

module.exports = OrderMaster;
