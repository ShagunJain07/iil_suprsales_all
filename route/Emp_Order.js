const router = require("express").Router();

const controller=require("../controller/Emp_Order")


router.post("/createOrder",controller.createOrder)
router.get("/getOrderByLoginEmp",controller.getOrderByLoginEmp)
router.get("/getPlantOrder",controller.getPlantOrder)
router.get("/getOrderByEmp",controller.getOrderByEmp)
router.get("/downloadAllEmpOrder",controller.downloadAllEmpOrder)


module.exports=router
