const stock_controller=require('../model/packing_sku_master')

const create_sku=async(req,res)=>{
    try{
        const SKU_ID=req.body.SKU_ID
        const SKU_DESCRIPTION = req.body.SKU_DESCRIPTION
        const UNIT_ID  = req.body.UNIT_ID
        const FACTOR = req.body.FACTOR
       const GROUP_ID  = req.body.GROUP_ID
       const SKU_CATEGORY  = req.body.SKU_CATEGORY
        const FLAG =req.body.FLAG
        for(i=0;i<SKU_ID.length;i++){
            const add_data=await stock_controller.findOneAndUpdate({GROUP_ID:GROUP_ID[i]},{$set:{SKU_ID:SKU_ID[i],SKU_DESCRIPTION:SKU_DESCRIPTION[i],UNIT_ID:UNIT_ID[i],FACTOR:FACTOR[i],SKU_CATEGORY:SKU_CATEGORY[i],FLAG:FLAG[i],GROUP_ID:GROUP_ID[i]}},{upsert:true})

        }
        res.send("inserted")
    }
    catch(error){
        res.status(404).send(error)
    }
}

module.exports={create_sku}