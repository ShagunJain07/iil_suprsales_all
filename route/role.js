const router = require("express").Router();

const controller=require("../controller/role")

router.post("/api_create", controller.api_create);
router.post("/api_update", controller.api_update);
router.get("/index",controller.index)
module.exports=router
