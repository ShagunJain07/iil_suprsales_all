const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerOrderDetailSchema = new Schema({
  ORDER_ID: {
    type: Number
  },
  SKU_ID: {
    type: String
  },
  SKU_QUANTITY: {
    type: Number
  },
  TOTAL_SKU_VALUE: {
    type: Number
  },
  STATUS: {
    type: Number
  }
}, { collection: 'customer_order_detail' });

module.exports = mongoose.model('customer_order_detail', customerOrderDetailSchema);
