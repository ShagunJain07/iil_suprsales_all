const mongoose = require('mongoose');

const ticketPriorityMasterSchema = new mongoose.Schema({
  TICKET_PRIORITY_ID: { type: Number, required: true },
  TICKET_PRIORITY_DESC: { type: String, required: true },
  FLAG: { type: Number, required: true },
});

const TicketPriorityMaster = mongoose.model('ticket_priority_master', ticketPriorityMasterSchema);

module.exports = TicketPriorityMaster;
