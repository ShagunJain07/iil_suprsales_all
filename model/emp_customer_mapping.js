const mongoose = require('mongoose');

const empCustomerMappingSchema = new mongoose.Schema({
  EMP_ID: {
    type: String
  },
  TYPE_CODE: {
    type: String
  },
  CUSTOMER_ID: {
    type: String
  },
  RELATIONSHIP: {
    type: Number
  },
  EMP_STATUS: {
    type: Boolean,
    default: true
  }
});

const EmpCustomerMapping = mongoose.model('emp_customer_mappings', empCustomerMappingSchema);

module.exports = EmpCustomerMapping;
