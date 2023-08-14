const router = require("express").Router();

const controller=require("../controller/Attendance")

router.get("/empattendance",controller.empattendance);
router.get("/getDataByDate",controller.getDataByDate);
router.get("/getDataByDateMob",controller.getDataByDateMob  );


module.exports=router
