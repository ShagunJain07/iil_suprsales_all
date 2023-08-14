const attendance_master = require("../model/attendance_master")
const task_master = require("../model/task_master")
const emp_region_mapping=require("../model/emp_region_mapping")
const region_master=require("../model/region_master")
const employee_master=require("../model/employee_master")
const empattendance = async (req, res) => {
      try {
            const emp_id = req.query.id

            const all_data = await task_master.find({ CREATED_BY: emp_id }, { _id: 0, __v: 0 })

            if (all_data.length == 0) {
                  res.send("no data found")
            }
            else {
                  res.send(all_data)
            }

      }
      catch (error) {
            //console.log(error)
            res.status(404).send("error")
      }
}

const getDataByDate = async (req, res) => {
      try {
            const emp_id = req.query.id

            const all_data = await attendance_master.find({ EMP_ID: emp_id }, { _id: 0, __v: 0 })

            if (all_data.length == 0) {
                  res.send("no data found")
            }
            else {
                  res.send(all_data)
            }
      }
      catch (error) {
            //   console.log(error)
            res.status(404).send("error")
      }
}


const getDataByDateMob = async (req, res) => {
      try {
            const array1 = []

                       const emp_id = req.query.id

            const all_data = await attendance_master.find({ EMP_ID: emp_id }, { _id: 0, __v: 0 })

            if (all_data.length == 0) {
                  res.send("no data found")
            }
            else {
                  for (i = 0; i < all_data.length; i++) {
            const log_in_time = new Date(all_data[i].LOG_IN_TIME);
            const hours = log_in_time.getHours();
            const minutes = log_in_time.getMinutes();
            const seconds = log_in_time.getSeconds();
            
            const log_in_time_final= '${hours}:${minutes}:${seconds}'

            const log_out_time = new Date(all_data[i].LOG_OUT_TIME);
            const hours1 = log_out_time.getHours();
            const minutes1 = log_out_time.getMinutes();
            const seconds1 = log_out_time.getSeconds();
            
            const log_out_time_final= '${hours1}:${minutes1}:${seconds1}'
            
                        array1.push({
                              "LOG_IN_TIME": log_in_time_final,
                              "DATE":all_data[i].DATE,
                              "LOG_OUT_TIME":log_out_time_final,
                              "STATUS":all_data[i].STATUS

                        })
                  }
                  res.send(array1)
            }
      }
      catch (error) {
            //console.log(error)
            res.status(404).send("error")
      }
}

const getDataByYear=async(req,res)=>{
      try{

            const EMP_LOGIN_ID=req.query.emp_id //array
            const emp_id=req.query.id
            const year=req.query.year
            const month=req.query.month

            const emp_ids=await user_mapping.find({ROLE_ID:111})

            const emp_region_mapping_data=await emp_region_mapping.find({EMP_ID:emp_id})

            const region_master_data=await region_master.find({REGION_ID:emp_region_mapping_data[0].REGION_ID})

            if(EMP_LOGIN_ID.length!=0&year!=null&month!=null){
                  for(i=0;i<EMP_LOGIN_ID.length;i++){
                        const employee_data=await employee_master.find({EMP_ID:EMP_LOGIN_ID[i]})

                        const employee_data2=await employee_master.find({EMP_ID:employee_data[0].REPORTING_MANAGER_ID})
                  } 
            }

      }
      catch(error){
            console.log(error)
            res.status(404).send("error")
      }
}
module.exports = {
      empattendance, getDataByDate,getDataByDateMob
}