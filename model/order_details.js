const mongoose = require('mongoose');

const orderDetailsSchema = new mongoose.Schema({
  ORDER_ID: {
    type: String,
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
  }
});

const OrderDetails = mongoose.model('order_details', orderDetailsSchema);

module.exports = OrderDetails;
