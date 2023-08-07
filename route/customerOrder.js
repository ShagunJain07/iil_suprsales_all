const router = require("express").Router();

const controller=require("../controller/customerOrder")


router.post("/createOrder",controller.createOrder)
router.post("/createOrderMob.php",controller.createOrderMob)
router.get("/getCustomerOrder",controller.getCustomerOrder)
router.get("/getCustomerOrderByCustID",controller.getCustomerOrderByCustID)
router.get("/getCustomerOrderByCustIDMob.php",controller.getCustomerOrderByCustIDMob)
router.get("/getCustomerOrderByEmpIDMob.php",controller.getCustomerOrderByEmpIDMob)
router.get("/getCustomerOrderDetail",controller.getCustomerOrderDetail)


module.exports=router
