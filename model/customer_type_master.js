const mongoose = require('mongoose');

const customerTypeMasterSchema = new mongoose.Schema({
  CUST_TYPE_CODE: {
    type: String,
    required: true
  },
  CUST_TYPE_NAME: {
    type: String,
    required: true
  }
}, { collection: 'customer_type_master' });

const CustomerTypeMaster = mongoose.model('customer_type_master', customerTypeMasterSchema);

module.exports = CustomerTypeMaster;
