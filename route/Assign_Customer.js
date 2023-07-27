const router = require("express").Router();

const controller=require("../controller/Assign_Customer")


router.post("/assign",controller.assign)
router.get("/selectFarmer",controller.selectFarmer)
router.get("/selectRetailer",controller.selectRetailer)

module.exports=router
