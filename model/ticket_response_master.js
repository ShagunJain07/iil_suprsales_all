const mongoose = require('mongoose');

const ticketResponseMasterSchema = new mongoose.Schema({
  TICKET_ID: { type: Number, required: true },
  RESPONSE_DESC: { type: String, required: true },
  RESPONDED_BY: { type: String, required: true },
  RESPONDED_ON: { type: Date, default: Date.now },
  RESPONSE_TYPE: { type: Number, required: true }
});

const TicketResponseMaster = mongoose.model('ticket_response_master', ticketResponseMasterSchema);

module.exports = TicketResponseMaster;
