const router = require("express").Router();

const controller=require("../controller/Beat_Plan")


router.post("/createBeatPlanMob.php",controller.createBeatPlanMob)
router.post("/createBeatPlan",controller.createBeatPlan)
router.post("/beatplanupdate",controller.beatplanupdate)
router.get("/getBeatPlanByEmp",controller.getBeatPlanByEmp)
router.get("/getBeatPlanByEmpId",controller.getBeatPlanByEmpId)
router.get("/getbeatplancustomer",controller.getbeatplancustomer)
router.post("/updateBeatPlan",controller.updateBeatPlan)


module.exports=router
