const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceMasterSchema = new Schema({
  DOCUMENT_TYPE: { type: String},
  SKU_ID: { type: String},
  INVOICE_NO: { type: String},
  MATERIAL_GROUP: { type: String},
  ORDER_CREATION_DATE: { type: Date},
  INVOICE_DATE: { type: Date},
  ORDER_NO: { type: String},
  SUPRSALES_ORDER_NO: { type: String},
  ORDER_QUANTITY: { type: Number},
  PRICE: { type: Number},
  PRICE_PER_PIECE: { type: Number},
  BOX_QUANTITY: { type: Number},
  CUSTOMER_ID: { type: String},
  GST_AMOUNT: { type: Number},
  BILLING_CREATION_DATE: { type: Date},
  BILLING_TYPE: { type: String},
  BILLING_CATEGORY: { type: String},
  UNIT_MEASURE: { type: String},
  CONVERSION_UM: { type: String},
  MATERIAL_DESC: { type: String},
  CASH_DISCOUNT: { type: String},
  PRODUCT_DISCOUNT: { type: String},
  FRIEGHT: { type: String},
  PACKINGSIZE:{ type: String},
  SKU_CATEGORY: { type: String}

});





const InvoiceMaster = mongoose.model('invoice_master', InvoiceMasterSchema);

module.exports = InvoiceMaster;
