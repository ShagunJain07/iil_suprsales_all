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
      console.log(role_description)
      const delete_role=await role_master.deleteMany({ROLE_ID:role_id})
      for(i=0;i<auth_id.length;i++){
            const insert_role=await role_master.insertMany({ROLE_ID:role_id,ROLE_NAME:role_name,ROLE_DESCRIPTION:role_description,AUTH_ID:auth_id[i],FLAG:flag})
      }
      res.send("updated_successfully")
}

const index=async(req,res)=>{
      const array=[]

      const distinct_roles=await role_master.distinct("ROLE_ID")
      //console.log(distinct_roles)
      for(a=0;a<distinct_roles.length;a++){
        const role_data=await role_master.find({ROLE_ID:distinct_roles[a]})
            // console.log(role_data[i].AUTH_ID)
           const data={
            ROLE_ID:role_data[0].ROLE_ID,
            ROLE_NAME:role_data[0].ROLE_NAME,
            ROLE_DESCRIPTION:role_data[0].ROLE_DESCRIPTION,
            FLAG:role_data[0].FLAG,
           
            AUTH:[]
           }
          
      
           
                  // console.log(array[j])
                  const auth_array=await role_master.find({ROLE_ID:role_data[0].ROLE_ID})
                  const array1=[]
                  for(n=0;n<auth_array.length;n++){
                        array1.push(auth_array[n].AUTH_ID)
                  }
           const auth_data=await authorization_master_tab.find({AUTH_ID:{$in:array1}})
      //      console.log(auth_data)
      for(m=0;m<auth_data.length;m++){
            if(auth_data.length!=0){
                  data.AUTH.push({
                               AUTH_NAME:auth_data[m].AUTH_NAME,
                               AUTH_ID:auth_data[m].AUTH_ID,
                               FLAG:auth_data[m].FLAG
                            })
                   }
      
      }
      array.push(data)

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