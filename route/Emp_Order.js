const router = require("express").Router();

const controller=require("../controller/Emp_Order")


router.post("/createOrder",controller.createOrder)


module.exports=router
