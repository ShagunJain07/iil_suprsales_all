const router = require("express").Router();

const controller=require("../controller/customer_Dashboard")

 router.get("/getAgingByCustId", controller.getAgingByCustId);
 router.post("/add_balance",controller.add_balance)
 router.get("/getCustomerByCustId",controller.getCustomerByCustId)
router.post("/add_data",controller.invoice_data)
router.get("/currentVsLastSales",controller.currentVsLastSales)
router.get("/currentVsLastSalesMob.php",controller.currentVsLastSalesMob)
router.get("/graph_product",controller.graph_product)
router.get("/monthlySalesMob.php",controller.monthlySalesMob)
router.get("/salesBySkuCategory",controller.salesBySkuCategory)
router.get("/skuBySkuCategory",controller.skuBySkuCategory)
router.get("/topmost_product",controller.topmost_product)
router.get("/salesBySkuCategoryMob.php",controller.salesBySkuCategoryMob)
router.get("/getAllSkuCatgory",controller.getAllSkuCatgory)
router.get("/getLedgerByCustIdMob.php",controller.getLedgerByCustIdMob)
router.get("/getCustomerDetailById",controller.getCustomerDetailById)
router.get("/getLedgerByCustId",controller.getLedgerByCustId)
router.get("/getAgingByCustIdMob.php", controller.getAgingByCustIdMob);
router.get("/salesByMonthAndCategoryMob.php",controller.salesByMonthAndCategoryMob)
router.get("/viewLedgerMob.php",controller.viewLedgerMob)

 module.exports=router
