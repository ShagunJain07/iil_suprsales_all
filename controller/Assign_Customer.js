const emp_customer=require("../model/emp_customer_mapping")
const emp_region_mapping=require("../model/emp_region_mapping")
const farmer_master=require("../model/farmer_master")
const retailer_master=require("../model/retailer_master")
const assign=async(req,res)=>{
     try{
      const EMP_ID=req.body.EMP_ID
      const RETAILER_ID=req.body.RETAILER_ID
      const FARMER_ID=req.body.FARMER_ID

      if(RETAILER_ID.length!=0){
            for(i=0;i<RETAILER_ID.length;i++){
            const update_record=await emp_customer.insertMany({EMP_ID:EMP_ID,TYPE_CODE:'RET',CUSTOMER_ID:RETAILER_ID[i],RELATIONSHIP:1})
            }
      }
      if(FARMER_ID.length!=0){
            for(i=0;i<FARMER_ID.length;i++){
            const update_record=await emp_customer.insertMany({EMP_ID:EMP_ID,TYPE_CODE:'FAR',CUSTOMER_ID:FARMER_ID[i],RELATIONSHIP:1})
            }
      }
      res.send("assigned successfully")
}
catch(error){
      console.log(error)
      res.status(404).send("error")
}

}

const selectFarmer=async(req,res)=>{
      try{

            const emp_id=req.query.id
            const region_array=[]
            const region_data=await emp_region_mapping.find({EMP_ID:emp_id})
            for(i=0;i<region_data.length;i++){
                  region_array.push(region_data[i])
                } 
            if(region_array.length==0){
              res.send("no region found for this employee")
            }
            else{
                  const farmer_data=await farmer_master.find({REGION_ID:{$in:region_array},FLAG:1})
                  if(farmer_data.length==0){
                        res.send("no farmer found")
                  }
                  else{
                  res.send(farmer_data)
                  }
            }
      }
      catch(error){
            res.status(404).send("error")
      }
}


const selectRetailer=async(req,res)=>{
      try{

            const emp_id=req.query.id
             const region_array=[]
            const region_data=await emp_region_mapping.find({EMP_ID:emp_id})
            for(i=0;i<region_data.length;i++){
              region_array.push(region_data[i])
            }
            if(region_array.length==0){
              res.send("no region found for this employee")
            }
            else{
                  const retailer_data=await retailer_master.find({REGION_ID:{$in:region_array},FLAG:1})
                  if(retailer_data.length==0){
                        res.send("no retailer found")
                  }
                  else{
                  res.send(retailer_data)
                  }
            }
      }
      catch(error){
            res.status(404).send("error")
      }
}
module.exports={
      assign,selectFarmer,selectRetailer
}