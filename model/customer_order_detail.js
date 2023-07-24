const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerOrderDetailSchema = new Schema({
  ORDER_ID: {
    type: Number,
    required: true
  },
  SKU_ID: {
    type: String,
    required: true
  },
  SKU_QUANTITY: {
    type: Number,
    required: true
  },
  TOTAL_SKU_VALUE: {
    type: Number,
    required: true
  },
  STATUS: {
    type: Number,
    required: true
  }
}, { collection: 'customer_order_detail' });

module.exports = mongoose.model('customer_order_detail', customerOrderDetailSchema);
