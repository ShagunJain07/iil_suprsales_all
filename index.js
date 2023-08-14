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
const Attendance=require("./route/Attendance")
const Emp_DailyActivity=require("./route/Emp_Daily_Activity")
const YouTube=require("./route/YouTube")
const employee=require("./route/employee")
app.use("/suprsales_api/Employee",employee)
const ledger=require("./route/ledger")
app.use("/suprsales_api/Ledger",ledger)
const Level=require("./route/level")
app.use("/suprsales_api/Level",Level)

const customer = require("./route/customer");
app.use("/suprsales_api/Customer",customer)

const stock=require("./route/stock")
app.use("/suprsales_api/Stock",stock)
const Claim=require("./route/Claim")
app.use("/suprsales_api/Claim",Claim)
const customer_dashboard=require("./route/Customer_Dashborad")
app.use("/suprsales_api/Customer_Dashboard",customer_dashboard)
app.use("/suprsales_api/YouTube",YouTube)

app.use("/suprsales_api/Emp_DailyActivity",Emp_DailyActivity)

app.use("/suprsales_api/Attendance",Attendance)

app.use("/suprsales_api/Packaging_Unit",Packaging_Unit)

const Material_Group=require("./route/Material_Group")
app.use("/suprsales_api/Material_Group",Material_Group)
const role=require("./route/role")
app.use("/suprsales_api/authorization",authorization)

app.use("/suprsales_api/Role",role)

const assign_customer=require("./route/Assign_Customer")
const Task=require("./route/Task")
const CustomerOrder=require("./route/customerOrder")
const EmpOrder=require("./route/Emp_Order")
const BeatPlan=require("./route/Beat_Plan")
app.use("/suprsales_api/Order",EmpOrder)

app.use("/suprsales_api/Beat_Plan",BeatPlan)


app.use("/suprsales_api/customerOrder",CustomerOrder)

app.use("/suprsales_api/Task",Task)

app.use("/suprsales_api/Beat_Plan",beat_plan)
app.use("/suprsales_api/Assign_Customer",assign_customer)
app.use("/suprsales_api/Area",area)
app.use("/suprsales_api/Announcement",announcement)
app.use("/suprsales_api/Admin",admin)



app.listen(5007, () => console.log("server up and runing on port 5007!"));


