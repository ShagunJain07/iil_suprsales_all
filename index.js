const express=require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const cors = require('cors')

const url = 'mongodb://0.0.0.0:27017/iil_suprsales';
  
 mongoose.set('strictQuery', false);

mongoose.connect(url, (err,client)=>{
    if(!err) {
        console.log("successful connection with the server");  
    }
    else
        console.log("Error in the connectivity");
})

app.use(express.json());
app.use(cors())
app.use(bodyParser.json())

const admin=require("./route/Admin")
const announcement=require("./route/Announcement")
const area=require("./route/Area")
const Level=require("./route/level")
const employee=require("./route/employee")

const assign_customer=require("./route/Assign_Customer")
app.use("/suprsales_api/Level",Level)
app.use("/suprsales_api/Employee",employee)
const customer = require("./route/customer");

app.use("/suprsales_api/Assign_Customer",assign_customer)
app.use("/suprsales_api/Area",area)
app.use("/suprsales_api/Announcement",announcement)
app.use("/suprsales_api/Admin",admin)
app.use("/suprsales_api/Customer",customer)



app.listen(5007, () => console.log("server up and runing on port 5007!"));


