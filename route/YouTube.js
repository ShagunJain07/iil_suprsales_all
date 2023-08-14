const router = require("express").Router();

const controller=require("../controller/YouTube")



router.post("/createYoutubeDetail",controller.createYoutubeDetail)


module.exports=router
