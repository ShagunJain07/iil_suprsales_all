const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  emp_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String
  },
  email_verified_at: {
    type: Date
  },
  password: {
    type: String,
    required: true
  },
  remember_token: {
    type: String
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  },
  flag: {
    type: Number,
    required: true
  },
  USER_TYPE: {
    type: Number,
    required: true
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
