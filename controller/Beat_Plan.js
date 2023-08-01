const beat_plan_controller=require("../model/beat_plan_master_tab")
const customer_beat_plan_controller=require("../model/customer_beat_plan")
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
      const CUSTOMER_ID = req.body.CUSTOMER_ID
      const BEAT_PLAN_DATE = req.body.BEAT_PLAN_DATE

      for(i=0;i<BEAT_PLAN_DATE.length;i++){
           

      }
}


const createBeatPlanMob=async(req,res)=>{
      try{
      const CREATED_BY = req.body.CREATED_BY
      const CREATED_FOR = req.body.CREATED_FOR
      const CUSTOMER_ID = req.body.CUSTOMER_ID // array
      const BEAT_PLAN_DATE = req.body.BEAT_PLAN_DATE
      const REMARKS = req.body.REMARKS

      const add_data=await beat_plan_controller.insertMany({CREATED_BY:CREATED_BY,CREATED_FOR:CREATED_FOR,BEAT_PLAN_DATE:BEAT_PLAN_DATE,REMARKS:REMARKS,FLAG:1})

      const beat_plan_id=await customer_beat_plan_controller.countDocuments({})

      const BEAT_PLAN_ID=beat_plan_id+1

      for(i=0;i<CUSTOMER_ID.length;i++){
            const add_data2=await customer_beat_plan_controller.insertMany({BEAT_PLAN_ID:BEAT_PLAN_ID,CUSTOMER_ID:CUSTOMER_ID[i]})
      }

      res.send("Beat Plan Inserted Successfully")
      }
      catch(error){
            res.status(404).send("error")
      }
}


module.exports={
      beatplanupdate,createBeatPlanMob
}