const mongoose = require('mongoose');

const credit_limitSchema = new mongoose.Schema({
      DATAAREAID: {
    type: String
  },
  CUSTACCOUNT: {
    type: String
  },
  CREDITLIMIT: {
    type: Number
  },
  CREDITDAYS: {
    type: Number
  },
  EMPLID: {
    type: String
  }
}, {
  collection: 'credit_limit'
});

module.exports = mongoose.model('credit_limit', credit_limitSchema);
