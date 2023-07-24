const router = require("express").Router();

const controller=require("../controller/Area")

router.get("/allArea", controller.allArea);
router.post("/api-create",controller.api_create)
router.get("/getArea",controller.getArea)
router.post("/api-update",controller.api_update)

module.exports=router
