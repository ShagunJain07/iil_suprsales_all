const ann_cont=require("../model/announcement_type_master")
const emp_region_mapping_controller=require("../model/emp_region_mapping")
const announcement_master=require("../model/announcement_master")
const emp_master=require("../model/employee_master")
const distributor_master=require("../model/distributor_master")
const region_master=require("../model/region_master")


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

const getAnnouncementByRegion=async(req,res)=>{
   try{
      // console.log("inside")
    const output_array=[]
    const EMP_ID=req.query.id
    const IDENTITY_FLAG=req.query.flag
    
    if(IDENTITY_FLAG==1){
      // console.log("inside 1")
      const region_array=[]
      const region=await emp_region_mapping_controller.find({EMP_ID:EMP_ID})
      for(j=0;j<region.length;j++){
         region_array.push(region[j].REGION_ID)
      }
      const announcement_data=await announcement_master.find({REGION_ID:{$in:region_array},IDENTITY_FLAG:1})
      if(announcement_data.length==0){
         res.send("no announcement found")
      }
      else{
      for(i-0;i<announcement_data.length;i++){
         const announcement_type=await ann_cont.find({ANNOUNCEMENT_ID:announcement_data[i].ANNOUNCEMENT_ID})
         const region_name=await region_master.find({REGION_ID:announcement_data[i].REGION_ID})
         const get_data={
            "ANNOUNCEMENT_ID":announcement_data[i].ANNOUNCEMENT_ID,
            "TITLE":announcement_data[i].TITLE,
            "ANNOUNCE_ID":announcement_data[i].ANNOUNCE_ID,
            "TYPE":announcement_type[0].ANNOUNCEMENT_TYPE,
            "DESCRIPTION":announcement_data[i].DESCRIPTION,
            "VALID_FROM":announcement_data[i].VALID_FROM,
            "VALID_TILL":announcement_data[i].VALID_TILL,
            "IMAGE":announcement_data[i].IMAGE,
            "PDF":announcement_data[i].PDF,
            "REGION_NAME":region_name[0].REGION_NAME,
            "REGION_ID":announcement_data[i].REGION_ID,
            "FLAG":announcement_data[i].FLAG
         }
         output_array.push(get_data)
      }
      res.send(output_array)
   }
    }

    else if(IDENTITY_FLAG==2){
      // console.log("inside 2")
      const region_array=[]
      const region=await distributor_master.find({DISTRIBUTOR_ID:EMP_ID})
      for(j=0;j<region.length;j++){
         region_array.push(region[j].REGION_ID)
      }
      const announcement_data=await announcement_master.find({REGION_ID:{$in:region_array},IDENTITY_FLAG:2})
      if(announcement_data.length==0){
         res.send("no announcement found")
      }
      else{
      for(i-0;i<announcement_data.length;i++){
         const announcement_type=await ann_cont.find({ANNOUNCEMENT_ID:announcement_data[i].ANNOUNCEMENT_ID})
         const region_name=await region_master.find({REGION_ID:announcement_data[i].REGION_ID})
         const get_data={
            "ANNOUNCEMENT_ID":announcement_data[i].ANNOUNCEMENT_ID,
            "TITLE":announcement_data[i].TITLE,
            "ANNOUNCE_ID":announcement_data[i].ANNOUNCE_ID,
            "TYPE":announcement_type[0].ANNOUNCEMENT_TYPE,
            "DESCRIPTION":announcement_data[i].DESCRIPTION,
            "VALID_FROM":announcement_data[i].VALID_FROM,
            "VALID_TILL":announcement_data[i].VALID_TILL,
            "IMAGE":announcement_data[i].IMAGE,
            "PDF":announcement_data[i].PDF,
            "REGION_NAME":region_name[0].REGION_NAME,
            "REGION_ID":announcement_data[i].REGION_ID,
            "FLAG":announcement_data[i].FLAG
         }
         output_array.push(get_data)
      }
      res.send(output_array)
   }
    }
   }
   catch(error){
      res.status(404).send("error")
   }
}

const api_create_ann=async(req,res)=>{
   try{
      const total_count=await announcement_master.countDocuments({})

      const number_ann=total_count+1
       const body_to_send={
         ...req.body,...{ANNOUNCE_ID:number_ann,PDF:req.files.pdf[0].originalname,IMAGE:req.files.image[0].originalname}
       }

       const add_announcement=await announcement_master.insertMany(body_to_send)
       res.send("Announcement Inserted Successfully")
   }
   catch(error){
      res.status(404).send("error")
   }

}


const api_delete_ann=async(req,res)=>{
   try{
     const title=req.body.TITLE
     const to_delete_ann=await announcement_master.deleteMany({TITLE:title})
     res.send("Announcement Deleted Successfully")
   }
   catch(error){
    res.status(404).send("error")
   }
}

const api_search_ann=async(req,res)=>{
   try{
     const title=req.body.TITLE
     const to_found_ann=await announcement_master.find({TITLE:title})
if(to_found_ann.length==0){
   res.send("no announcement found")
}
else{
     res.send(to_found_ann)
   }
}
   catch(error){
      res.status(404).send("error")

   }
}


const api_update_ann=async(req,res)=>{
   try{
     const ANNOUNCE_ID=req.query.id
     const found_data=await announcement_master.find({ANNOUNCE_ID:ANNOUNCE_ID})
     //console.log(found_data)
     if(found_data.length==0){
      res.send("no announcement found")
     }
     else{
     const body_to_send={
      ...req.body,...{PDF:req.files.pdf[0].originalname,IMAGE:req.files.image[0].originalname}
    }
    //console.log(body_to_send)
    const add_announcement=await announcement_master.findOneAndUpdate({ANNOUNCE_ID:ANNOUNCE_ID},{$set:body_to_send})
    res.send("Announcement Updated Successfully") 
   }
}
   catch(error){

   }
}


const getAnnouncementMob=async(req,res)=>{
   try{
      // console.log("inside")
    const output_array=[]
    const EMP_ID=req.query.id
    const IDENTITY_FLAG=req.query.flag
    
    if(IDENTITY_FLAG==1){
      const region_array=[]
      // console.log("inside 1")
      const region=await emp_region_mapping_controller.find({EMP_ID:EMP_ID})
      for(j=0;j<region.length;j++){
         region_array.push(region[j].REGION_ID)
      }
      const announcement_data=await announcement_master.find({REGION_ID:{$in:region_array},IDENTITY_FLAG:1})
      if(announcement_data.length==0){
         res.send("no announcement found")
      }
      else{
      for(i-0;i<announcement_data.length;i++){
         const total=announcement_data.length
         const announcement_type=await ann_cont.find({ANNOUNCEMENT_ID:announcement_data[i].ANNOUNCEMENT_ID})
         const region_name=await region_master.find({REGION_ID:announcement_data[i].REGION_ID})
         const get_data={
            "ANNOUNCEMENT_ID":announcement_data[i].ANNOUNCEMENT_ID,
            "TITLE":announcement_data[i].TITLE,
            "ANNOUNCE_ID":announcement_data[i].ANNOUNCE_ID,
            "TYPE":announcement_type[0].ANNOUNCEMENT_TYPE,
            "DESCRIPTION":announcement_data[i].DESCRIPTION,
            "VALID_FROM":announcement_data[i].VALID_FROM,
            "VALID_TILL":announcement_data[i].VALID_TILL,
            "IMAGE":announcement_data[i].IMAGE,
            "PDF":announcement_data[i].PDF,
            "REGION_NAME":region_name[0].REGION_NAME,
            "REGION_ID":announcement_data[i].REGION_ID,
            "FLAG":announcement_data[i].FLAG,
            "COUNT":total
         }
         output_array.push(get_data)
      }
      res.send(output_array)
   }

    }

    else if(IDENTITY_FLAG==2){
      // console.log("inside 2")
      const region_array=[]
      const region=await distributor_master.find({DISTRIBUTOR_ID:EMP_ID})
      for(j=0;j<region.length;j++){
         region_array.push(region[j].REGION_ID)
      }
      const announcement_data=await announcement_master.find({REGION_ID:{$in:region_array},IDENTITY_FLAG:2})
      if(announcement_data.length==0){
         res.send("no announcement found")
      }
      else{
      for(i-0;i<announcement_data.length;i++){
         const total=announcement_data.length
         const announcement_type=await ann_cont.find({ANNOUNCEMENT_ID:announcement_data[i].ANNOUNCEMENT_ID})
         const region_name=await region_master.find({REGION_ID:announcement_data[i].REGION_ID})
         const get_data={
            "ANNOUNCEMENT_ID":announcement_data[i].ANNOUNCEMENT_ID,
            "TITLE":announcement_data[i].TITLE,
            "ANNOUNCE_ID":announcement_data[i].ANNOUNCE_ID,
            "TYPE":announcement_type[0].ANNOUNCEMENT_TYPE,
            "DESCRIPTION":announcement_data[i].DESCRIPTION,
            "VALID_FROM":announcement_data[i].VALID_FROM,
            "VALID_TILL":announcement_data[i].VALID_TILL,
            "IMAGE":announcement_data[i].IMAGE,
            "PDF":announcement_data[i].PDF,
            "REGION_NAME":region_name[0].REGION_NAME,
            "REGION_ID":announcement_data[i].REGION_ID,
            "FLAG":announcement_data[i].FLAG,
            "COUNT":total
         }
         output_array.push(get_data)
      }
      res.send(output_array)
   }
    }
   }
   catch(error){
      res.status(404).send("error")
   }
}


const index_ann=async(req,res)=>{
   try{
      const output_array=[]
      const announcement_data=await announcement_master.find({})
      if(announcement_data.length==0){
         res.send("no announcement found")
      }
      else{
      for(i-0;i<announcement_data.length;i++){
         const announcement_type=await ann_cont.find({ANNOUNCEMENT_ID:announcement_data[i].ANNOUNCEMENT_ID})
         const region_name=await region_master.find({REGION_ID:announcement_data[i].REGION_ID})
         const get_data={
            "ANNOUNCEMENT_ID":announcement_data[i].ANNOUNCEMENT_ID,
            "TITLE":announcement_data[i].TITLE,
            "ANNOUNCE_ID":announcement_data[i].ANNOUNCE_ID,
            "TYPE":announcement_type[0].ANNOUNCEMENT_TYPE,
            "DESCRIPTION":announcement_data[i].DESCRIPTION,
            "VALID_FROM":announcement_data[i].VALID_FROM,
            "VALID_TILL":announcement_data[i].VALID_TILL,
            "IMAGE":announcement_data[i].IMAGE,
            "PDF":announcement_data[i].PDF,
            "REGION_NAME":region_name[0].REGION_NAME,
            "REGION_ID":announcement_data[i].REGION_ID,
            "FLAG":announcement_data[i].FLAG         }
         output_array.push(get_data)
      }
      res.send(output_array)
   
    }
   

   }
   catch(error){
      res.status(404).send("error")
   }
}
module.exports={
   index_ann,getAnnouncementMob,api_create,api_delete,api_search,api_update,api_update_ann,index,getAnnouncementByRegion,api_create_ann,api_delete_ann,api_search_ann
}