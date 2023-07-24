const router = require("express").Router();

const controller=require("../controller/Assign_Customer")


router.post("/assign",controller.assign)

module.exports=router
