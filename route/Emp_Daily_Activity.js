const router = require("express").Router();
const path = require('path');
const multer = require('multer');
const controller=require("../controller/Emp_Daily_Activity")

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
    // console.log("nameee",file)
    
        cb(null, path.join(path.dirname(__dirname), 'images'));
      },
      filename: function (req, file, cb) {
        cb(null,file.originalname);
      },
    });
    
const upload = multer({ storage: storage });


router.post(
      '/createEmpDailyActivityMob.php',
      upload.fields([{ name: 'IMAGE1', maxCount: 1 }, { name: 'IMAGE2', maxCount: 1}]),
      controller.createEmpDailyActivityMob
    );

    router.get("/getDailyActivityDetailMob.php",controller.getDailyActivityDetailMob)
    module.exports=router
