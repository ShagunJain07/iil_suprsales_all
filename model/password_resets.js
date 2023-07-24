const mongoose = require('mongoose');

const passwordResetSchema = new mongoose.Schema({
  email: { type: String, required: true, collation: { locale: 'en', strength: 1 } },
  token: { type: String, required: true, collation: { locale: 'en', strength: 1 } },
  created_at: { type: Date, default: Date.now },
});

const PasswordReset = mongoose.model('password_reset', passwordResetSchema);

module.exports = PasswordReset;
