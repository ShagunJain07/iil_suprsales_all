const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketMasterSchema = new Schema({
  TICKET_ID: { type: Number, required: true },
  TICKET_COMPONENT_ID: { type: Number, required: true },
  TICKET_PRIORITY_ID: { type: Number, required: true },
  CREATED_ON: { type: Date, required: true },
  CREATED_BY: { type: String, required: true },
  CURRENT_PROCESSOR_ID: { type: String, required: true },
  CURRENT_STATUS: { type: Number, required: true },
  TICKET_SUBJECT: { type: String, required: true },
  TICKET_DESCRIPTION: { type: String, required: true },
  PDF: { type: String, required: true },
  IMAGE: { type: String, required: true },
  IDENTITY_FLAG: { type: Boolean, required: true }
}, { collection: 'ticket_master' });

module.exports = mongoose.model('ticket_master', ticketMasterSchema);
