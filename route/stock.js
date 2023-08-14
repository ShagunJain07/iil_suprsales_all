const router = require("express").Router();

const controller=require("../controller/stock")

router.post("/create-sku", controller.create_sku);

module.exports=router
