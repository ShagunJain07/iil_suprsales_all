const authorization_master_tab = require("../model/authorization_master_tab")
const role_master=require("../model/role_master")

const api_create=async(req,res)=>{
      const role_name=req.body.ROLE_NAME
      const role_description=req.body.ROLE_DESCRIPTION
      const auth_id=req.body.AUTH_ID

      const role_count=await role_master.countDocuments({})
      const role_id=role_count+1
      for(i=0;i<auth_id.length;i++){
            const add_data=await role_master.insertMany({ROLE_ID:role_id,ROLE_NAME:role_name,ROLE_DESCRIPTION:role_description,AUTH_ID:auth_id[i],FLAG:1})
            
      }
      res.send("inserted")
}

const api_update=async(req,res)=>{
      const role_id=req.query.id
      const role_name=req.body.ROLE_NAME
      const role_description=req.body.ROLE_DESCRIPTION
      const auth_id=req.body.AUTH_ID
      const flag=req.body.FLAG

      const delete_role=await role_master.deleteOne({ROLE_ID:role_id})
      for(i=0;i<auth_id.length;i++){
            const insert_role=await role_master.insertMany({ROLE_ID:role_id,ROLE_NAME:role_name,ROLE_DESCRIPTION:role_description,AUTH_ID:auth_id[i],FLAG:flag})
      }
      res.send("updated_successfully")
}

const index=async(req,res)=>{
        const role_data=await role_master.find({})
        const array=[]
        for(i=0;i<role_data.length;i++){
            // console.log(role_data[i].AUTH_ID)
           const data={
            ROLE_ID:role_data[i].ROLE_ID,
            ROLE_NAME:role_data[i].ROLE_NAME,
            ROLE_DESCRIPTION:role_data[i].ROLE_DESCRIPTION,
            FLAG:role_data[i].FLAG,
            AUTH_ID:role_data[i].AUTH_ID,
            AUTH:[]
           }
            array.push(data)
      }
            for(j=0;j<array.length;j++){
                  // console.log(array[j])
           const auth_data=await authorization_master_tab.find({AUTH_ID:array[j].AUTH_ID})
      //      console.log(auth_data)
           if(auth_data.length!=0){
           array[j].AUTH.push({
                        AUTH_NAME:auth_data[0].AUTH_NAME,
                        AUTH_ID:auth_data[0].AUTH_ID,
                        FLAG:auth_data[0].FLAG
                     })
            }
      }
            
        

        //console.log(array)
        res.send(array)
      //   const unique_role_name=new Set(array)
      //   Array.from(unique_role_name);
      //    const array2=Array.from(unique_role_name);
      //  console.log(array2)
}
module.exports={
      api_create,api_update,index
}