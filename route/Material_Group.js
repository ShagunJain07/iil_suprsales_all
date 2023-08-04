const router = require("express").Router();

const controller=require("../controller/Material_Group")


router.get("/getMaterialGroup",controller.getMaterialGroup)
router.post("/updateMaterialGroup",controller.updateMaterialGroup)
module.exports=router
