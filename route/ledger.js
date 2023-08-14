const router = require("express").Router();

const controller=require("../controller/ledger")

router.get("/openingBalance",controller.openingBalance)
 router.get("/viewLedgerMob.php",controller.viewLedgerMob)
router.get("/viewLedgerCustomer",controller.viewLedgerCustomer)
module.exports=router
