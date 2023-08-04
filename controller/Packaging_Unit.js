const packaging_unit=require("../model/packing_unit_master")
const category_master=require("../model/category_master")

const index=async(req,res)=>{
      try{
            const array1=[]
            const packing_data=await packaging_unit.find({})
           // console.log(packing_data)
            for(i=0;i<packing_data.length;i++){
                  const category_data=await category_master.find({CATEGORY_ID:packing_data[i].CATEGORY_ID})
                 // console.log(category_data)
                  if(category_data.length==0){
                        const obj1={
                              "UNIT_VALUE":packing_data[i].UNIT_VALUE,
                              "UNIT_TYPE":packing_data[i].UNIT_TYPE,
                              "CATEGORY_NAME":""
                        }
                        array1.push(obj1)

                  }
            else{
                  const obj1={
                        "UNIT_VALUE":packing_data[i].UNIT_VALUE,
                        "UNIT_TYPE":packing_data[i].UNIT_TYPE,
                        "CATEGORY_NAME":category_data[0].CATEGORY_NAME
                  }
                  array1.push(obj1)

            }
            }
            res.send(array1)
      }
      catch(error){
            console.log(error)
            res.status(404).send("error")
      }
}

module.exports={index}