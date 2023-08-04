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
const beat_plan=require("./route/Beat_Plan")
const authorization=require("./route/authorization")
const usermapping=require("./route/user_mapping")
app.use("/suprsales_api/UserMapping",usermapping)
const Packaging_Unit=require("./route/Packaging_Unit")
app.use("/suprsales_api/Packaging_Unit",Packaging_Unit)

const Material_Group=require("./route/Material_Group")
app.use("/suprsales_api/Material_Group",Material_Group)
const role=require("./route/role")
app.use("/suprsales_api/authorization",authorization)

app.use("/suprsales_api/Role",role)

const assign_customer=require("./route/Assign_Customer")
const Task=require("./route/Task")
app.use("/suprsales_api/Task",Task)

app.use("/suprsales_api/Beat_Plan",beat_plan)
app.use("/suprsales_api/Assign_Customer",assign_customer)
app.use("/suprsales_api/Area",area)
app.use("/suprsales_api/Announcement",announcement)
app.use("/suprsales_api/Admin",admin)



app.listen(5007, () => console.log("server up and runing on port 5007!"));


