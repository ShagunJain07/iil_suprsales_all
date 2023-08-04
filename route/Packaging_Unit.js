const router = require("express").Router();

const controller=require("../controller/Packaging_Unit")


router.get("/index",controller.index)
module.exports=router
