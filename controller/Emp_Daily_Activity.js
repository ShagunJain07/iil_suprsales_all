const emp_daily_activity = require("../model/emp_daily_activity")
const distributor_master=require("../model/distributor_master")
const createEmpDailyActivityMob = async (req, res) => {
      try {

            const EMP_ID = req.body.EMP_ID
            const CUSTOMER_ID = req.body.CUSTOMER_ID
            const REMARKS = req.body.REMARKS
            const IMAGE1 = req.files.IMAGE1[0].originalname
            const IMAGE2 = req.files.IMAGE2[0].originalname

            if (IMAGE1 != null & IMAGE2 != null) {
                  const add_activity = await emp_daily_activity.insertMany({ EMP_ID: EMP_ID, CUSTOMER_ID: CUSTOMER_ID, DATE: new Date(), IMAGE1: IMAGE1, IMAGE2: IMAGE2, REMARKS: REMARKS })

            }
            else {
                  const add_activity = await emp_daily_activity.insertMany({ EMP_ID: EMP_ID, CUSTOMER_ID: CUSTOMER_ID, DATE: new Date(), IMAGE1: IMAGE1, REMARKS: REMARKS })

            }
            res.send("inserted")
      }
      catch (error) {
res.status(404).send("error")
      }
}

const getDailyActivityDetailMob=async(req,res)=>{
      try{

            const emp_id=req.query.id
 
            const array1=[]
            const get_data=await emp_daily_activity.find({EMP_ID:emp_id})
            for(i=0;i<get_data.length;i++){
                  const distributor_master_data=await distributor_master.find({DISTRIBUTOR_ID:get_data[i].CUSTOMER_ID})

                  const object1={
                        EMP_ID:get_data[i].EMP_ID,
                        CUSTOMER_ID:get_data[i].CUSTOMER_ID,
                        DISTRIBUTOR_NAME:distributor_master_data[0].DISTRIBUTOR_NAME,
                        DATE:get_data[i].DATE,
                        IMAGE1:get_data[i].IMAGE1,
                        IMAGE2:get_data[i].IMAGE2,
                        REMARKS:get_data[i].REMARKS
                  }
                  array1.push(object1)
            }
            res.send(array1)
      }
      catch (error) {
           // console.log(error)
            res.status(404).send("error")
                  }
}


const getEmpDailyActivityMob=async(req,res)=>{
      try{
            const emp_id=req.query.id

            

      }
      catch (error) {
            console.log(error)
            res.status(404).send("error")
                  }
}
module.exports = {
      createEmpDailyActivityMob,getDailyActivityDetailMob,getEmpDailyActivityMob
}