const mongoose = require('mongoose');

const ticketStatusSchema = new mongoose.Schema({
  STATUS_ID: {
    type: Number,
    required: true
  },
  STATUS_DESC: {
    type: String,
    required: true
  },
  FLAG: {
    type: Number,
    required: true
  }
});

const TicketStatus = mongoose.model('ticket_status', ticketStatusSchema);

module.exports = TicketStatus;
