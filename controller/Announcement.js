const ann_cont=require("../model/announcement_type_master")


const api_create=async(req,res)=>{
      try{
         const type=req.body.ANNOUNCEMENT_TYPE
         if(type==null){
            res.send("please enter type")
         }
         else{
            const ann_id=await ann_cont.countDocuments({})
            const ANNOUNCEMENT_ID=ann_id+1
            const add_data=await ann_cont.insertMany({ANNOUNCEMENT_ID:ANNOUNCEMENT_ID,ANNOUNCEMENT_TYPE:type,FLAG:1})
            res.send("Announcement type Inserted Successfully")
         }
      }
      catch(error){
            res.status(404).send("error")
      }
}


const api_delete=async(req,res)=>{
      try{
            const ANNOUNCEMENT_ID=req.body.ANNOUNCEMENT_ID
            if(ANNOUNCEMENT_ID==null){
               res.send("please enter type")
            }
            else{
             
               const delete_data=await ann_cont.deleteMany({ANNOUNCEMENT_ID:ANNOUNCEMENT_ID})
               res.send("Announcement type Deleted Successfully")
            }
         }
         catch(error){
           // console.log(error)
               res.status(404).send("error")
         }

}

const api_search=async(req,res)=>{
      try{
            const type=req.body.ANNOUNCEMENT_TYPE
            if(type==null){
               res.send("please enter type")
            }
            else{
             
               const find_data=await ann_cont.find({ANNOUNCEMENT_TYPE:/type/})
               res.send(find_data)
            }
         }
         catch(error){
               res.status(404).send("error")
         }

}


const api_update=async(req,res)=>{
      try{
            const id=req.query.id
            const type=req.body.ANNOUNCEMENT_TYPE
            const flag=req.body.FLAG
            if(id==null){
               res.send("please enter type")
            }
            else{
             
               const update_data=await ann_cont.findOneAndUpdate({ANNOUNCEMENT_ID:id},{$set:{ANNOUNCEMENT_TYPE:type,FLAG:flag}})
               res.send("Announcement type Updated Successfully")
            }
         }
         catch(error){
               // console.log(error)
               res.status(404).send("error")
         }

}

const index=async(req,res)=>{
      try{
        const all_data=await ann_cont.find({})
        res.send(all_data)
      }
      catch(error){
        res.status(404).send("error")
      }

}


module.exports={
      api_create,api_delete,api_search,api_update,index
}