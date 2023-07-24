const area_con=require("../model/area_master")

const allArea=async(req,res)=>{
      try{
     const all_data=await area_con.find({})
     if(all_data.length==0){
      res.send("no data found")
     }
else{
      res.send(all_data)
}
      }
      catch(error){

      }
}

const api_create=async(req,res)=>{
      try{
          const AREA_NAME=req.body.AREA_NAME
          const REGION_ID=req.body.REGION_ID

          const update_area=AREA_NAME.toLowerCase()
          const update_region=REGION_ID.toLowerCase()

          const area_id=await area_con.countDocuments({})
          const AREA_ID=area_id+1

          const find_record=await area_con.find({AREA_NAME:update_area,REGION_ID:update_region})

          if(find_record.length==0){
            const add_record=await area_con.insertMany({AREA_ID:AREA_ID,AREA_NAME:update_area,REGION_ID:update_region,FLAG:1})
            res.send("Area Inserted Successfully")
          }
          else{
            res.send("record already exist")
          }
         
      }
      catch(error){
            res.status(404).send("error")
      }
}


const api_update=async(req,res)=>{
try{

      const AREA_ID=req.query.id
      const AREA_NAME=req.body.AREA_NAME
      const FLAG=req.body.FLAG

      const update_record=await area_con.findOneAndUpdate({AREA_ID:AREA_ID},{$set:{AREA_NAME:AREA_NAME.toLowerCase(),FLAG:FLAG}})
      res.send("Area Updated Successfully")
}
catch(error){
      res.status(404).send("error")
}

}

const getArea=async(req,res)=>{
      try{

            const REGION_ID=req.query.id

            if(REGION_ID==null){
                  res.send("please enter region")
            }
            else{
                  const find_record=await area_con.find({REGION_ID:REGION_ID})
                  res.send(find_record)
            }
      }
      catch(error){
            res.status(404).send("error")
      }
}

module.exports={
      allArea,api_create,api_update,getArea
}