const router = require("express").Router();

const controller=require("../controller/authorization")

router.get("/get-auth",controller.get_auths);
// router.get("/get",controller.get_data)
// router.get("/login",controller.login)

module.exports=router
