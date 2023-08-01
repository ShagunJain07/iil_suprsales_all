const authorization_master=require("../model/authorization_master_tab")
const auth=require("../model/auth")

const get_auths=async(req,res)=>{
      const all_data=await authorization_master.find({})
      res.send(all_data)
}
module.exports={
      get_auths
}