const router = require("express").Router();

const controller=require("../controller/level")

router.post("/createLevel", controller.createLevel);
router.post("/createLevelExpRates",controller.createLevelExpRates)
router.get("/getEmpLevelExpRates",controller.getEmpLevelExpRates)
router.get("/getEmployeeLevelExpRatesMob",controller.getEmployeeLevelExpRatesMob)
router.get("/getGlobalSettingMob",controller.getGlobalSettingMob)
router.get("/getLevel",controller.getLevel)
router.get("/getLevelExpRates",controller.getLevelExpRates)
router.post("/globalSetting",controller.globalSetting)
router.post("/updateEmpLevelExpRates",controller.updateEmpLevelExpRates)
module.exports=router
