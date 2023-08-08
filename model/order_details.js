const mongoose = require('mongoose');

const orderDetailsSchema = new mongoose.Schema({
  ORDER_ID: {
    type: String
  },
  SKU_ID: {
    type: String
  },
  SKU_QUANTITY: {
    type: Number
  },
  TOTAL_SKU_VALUE: {
    type: Number
  }
});

const OrderDetails = mongoose.model('order_details', orderDetailsSchema);

module.exports = OrderDetails;
