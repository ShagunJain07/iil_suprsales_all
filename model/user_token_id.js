const mongoose = require('mongoose');

const UserTokenIdSchema = new mongoose.Schema({
  EMP_ID: {
    type: String,
    required: true
  },
  TOKEN_ID: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('user_token_id', UserTokenIdSchema);
