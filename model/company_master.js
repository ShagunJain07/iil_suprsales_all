const mongoose = require('mongoose');
const db2Connection = require('../database_saas');

const Company_master_Schema = new mongoose.Schema({
   COMPANY_ID_ID:String,
   COMPANY_NAME:String,
   COMPANY_URL:String,
   DB_NAME:String
});

const Company_model = db2Connection.model('company_master', Company_master_Schema);

module.exports = Company_model;
//module.exports = db2Connection.model('company_master', Company_master_Schema);