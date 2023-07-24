const router = require("express").Router();

const controller=require("../controller/Admin")

router.get("/index", controller.index);


module.exports=router
