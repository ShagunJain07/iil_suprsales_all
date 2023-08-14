const youtube_master=require("../model/youtube_master")
const region_youtube_mapping=require("../model/region_youtube_mapping")
const emp_customer_mapping=require("../model/emp_customer_mapping")
const emp_region_mapping=require("../model/emp_region_mapping")
const createYoutubeDetail=async(req,res)=>{
      try{

            const YOUTUBE_LINK=req.body.YOUTUBE_LINK
            const DATE=req.body.DATE
            const HEADER=req.body.HEADER
            const REGION_ID=req.body.REGION_ID  //array
            const YOUTUBE_ID = YOUTUBE_LINK.substr(-11);

            const youtube_data=await youtube_master.insertMany({YOUTUBE_ID:YOUTUBE_ID,HEADER:HEADER,YOUTUBE_LINK:YOUTUBE_LINK,STATUS:1,DATE:DATE})

            for(i=0;i<REGION_ID.length;i++){
                  const add_region_data=await region_youtube_mapping.insertMany({YOUTUBE_ID:YOUTUBE_ID,REGION_ID:REGION_ID[i]})
            }

            res.send("data inserted successfully")
      }
      catch(error){
          //  console.log(error)
            res.status(404).send("error")
      }
}

const getDetails=async(req,res)=>{
      try{
            const CUSTOMER_ID=req.query.id

            const emp_customer_mapping_data=await emp_customer_mapping.find({CUSTOMER_ID:CUSTOMER_ID})

            for(i=0;i<emp_customer_mapping_data.length;i++){
                  const region_data=await emp_region_mapping.find({EMP_ID:emp_customer_mapping_data[i].EMP_ID})
            }


      }
      catch(error){
            console.log(error)
            res.status(404).send("error")
      }
}

module.exports={createYoutubeDetail}