const usermapping=require("../model/user_mapping")
const role=require("../model/role_master")
const auth=require("../model/authorization_master_tab")
const employee_master=require("../model/employee_master")

const api_create=async(req,res)=>{
      try{
      const emp_id=req.body.EMP_ID
      const role_id=req.body.ROLE_ID

      for(i=0;i<=emp_id.length;i++){
            //console.log(emp_id[i],role_id[i])
            const insert_data=await usermapping.insertMany({EMP_ID:emp_id[i],ROLE_ID:role_id[i]})

      }
      res.send("inserted")
}
catch(error){
      res.send(error)
}
}

const all_roles=async(req,res)=>{
      try{
      const emp_id=req.query.EMP_ID
      
      const get_data=await usermapping.find({EMP_ID:emp_id},{_id:0,__v:0})
      const role_data=await role.find({ROLE_ID:get_data[0].ROLE_ID},{_id:0,__v:0})
      
      const final_data=[{
            FLAG: get_data[0].FLAG,
             EMP_ID: get_data[0].EMP_ID, 
             ROLE_ID: get_data[0].ROLE_ID,
             auth_detail:[]
      }]
      for(i=0;i<role_data.length;i++){
      //       final_data[0].ROLE.push({"FLAG":role_data[i].FLAG,
      //       "ROLE_ID": role_data[i].ROLE_ID,
      //       "ROLE_NAME": role_data[i].ROLE_NAME,
      //       "ROLE_DESCRIPTION":role_data[i].ROLE_DESCRIPTION,
      //       "AUTH_ID":role_data[i].AUTH_ID,
      //      "auth_detail":[]})
            const auth_data=await auth.find({AUTH_ID:role_data[i].AUTH_ID})
            //console.log(final_data[0].ROLE[i].auth_detail)
          final_data[0].auth_detail.push(auth_data[0])
      }
     
     res.send(final_data)

}
catch(error){
      res.send(error)
}
}

const api_update=async(req,res)=>{
      try{
        const emp_id=req.query.id
        const roles=req.body.ROLE_ID
        const flags=req.body.FLAG
      
        const delete_data=await usermapping.deleteMany({EMP_ID:emp_id})
        
        for(i=0;i<roles.length;i++){
            const update_data=await usermapping.insertMany({EMP_ID:emp_id,ROLE_ID:roles[i],FLAG:flags[i]})
            console.log(update_data)
        }
        res.send("updated successfully")
      }
      catch(error){
        res.send(error)
      }
      }
      
      
      const api_delete=async(req,res)=>{
            try{
            const emp_id=req.body.EMP_ID
      
            const delete_data=await usermapping.deleteMany({EMP_ID:emp_id})
      
            res.send("deleted")
            }
            catch(error){
                  res.status(400).send("error")
            }
      }
      
      const getEmpWithNoRole=async(req,res)=>{
      try{
            const all_user=[]
         const user_data=await usermapping.find({})
         for(i=0;i<user_data.length;i++){
            all_user.push(user_data[i].EMP_ID)
         }
         const emp_data=await employee_master.find({EMP_ID:{$nin:all_user}})
         res.send(emp_data)
      }
      catch(error){
            res.status(400).send("error")
      }
      }
      
      
      const index=async(req,res)=>{
            try{
            const all_data=[]
            const get_data=await usermapping.find({},{_id:0,__v:0})
            for(j=0;j<get_data.length;j++){
            const role_data=await role.find({ROLE_ID:get_data[j].ROLE_ID},{_id:0,__v:0})
            const final_data={
                  FLAG: get_data[j].FLAG,
                   EMP_ID: get_data[j].EMP_ID, 
                   ROLE_ID: get_data[j].ROLE_ID,
                   ROLE:[]
            }
            for(i=0;i<role_data.length;i++){
                  final_data.ROLE.push({"FLAG":role_data[i].FLAG,
                  "ROLE_ID": role_data[i].ROLE_ID,
                  "ROLE_NAME": role_data[i].ROLE_NAME,
                  "ROLE_DESCRIPTION":role_data[i].ROLE_DESCRIPTION,
                  "AUTH_ID":role_data[i].AUTH_ID})
            }
      all_data.push(final_data)
            
            //       const auth_data=await auth.find({AUTH_ID:role_data[i].AUTH_ID})
            //       //console.log(final_data[0].ROLE[i].auth_detail)
            //     final_data[0].auth_detail.push(auth_data[0])
            }
           
           res.send(all_data)
      
      }
      catch(error){
            res.status(400).send("error")
      }
      }
module.exports={
      api_create,all_roles,api_update,api_delete,getEmpWithNoRole,index
}