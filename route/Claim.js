const router = require("express").Router();

const controller=require("../controller/Claim")

router.post("/createClaimMob", controller.create_claim_Mob);
router.post("/approveClaim",controller.approveClaim);
router.get("/deleteClaimMob",controller.deleteClaimMob)
 router.get("/getAllClaim",controller.getAllClaim)

module.exports=router
