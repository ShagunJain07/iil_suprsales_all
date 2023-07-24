const router = require("express").Router();

const controller=require("../controller/Announcement")

router.post("/api-create", controller.api_create);
router.post("/api-delete",controller.api_delete)
router.get("/api-search",controller.api_search)
router.post("/api-update",controller.api_update)
router.get("/index",controller.index)

module.exports=router
