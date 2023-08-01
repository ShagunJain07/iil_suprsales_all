const router = require("express").Router();

const controller=require("../controller/Beat_Plan")


router.post("/createBeatPlanMob.php",controller.createBeatPlanMob)


module.exports=router
