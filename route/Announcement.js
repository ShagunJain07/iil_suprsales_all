const router = require("express").Router();
const path = require('path');
const multer = require('multer');
const controller=require("../controller/Announcement")


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
      '/create_announcement/api-create',
      upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1}]),
      controller.api_create_ann
    );

    router.post(
      '/create_announcement/api-update',
      upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1}]),
      controller.api_update_ann
    );

    router.post("/create_announcement/api-delete",controller.api_delete_ann)

router.post("/api-create", controller.api_create);
router.post("/api-delete",controller.api_delete)
router.get("/api-search",controller.api_search)
router.get("/create_announcement/api-search",controller.api_search_ann)
router.post("/api-update",controller.api_update)
router.get("/index",controller.index)
router.get("/create_announcement/index",controller.index_ann)

router.get("/create_announcement/getAnnouncementByRegion",controller.getAnnouncementByRegion)
router.get("/create_announcement/getAnnouncementMob.php",controller.getAnnouncementMob)

module.exports=router
