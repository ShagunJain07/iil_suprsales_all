const router = require("express").Router();

const controller=require("../controller/customer")

router.post("/api-update",controller.api_update)
router.post("/customer-balance",controller.create_customer_balance)
router.post("/create-distributor",controller.create_distributor)
router.post("/create-farmer",controller.create_farmer)
router.post("/create_one_distributor",controller.create_one_distributor)
router.post("/create_one_farmer",controller.create_one_farmer)
router.post("/create_one_retailer",controller.create_one_retailer)
router.get("/customer_login",controller.customer_login)
router.get("/employee_customer_array",controller.employee_customer_array)
router.post("/customerLoginMob.php",controller.customerLoginMob)
router.get("/index",controller.index)

module.exports=router
