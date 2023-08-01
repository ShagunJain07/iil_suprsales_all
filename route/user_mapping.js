const router = require("express").Router();

const controller=require("../controller/user_mapping")

router.post("/api_create", controller.api_create);
router.get("/all_roles",controller.all_roles)
router.post("/api_update",controller.api_update)
router.delete("/api_delete",controller.api_delete)
router.get("/getEmpWithNoRole",controller.getEmpWithNoRole)
router.get("/index",controller.index)
module.exports=router
