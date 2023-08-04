const packing_sku_master=require("../model/packing_sku_master")
const material_group_master=require("../model/material_group_master")
const category_master=require("../model/category_master")


const getMaterialGroup=async(req,res)=>{
      try{
            const array1=[]
         const material_data=await material_group_master.find({})
         for(i=0;i<material_data.length;i++){
            const category_data=await category_master.find({CATEGORY_ID:material_data[i].CATEGORY_ID})
            const packing_data=await packing_sku_master.find({GROUP_ID:material_data[i].GROUP_ID}).count()
            //console.log(packing_data)
            const obj1={
                  "GROUP_ID":material_data[i].GROUP_ID,
                   "GROUP_NAME":material_data[i].GROUP_NAME, 
                   "CATEGORY_ID":material_data[i].CATEGORY_ID,
                   "CATEGORY":category_data[0].CATEGORY_NAME,
                   "SKU":packing_data,
                   "FLAG":material_data[i].FLAG
            }
            array1.push(obj1)
         }
         res.send(array1)
      }
      catch(error){
            console.log(error)
            res.status(404).send("error")
      }
}

const updateMaterialGroup=async(req,res)=>{
      try{

            const G_ID=req.query.id
            const GROUP_ID=req.body.GROUP_ID
            const GROUP_NAME=req.body.GROUP_NAME
            const FLAG=req.body.FLAG

            const material_update=await material_group_master.findOneAndUpdate({GROUP_ID:G_ID},{$set:{GROUP_ID:GROUP_ID,GROUP_NAME:GROUP_NAME,FLAG:FLAG}})

            await packing_sku_master.findOneAndUpdate({GROUP_ID:G_ID},{$set:{GROUP_ID:GROUP_ID}})

            res.send("Group Updated Successfully")
      }
      catch(error){
            res.status(404).send("error")
      }
}
module.exports={
      getMaterialGroup,updateMaterialGroup
}