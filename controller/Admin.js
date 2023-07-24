const emp_cont=require("../model/employee_master")

const index=async(req,res)=>{
      try{
            
       const all_data_fetch=await emp_cont.find({EMP_ID:{$nin:['samishti','p.samishti','c.samishti']}},{EMP_ID:1,EMP_NAME:1,EMP_EMAIL:1,EMP_MOBILE_NO:1,EMP_TYPE:1,FLAG:1,EMP_IMAGE:1,IS_ADMIN:1,_id:0})
       if(all_data_fetch.length==0){
            res.send("no data found")
       }
       else{
            res.send(all_data_fetch)
       }
      }

      catch(error){
       res.status(404).send(error)
      }
}

module.exports={
      index
}