const router = require("express").Router();

const controller=require("../controller/Task")
const path = require('path');
const multer = require('multer');
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

router.get("/assignedTaskPriorityChart",controller.assignedTaskPriorityChart)
router.get("/assignedTaskStatusChart",controller.assignedTaskStatusChart)
router.get("/assignedTeamStatusChart",controller.assignedTeamStatusChart)
router.post("/createActivity",controller.createActivity)
router.post("/createActivityMob.php",controller.createActivityMob)
router.post("/createTask",controller.createTask)
router.post("/createTaskMob.php",controller.createTaskMob)
router.delete("/deleteActivityMob.php",controller.deleteActivityMob)
router.delete("/deleteTaskMob.php",controller.deleteTaskMob)
router.get("/deligatedTaskPriorityChart",controller.deligatedTaskPriorityChart)
router.get("/deligatedTaskStatusChart",controller.deligatedTaskStatusChart)
router.get("/deligatedTeamStatusChart",controller.deligatedTeamStatusChart)
router.get("/getAllActivityByEmpMob.php",controller.getAllActivityByEmpMob)
router.get("/getTaskByEmp",controller.getTaskByEmp)
router.get("/getTaskDetail",controller.getTaskDetail)
router.get("/getMyDeligatedTask",controller.getMyDeligatedTask)
router.get("/getMyAssignedTask",controller.getMyAssignedTask)
router.get("/updateTask",controller.updateTask)

router.post(
      '/uploadTaskAttachmentMob.php',
      upload.fields([{ name: 'TASK_ATTACHMENT', maxCount: 10 }]),
      controller.uploadTaskAttachmentMob
    );

    router.post(
      '/uploadActivityAttachmentMob.php',
      upload.fields([{ name: 'ACTIVITY_ATTACHMENT', maxCount: 10 }]),
      controller.uploadActivityAttachmentMob
    );
    router.post(
      '/uploadTaskAttachment',
      upload.fields([{ name: 'TASK_ATTACHMENT', maxCount: 10 }]),
      controller.uploadTaskAttachment
    );

    router.post(
      '/uploadActivityAttachment',
      upload.fields([{ name: 'ACTIVITY_ATTACHMENT', maxCount: 10 }]),
      controller.uploadActivityAttachment
    );
module.exports=router
