const emp_customer=require("../model/emp_customer_mapping")

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

module.exports={
      assign
}