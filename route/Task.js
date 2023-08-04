const router = require("express").Router();

const controller=require("../controller/Task")


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


module.exports=router
