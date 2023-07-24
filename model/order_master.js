const mongoose = require('mongoose');

const orderMasterSchema = new mongoose.Schema({
  ORDER_ID: {
    type: String,
    required: true
  },
  ORDER_DATE: {
    type: Date,
    default: Date.now,
    required: true
  },
  CREATED_BY: {
    type: String,
    required: true
  },
  CUSTOMER_ID: {
    type: Number,
    required: true
  },
  CUST_TYPE_CODE: {
    type: String,
    required: true
  },
  PLANT_ID: {
    type: Number,
    required: true
  },
  TOTAL_ORDER_VALUE: {
    type: Number,
    required: true
  },
  REMARKS: {
    type: String,
    required: true
  },
  STATUS: {
    type: String,
    required: true
  },
  CUSTOMER_ORDER_ID: {
    type: Number,
    required: true
  }
});

const OrderMaster = mongoose.model('order_master', orderMasterSchema);

module.exports = OrderMaster;
