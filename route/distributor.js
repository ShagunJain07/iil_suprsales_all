const router = require("express").Router();

const controller=require("../controller/distributor")

router.post("/create-distributor", controller.add_data);
router.get("/get",controller.get_data)
router.get("/login",controller.login)

module.exports=router
