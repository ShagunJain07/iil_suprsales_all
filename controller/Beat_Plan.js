const beat_plan_master_tab = require("../model/beat_plan_master_tab")
const beat_plan_controller=require("../model/beat_plan_master_tab")
const customer_beat_plan = require("../model/customer_beat_plan")
const customer_beat_plan_controller=require("../model/customer_beat_plan")
const distributor_master=require("../model/distributor_master")
const region_master=require("../model/region_master")
const emp_cust_mapping=require("../model/emp_customer_mapping")
const farmer_master=require("../model/farmer_master")
const retailer_master=require("../model/retailer_master")
const employee_master=require("../model/employee_master")
const beatplanupdate=async(req,res)=>{
      try{
          const CREATED_FOR=req.body.CREATED_FOR
          const BEAT_PLAN_DATE=req.body.BEAT_PLAN_DATE
          const CREATED_BY=req.body.CREATED_BY
          const CUST_NAME=req.body.CUST_NAME

          for(i=0;i<CUST_NAME.length;i++){
            const add_record=await beat_plan_controller.insertMany({CREATED_FOR:CREATED_FOR,BEAT_PLAN_DATE:BEAT_PLAN_DATE,CREATED_BY:CREATED_BY,CUST_NAME:CUST_NAME[i]})
          }
          res.send("Beat Plan created Successfully")
      }
      catch(error){
            res.status(404).send("error")
      }
}


const createBeatPlan=async(req,res)=>{
      const CREATED_BY=req.body.CREATED_BY
      const CREATED_FOR = req.body.CREATED_FOR
      const CUSTOMER_ID = req.body.CUSTOMER_ID //array
      const BEAT_PLAN_DATE = req.body.BEAT_PLAN_DATE //array
      const beat_plan_id1=await beat_plan_controller.countDocuments({})

      const BEAT_PLAN_ID1=beat_plan_id1+1
      for(i=0;i<BEAT_PLAN_DATE.length;i++){
           const beat_plan_data=await beat_plan_master_tab.find({CREATED_BY:CREATED_BY,CREATED_FOR:CREATED_FOR,BEAT_PLAN_DATE:BEAT_PLAN_DATE[i]})

           const BEAT_PLAN_ID_CHECK=beat_plan_data[0].BEAT_PLAN_ID

           if(BEAT_PLAN_ID_CHECK.length==0){
            const beat_plan_count=await beat_plan_master_tab.countDocuments()
            const new_count=beat_plan_count+1

            const insert_data=await beat_plan_master_tab.insertMany({BEAT_PLAN_ID:new_count,CREATED_BY:CREATED_BY,CREATED_FOR:CREATED_FOR,BEAT_PLAN_DATE:BEAT_PLAN_DATE[i],FLAG:1})

            const beat_plan_count2=await beat_plan_master_tab.countDocuments()
            const new_count2=beat_plan_count

            for(j=0;j<CUSTOMER_ID.length;j++){
                  const customer_beat_plan_insertion=await customer_beat_plan.insertMany({BEAT_PLAN_ID:new_count2,CUSTOMER_ID:CUSTOMER_ID[j],STATUS:1})
            }
            
           }
           else if(BEAT_PLAN_ID_CHECK.length!=0){
            const beat_plan_count=await beat_plan_master_tab.countDocuments()
            const new_count=beat_plan_count+1


            for(j=0;j<CUSTOMER_ID.length;j++){
                  const customer_beat_plan_insertion=await customer_beat_plan.insertMany({BEAT_PLAN_ID:new_count,CUSTOMER_ID:CUSTOMER_ID[j],STATUS:1})
            }
            
           }
      }
      res.send("Inserted")

}


const createBeatPlanMob=async(req,res)=>{
      try{
      const CREATED_BY = req.body.CREATED_BY
      const CREATED_FOR = req.body.CREATED_FOR
      const CUSTOMER_ID = req.body.CUSTOMER_ID // array
      const BEAT_PLAN_DATE = req.body.BEAT_PLAN_DATE
      const REMARKS = req.body.REMARKS
      const beat_plan_id1=await beat_plan_controller.countDocuments({})

      const BEAT_PLAN_ID1=beat_plan_id1+1
      const add_data=await beat_plan_controller.insertMany({BEAT_PLAN_ID:BEAT_PLAN_ID1,CREATED_BY:CREATED_BY,CREATED_FOR:CREATED_FOR,BEAT_PLAN_DATE:BEAT_PLAN_DATE,REMARKS:REMARKS,FLAG:1})

      const beat_plan_id=await customer_beat_plan_controller.countDocuments({})

      const BEAT_PLAN_ID=beat_plan_id+1

      for(i=0;i<CUSTOMER_ID.length;i++){
            const add_data2=await customer_beat_plan_controller.insertMany({BEAT_PLAN_ID:BEAT_PLAN_ID,CUSTOMER_ID:CUSTOMER_ID[i]})
      }

      res.send("Beat Plan Inserted Successfully")
      }
      catch(error){
            console.log(error)
            res.status(404).send("error")
      }
}

const getBeatPlanByEmp=async(req,res)=>{
      try{

            const array1=[]
            const CREATED_FOR=req.query.id
            const BEAT_PLAN_DATE=req.query.date

            const beat_plan_master_data=await beat_plan_master_tab.find({CREATED_FOR:CREATED_FOR,BEAT_PLAN_DATE:BEAT_PLAN_DATE})

            for(i=0;i<beat_plan_master_data.length;i++){
                  const customer_beat_plan_data=await customer_beat_plan.find({BEAT_PLAN_ID:beat_plan_master_data[i].BEAT_PLAN_ID})
                  //console.log(customer_beat_plan_data)
                  const distributor_master_data=await distributor_master.find({DISTRIBUTOR_ID:customer_beat_plan_data[0].CUSTOMER_ID})


                  const region_data=await region_master.find({REGION_ID:distributor_master_data[0].REGION_ID})
                  const object1={
                        "CUSTOMER_ID":customer_beat_plan_data[i].CUSTOMER_ID,
                        "CUSTOMER_NAME":distributor_master_data[0].DISTRIBUTOR_NAME,
                        "CUSTOMER_DISTRICT":distributor_master_data[0].DISTRIBUTOR_DISTRICT,
                        "CUSTOMER_PHN":distributor_master_data[0].DISTRIBUTOR_MOB_NO,
                        "CUSTOMER_STATE":region_data[0].REGION_NAME,
                        "CUSTOMER_LAT":distributor_master_data[0].DISTRIBUTOR_LAT,
                        "CUSTOMER_LONG":distributor_master_data[0].DISTRIBUTOR_LONG,
                        "STATUS":customer_beat_plan_data[i].STATUS
                  }
  array1.push(object1)
            }
            res.send(array1)
      }
      catch(error){
            console.log(error)
            res.status(404).send("error")
      }
}

const getBeatPlanByEmpId=async(req,res)=>{
      try{

            const EMP_ID=req.query.id

            const array1=[]
            const employee_customer=await emp_cust_mapping.find({EMP_ID:EMP_ID})

            for(i=0;i<employee_customer.length;i++){
                  if(employee_customer[i].TYPE_CODE=='DIS'){
                        const distributor_master_data=await distributor_master.find({DISTRIBUTOR_ID:employee_customer[i].CUSTOMER_ID})
   array1.push(distributor_master_data[0])
                  }
                  if(employee_customer[i].TYPE_CODE=='FAR'){
                        const farmer_data=await farmer_master.find({FARMER_ID:employee_customer[i].CUSTOMER_ID})
   array1.push(farmer_data[0])
                  }
                  if(employee_customer[i].TYPE_CODE=='RET'){
                        const retailer_data=await retailer_master.find({RETAILER_ID:employee_customer[i].CUSTOMER_ID})
   array1.push(retailer_data[0])
                  }
            }
         res.send(array1) 
      }
      catch(error){
            res.status(404).send("error")
      }
}

const getbeatplancustomer=async(req,res)=>{
      try{

            const name=req.query.id

            const master_data=await beat_plan_master_tab.find({CREATED_FOR:name})

            if(master_data.length!=0){
                  res.send(master_data)
            }
            else{
                  res.send("error")
            }
      }
      catch(error){
            res.status(404).send("error")
      }
}

const updateBeatPlan=async(req,res)=>{
      try{

            const CREATED_FOR=req.query.id
            const BEAT_PLAN_DATE=req.query.date
            const CUSTOMER_IDs=req.body.CUSTOMER_ID

            const emp_data=await employee_master.find({EMP_ID:CREATED_FOR})

           // console.log("EMP",emp_data)
            const reporting_manager_data=emp_data[0].REPORTING_MANAGER_ID

            const beat_plan_master_tab_data=await beat_plan_master_tab.find({BEAT_PLAN_DATE:BEAT_PLAN_DATE,CREATED_FOR:CREATED_FOR,CREATED_BY:reporting_manager_data})

            const delete_plan=await customer_beat_plan.deleteMany({BEAT_PLAN_ID:beat_plan_master_tab_data[0].BEAT_PLAN_ID})

            for(i=0;i<CUSTOMER_IDs.length;i++){
                  const customer_beat_plan_insertion=await customer_beat_plan.insertMany({BEAT_PLAN_ID:beat_plan_master_tab_data[0].BEAT_PLAN_ID,CUSTOMER_ID:CUSTOMER_IDs[i],STATUS:1})
            }
            res.send("updated successfully")
      }
      catch(error){
            console.log(error)
            res.status(404).send("error")
      }
}
module.exports={
      beatplanupdate,createBeatPlanMob,createBeatPlan,getBeatPlanByEmp,getBeatPlanByEmpId,getbeatplancustomer,updateBeatPlan
}