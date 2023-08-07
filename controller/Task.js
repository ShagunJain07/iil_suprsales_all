const task_master = require("../model/task_master")
const task_assignment = require("../model/task_assignment")
const employee_master = require("../model/employee_master")
const activity_master = require("../model/activity_master")
const task_activity_mapping = require("../model/task_activity_mapping")
const activity_owner_master = require("../model/activity_owner_master")
const activity_deligation_master = require("../model/activity_deligation_master")
const task_attachment = require("../model/task_attachment")
const activity_attachment=require("../model/activity_attachment")
const assignedTaskPriorityChart = async (req, res) => {

      try {
            const ASSIGNED_TO = req.query.id
            const array1 = []
            const assigned_to_find = await task_assignment.find({ ASSIGNED_TO: ASSIGNED_TO }, { _id: 0 })

            for (i = 0; i < assigned_to_find.length; i++) {
                  array1.push(assigned_to_find[i].TASK_ID)
            }
            //console.log(array1)
            const high_priority = await task_master.find({ TASK_ID: { $in: array1 }, PRIORITY: 0 }).countDocuments()
            const medium_priority = await task_master.find({ TASK_ID: { $in: array1 }, PRIORITY: 1 }).countDocuments()
            const low_priority = await task_master.find({ TASK_ID: { $in: array1 }, PRIORITY: 2 }).countDocuments()

            const obj1 = [{
                  "HIGH": high_priority,
                  "MEDIUM": medium_priority,
                  "LOW": low_priority
            }]

            res.send(obj1)

      }
      catch (error) {
            console.log(error)
            res.status(404).send("error")
      }
}


const assignedTaskStatusChart = async (req, res) => {
      try {
            const array1 = []

            const ASSIGNED_TO = req.query.id
            const current = Date.now();
            const assigned_to_find = await task_assignment.find({ ASSIGNED_TO: ASSIGNED_TO }, { _id: 0 })
            for (i = 0; i < assigned_to_find.length; i++) {
                  array1.push(assigned_to_find[i].TASK_ID)
            }
            //console.log(array1)
            const total = await task_master.find({ TASK_ID: { $in: array1 } }).countDocuments()
            const LATE = await task_master.find({ TASK_ID: { $in: array1 }, DUE_DATE: { $lt: current } }).countDocuments()
            const NOT_STARTED = await task_master.find({ TASK_ID: { $in: array1 }, COMPLETION_STATUS: 0, DUE_DATE: { $lte: current } }).countDocuments()
            const COMPLETED = await task_master.find({ TASK_ID: { $in: array1 }, COMPLETION_STATUS: 100, DUE_DATE: { $gte: current } }).countDocuments()
            const IN_PROGRESS = await task_master.find({ TASK_ID: { $in: array1 }, COMPLETION_STATUS: { $lt: 99, $gt: 1 }, DUE_DATE: { $gte: current } }).countDocuments()

            const obj1 = [{
                  "TOTAL": total,
                  "LATE": LATE,
                  "NOT_STARTED": NOT_STARTED,
                  "COMPLETED": COMPLETED,
                  "IN_PROGRESS": IN_PROGRESS
            }]

            res.send(obj1)



      }
      catch (error) {
            console.log(error)
            res.status(404).send("error")
      }
}

const assignedTeamStatusChart = async (req, res) => {
      try {
            const array1 = []
            const all_status = []
            const ASSIGNED_TO = req.query.id
            const current = Date.now();

            const assigned_to_find = await task_assignment.find({ ASSIGNED_TO: ASSIGNED_TO }, { _id: 0 })
            const emp_data = await employee_master.find({ EMP_ID: ASSIGNED_TO })

            const obj1 = [{
                  "ASSIGNED_TO": ASSIGNED_TO,
                  "EMP_NAME": emp_data[0].EMP_NAME,
                  "STATUS": []
            }]
            for (i = 0; i < assigned_to_find.length; i++) {
                  array1.push(assigned_to_find[i].TASK_ID)
            }

            const total = await task_master.find({ TASK_ID: { $in: array1 } }).countDocuments()
            const LATE = await task_master.find({ TASK_ID: { $in: array1 }, DUE_DATE: { $lt: current } }).countDocuments()
            const NOT_STARTED = await task_master.find({ TASK_ID: { $in: array1 }, COMPLETION_STATUS: 0, DUE_DATE: { $lte: current } }).countDocuments()
            const COMPLETED = await task_master.find({ TASK_ID: { $in: array1 }, COMPLETION_STATUS: 100, DUE_DATE: { $gte: current } }).countDocuments()
            const IN_PROGRESS = await task_master.find({ TASK_ID: { $in: array1 }, COMPLETION_STATUS: { $lt: 99, $gt: 1 }, DUE_DATE: { $gte: current } }).countDocuments()

            const obj12 = {
                  "TOTAL": total,
                  "LATE": LATE,
                  "NOT_STARTED": NOT_STARTED,
                  "COMPLETED": COMPLETED,
                  "IN_PROGRESS": IN_PROGRESS
            }
            obj1[0].STATUS.push(obj12)
            res.send(obj1)

      }
      catch (error) {
            //console.log(error)
            res.status(404).send("error")
      }
}

const createActivity = async (req, res) => {
      try {
            const TASK_ID = req.query.id
            const all_status = []
            const ACTIVITY_HEADER = req.body.ACTIVITY_HEADER
            const ACTIVITY_DESCRIPTION = req.body.ACTIVITY_DESCRIPTION
            const ACTIVITY_OWNER = req.body.ACTIVITY_OWNER // ARRAY
            const START_DATE = req.body.START_DATE
            const DUE_DATE = req.body.DUE_DATE
            const activity_count_no = await activity_master.countDocuments()
            const new_count_activity = activity_count_no + 1
            const activity_data = await activity_master.insertMany({ ACTIVITY_ID: new_count_activity, ACTIVITY_HEADER: ACTIVITY_HEADER, ACTIVITY_DESCRIPTION: ACTIVITY_DESCRIPTION, START_DATE: START_DATE, DUE_DATE: DUE_DATE, COMPLETION_STATUS: 0, DELIGATION_STATUS: 0, FLAG: 1 })

            const activity_count = await task_activity_mapping.countDocuments()

            const new_count = activity_count + 1

            const task_activity_mapping_data = await task_activity_mapping.insertMany({ ACTIVITY_ID: new_count, TASK_ID: TASK_ID })

            const task_data = await task_activity_mapping.find({ ACTIVITY_ID: new_count }, { TASK_ID: 1, _id: 0 })

            const task_activity_data = await task_activity_mapping.find({ TASK_ID: task_data[0].TASK_ID })
            const activity_get = await activity_master.find({ ACTIVITY_ID: task_activity_data[0].ACTIVITY_ID, FLAG: 1 })
            // console.log(activity_get)
            for (i = 0; i < activity_get.length; i++) {
                  const ACT_ID = activity_get[i].ACTIVITY_ID
                  // console.log(ACT_ID
                  //        )
                  const completion_status = await activity_master.find({ ACTIVITY_ID: ACT_ID })
                  //console.log(completion_status)

                  all_status.push(completion_status[0].COMPLETION_STATUS)
            }
            let sum = 0;
            for (let i = 0; i < all_status.length; i++) {
                  sum += all_status[i];
            }
            const TASK_STATUS = sum / activity_get.length

            const update_task_master = await task_master.findOneAndUpdate({ TASK_ID: TASK_ID }, { $set: { COMPLETION_STATUS: TASK_STATUS } })

            for (j = 0; j < ACTIVITY_OWNER.length; j++) {
                  const activity_owner_master_data = await activity_owner_master.insertMany({ ACTIVITY_ID: new_count, ACTIVITY_OWNER: ACTIVITY_OWNER[j] })
            }

            res.send("Task Created Successfully")
      }
      catch (error) {
            // console.log(error)
            res.status(404).send("error")
      }
}

const createActivityMob = async (req, res) => {
      try {
            const TASK_ID = req.query.id
            const all_status = []
            const ACTIVITY_HEADER = req.body.ACTIVITY_HEADER
            const ACTIVITY_DESCRIPTION = req.body.ACTIVITY_DESCRIPTION
            const ACTIVITY_OWNER = req.body.ACTIVITY_OWNER // ARRAY
            const START_DATE = req.body.START_DATE
            const DUE_DATE = req.body.DUE_DATE
            const activity_count_no = await activity_master.countDocuments()
            const new_count_activity = activity_count_no + 1
            const activity_data = await activity_master.insertMany({ ACTIVITY_ID: new_count_activity, ACTIVITY_HEADER: ACTIVITY_HEADER, ACTIVITY_DESCRIPTION: ACTIVITY_DESCRIPTION, START_DATE: START_DATE, DUE_DATE: DUE_DATE, COMPLETION_STATUS: 0, DELIGATION_STATUS: 0, FLAG: 1 })

            const activity_count = await task_activity_mapping.countDocuments()

            const new_count = activity_count + 1

            const task_activity_mapping_data = await task_activity_mapping.insertMany({ ACTIVITY_ID: new_count, TASK_ID: TASK_ID })

            const task_data = await task_activity_mapping.find({ ACTIVITY_ID: new_count }, { TASK_ID: 1, _id: 0 })

            const task_activity_data = await task_activity_mapping.find({ TASK_ID: task_data[0].TASK_ID })
            const activity_get = await activity_master.find({ ACTIVITY_ID: task_activity_data[0].ACTIVITY_ID, FLAG: 1 })
            // console.log(activity_get)
            for (i = 0; i < activity_get.length; i++) {
                  const ACT_ID = activity_get[i].ACTIVITY_ID
                  // console.log(ACT_ID
                  //        )
                  const completion_status = await activity_master.find({ ACTIVITY_ID: ACT_ID })
                  // console.log(completion_status)

                  all_status.push(completion_status[0].COMPLETION_STATUS)
            }
            let sum = 0;
            for (let i = 0; i < all_status.length; i++) {
                  sum += all_status[i];
            }
            const TASK_STATUS = sum / activity_get.length

            const update_task_master = await task_master.findOneAndUpdate({ TASK_ID: TASK_ID }, { $set: { COMPLETION_STATUS: TASK_STATUS } })

            for (j = 0; j < ACTIVITY_OWNER.length; j++) {
                  const activity_owner_master_data = await activity_owner_master.insertMany({ ACTIVITY_ID: new_count, ACTIVITY_OWNER: ACTIVITY_OWNER[j] })
            }

            res.send("Task Created Successfully")
      }
      catch (error) {
            // console.log(error)
            res.status(404).send("error")
      }
}

const createTask = async (req, res) => {
      try {
            const TASK_NAME = req.body.TASK_NAME
            const PRIORITY = req.body.PRIORITY
            const COLOR = req.body.COLOR
            const CREATED_BY = req.body.CREATED_BY
            const START_DATE = req.body.START_DATE
            const DUE_DATE = req.body.DUE_DATE
            const NOTES = req.body.NOTES
            const ASSIGNED_TOs = req.body.ASSIGNED_TO  //array
            const task_count = await task_master.countDocuments()
            const count_total = task_count + 1
            const task_master_datas = await task_master.insertMany({ TASK_ID: count_total, TASK_NAME: TASK_NAME, PRIORITY: PRIORITY, COLOR: COLOR, CREATED_BY: CREATED_BY, START_DATE: START_DATE, DUE_DATE: DUE_DATE, NOTES: NOTES, COMPLETION_STATUS: 0, FLAG: 1 })

            for (i = 0; i < ASSIGNED_TOs.length; i++) {

                  const task_assignment_data = await task_assignment.insertMany({ TASK_ID: count_total, ASSIGNED_TO: ASSIGNED_TOs[i] })
            }
            res.send("Task Assignment inserted successfully")
      }
      catch (error) {
            console.log(error)
            res.status(404).send("error")
      }
}

const createTaskMob = async (req, res) => {
      try {
            const TASK_NAME = req.body.TASK_NAME
            const PRIORITY = req.body.PRIORITY
            const COLOR = req.body.COLOR
            const CREATED_BY = req.body.CREATED_BY
            const START_DATE = req.body.START_DATE
            const DUE_DATE = req.body.DUE_DATE
            const NOTES = req.body.NOTES
            const ASSIGNED_TOs = req.body.ASSIGNED_TO  //array
            const task_count = await task_master.countDocuments()
            const count_total = task_count + 1
            const task_master_datas = await task_master.insertMany({ TASK_ID: count_total, TASK_NAME: TASK_NAME, PRIORITY: PRIORITY, COLOR: COLOR, CREATED_BY: CREATED_BY, START_DATE: START_DATE, DUE_DATE: DUE_DATE, NOTES: NOTES, COMPLETION_STATUS: 0, FLAG: 1 })

            for (i = 0; i < ASSIGNED_TOs.length; i++) {

                  const task_assignment_data = await task_assignment.insertMany({ TASK_ID: count_total, ASSIGNED_TO: ASSIGNED_TOs[i] })
            }
            res.send("Task Assignment inserted successfully")
      }
      catch (error) {
            //console.log(error)
            res.status(404).send("error")
      }
}

const deleteActivityMob = async (req, res) => {
      try {
            const ACTIVITY_ID = req.query.id

            const update_activity = await activity_master.findOneAndUpdate({ ACTIVITY_ID: ACTIVITY_ID }, { $set: { FLAG: 0 } })
            res.send("Activity Updated Successfully")
      }
      catch (error) {
            //console.log(error)
            res.status(404).send("error")
      }
}

const deleteTaskMob = async (req, res) => {
      try {
            const TASK_ID = req.query.id

            const task_update = await task_master.findOneAndUpdate({ TASK_ID: TASK_ID }, { $set: { FLAG: 0 } })
            res.send("TASK Updated Successfully")
      }
      catch (error) {
            //console.log(error)
            res.status(404).send("error")
      }

}

const deligatedTaskPriorityChart = async (req, res) => {
      try {
            const DELIGATED_TO = req.query.id
            const activity_id = []
            const task_id = []
            const activity_ids = await activity_deligation_master.find({ DELIGATED_TO: DELIGATED_TO }, { ACTIVITY_ID: 1, _id: 0 })

            for (i = 0; i < activity_ids.length; i++) {
                  activity_id.push(activity_ids[i].ACTIVITY_ID)
            }
            const task_ids = await task_activity_mapping.find({ ACTIVITY_ID: { $in: activity_id } })
            for (j = 0; j < activity_ids.length; j++) {
                  task_id.push(task_ids[j].TASK_ID)
            }

            const high = await task_master.find({ TASK_ID: { $in: task_id }, PRIORITY: 0 }).countDocuments()
            const low = await task_master.find({ TASK_ID: { $in: task_id }, PRIORITY: 2 }).countDocuments()
            const medium = await task_master.find({ TASK_ID: { $in: task_id }, PRIORITY: 1 }).countDocuments()

            const obj1 = [{
                  "HIGH": high,
                  "LOW": low,
                  "MEDIUM": medium
            }]
            res.send(obj1)

      }
      catch (error) {
            //console.log(error)
            res.status(404).send("error")
      }
}

const deligatedTaskStatusChart = async (req, res) => {
      try {

            const DELIGATED_TO = req.query.id
            const activity_id = []
            const task_id = []
            const current = Date.now();

            const activity_ids = await activity_deligation_master.find({ DELIGATED_TO: DELIGATED_TO }, { ACTIVITY_ID: 1, _id: 0 })
            // console.log(activity_ids)
            for (i = 0; i < activity_ids.length; i++) {
                  activity_id.push(activity_ids[i].ACTIVITY_ID)
            }
            const task_ids = await task_activity_mapping.find({ ACTIVITY_ID: { $in: activity_id } })
            for (j = 0; j < activity_ids.length; j++) {
                  task_id.push(task_ids[j].TASK_ID)
            }
            //console.log("task_id",task_id)
            const total = await task_master.find({ TASK_ID: { $in: task_id } }).countDocuments()
            const LATE = await task_master.find({ TASK_ID: { $in: task_id }, DUE_DATE: { $lt: current } }).countDocuments()
            const NOT_STARTED = await task_master.find({ TASK_ID: { $in: task_id }, COMPLETION_STATUS: 0, DUE_DATE: { $lte: current } }).countDocuments()
            const COMPLETED = await task_master.find({ TASK_ID: { $in: task_id }, COMPLETION_STATUS: 100, DUE_DATE: { $gte: current } }).countDocuments()
            const IN_PROGRESS = await task_master.find({ TASK_ID: { $in: task_id }, COMPLETION_STATUS: { $lt: 99, $gt: 1 }, DUE_DATE: { $gte: current } }).countDocuments()

            const obj1 = [{
                  "TOTAL": total,
                  "LATE": LATE,
                  "NOT_STARTED": NOT_STARTED,
                  "COMPLETED": COMPLETED,
                  "IN_PROGRESS": IN_PROGRESS
            }]

            res.send(obj1)
      }
      catch (error) {
            //  console.log(error)
            res.status(404).send("error")
      }
}

const deligatedTeamStatusChart = async (req, res) => {
      try {
            const DELIGATED_TO = req.query.id
            const task_ids_assigned = []
            const activity_id = []
            const task_id = []
            const final = []
            const current = Date.now();

            const activity_ids = await activity_deligation_master.find({ DELIGATED_TO: DELIGATED_TO }, { ACTIVITY_ID: 1, _id: 0 })

            for (i = 0; i < activity_ids.length; i++) {
                  activity_id.push(activity_ids[i].ACTIVITY_ID)
            }
            const task_ids = await task_activity_mapping.find({ ACTIVITY_ID: { $in: activity_id } })
            for (j = 0; j < activity_ids.length; j++) {
                  task_id.push(task_ids[j].TASK_ID)
            }
            const assigned_to_find = await task_assignment.find({ TASK_ID: { $in: task_id } }, { _id: 0, ASSIGNED_TO: 1 })
            for (m = 0; m < assigned_to_find.length; m++) {
                  const assigned_to_finds = await task_assignment.find({ ASSIGNED_TO: assigned_to_find[m].ASSIGNED_TO }, { _id: 0, TASK_ID: 1 })
                  for (i = 0; i < assigned_to_finds.length; i++) {
                        task_ids_assigned.push(assigned_to_finds[i].TASK_ID)
                  }
                  const emp_data = await employee_master.find({ EMP_ID: assigned_to_find[m].ASSIGNED_TO }, { EMP_NAME: 1 })

                  const obj1 = {
                        "ASSIGNED_TO": assigned_to_find[m].ASSIGNED_TO,
                        "EMP_NAME": emp_data[0].EMP_NAME,
                        "STATUS": []
                  }

                  const total = await task_master.find({ TASK_ID: { $in: task_ids_assigned } }).countDocuments()
                  const LATE = await task_master.find({ TASK_ID: { $in: task_ids_assigned }, DUE_DATE: { $lt: current } }).countDocuments()
                  const NOT_STARTED = await task_master.find({ TASK_ID: { $in: task_ids_assigned }, COMPLETION_STATUS: 0, DUE_DATE: { $lte: current } }).countDocuments()
                  const COMPLETED = await task_master.find({ TASK_ID: { $in: task_ids_assigned }, COMPLETION_STATUS: 100, DUE_DATE: { $gte: current } }).countDocuments()
                  const IN_PROGRESS = await task_master.find({ TASK_ID: { $in: task_ids_assigned }, COMPLETION_STATUS: { $lt: 99, $gt: 1 }, DUE_DATE: { $gte: current } }).countDocuments()

                  const obj12 = {
                        "TOTAL": total,
                        "LATE": LATE,
                        "NOT_STARTED": NOT_STARTED,
                        "COMPLETED": COMPLETED,
                        "IN_PROGRESS": IN_PROGRESS
                  }
                  obj1.STATUS.push(obj12)
                  final.push(obj1)
            }




            res.send(final)

      }
      catch (error) {
            //  console.log(error)
            res.status(404).send("error")
      }
}

const getAllActivityByEmpMob = async (req, res) => {
      try {

            const EMP_ID = req.query.id
            const array1 = []
            const task_ids = []

            const get_activity_owner = await activity_owner_master.find({ ACTIVITY_OWNER: EMP_ID }, { ACTIVITY_ID: 1, _id: 0 })

            for (i = 0; i < get_activity_owner.length; i++) {

                  array1.push(get_activity_owner[i].ACTIVITY_ID)
            }
            const get_activity_deligation = await activity_deligation_master.find({ DELIGATED_TO: EMP_ID, ACTIVITY_ID: { $nin: array1 } }, { ACTIVITY_ID: 1, _id: 0 })

            for (j = 0; j < get_activity_deligation.length; j++) {

                  const all_task = await task_activity_mapping.find({ ACTIVITY_ID: get_activity_deligation[j].ACTIVITY_ID })

                  const task_master_data = await task_master.find({ TASK_ID: all_task[0].TASK_ID }, { CREATED_BY: 1, _id: 0 })

                  const emp_names = await employee_master.find({ EMP_ID: task_master_data[0].CREATED_BY })

                  const activity_master_data = await activity_master.find({ ACTIVITY_ID: get_activity_deligation[i].ACTIVITY_ID }, { _id: 0 })

                  const obj1 = {
                        ACTIVITY_ID: activity_master_data[0].ACTIVITY_ID,
                        ACTIVITY_HEADER: activity_master_data[0].ACTIVITY_HEADER,
                        ACTIVITY_DESCRIPTION: activity_master_data[0].ACTIVITY_DESCRIPTION,
                        CREATED_BY: emp_names[0].EMP_NAME,
                        START_DATE: activity_master_data[0].START_DATE,
                        COMPLETION_STATUS: activity_master_data[0].COMPLETION_STATUS,
                        DUE_DATE: activity_master_data[0].DUE_DATE,
                        DELIGATION_STATUS: activity_master_data[0].DELIGATION_STATUS,
                        FLAG: activity_master_data[0].FLAG,
                        ASSIGNED_TO: [],
                        DELIGATED_To: []

                  }


                  const activity_deligation_master_datas = await activity_deligation_master.find({ ACTIVITY_ID: get_activity_deligation[i].ACTIVITY_ID }).sort({ DELIGATION_LEVEL: -1 })
                  for (h = 0; h < activity_deligation_master_datas.length; h++) {
                        const empss = await employee_master.find({ EMP_ID: activity_deligation_master_datas[h].DELIGATED_TO })
                        const empss2 = await employee_master.find({ EMP_ID: activity_deligation_master_datas[h].DELIGATION_FROM })
                        const object1 = {
                              DELIGATED_TO: activity_deligation_master_datas[h].DELIGATED_TO,
                              DELIGATION_FROM: activity_deligation_master_datas[h].DELIGATION_FROM,
                              DELIGATED_TO_NAME: empss[0].EMP_NAME,
                              DELIGATION_FROM_NAME: empss2[0].EMP_NAME,
                              DELIGATION_DATE: activity_deligation_master_datas[h].DELIGATION_DATE,
                              DELIGATION_LEVEL: activity_deligation_master_datas[h].DELIGATION_LEVEL
                        }

                        obj1.DELIGATED_To.push(object1)


                  }

                  const activity_owner_data_found = await activity_owner_master.find({ ACTIVITY_ID: get_activity_deligation[i].ACTIVITY_ID })

                  for (d = 0; d < activity_owner_data_found.length; d++) {
                        const empss = await employee_master.find({ EMP_ID: activity_owner_data_found[d].ACTIVITY_OWNER })
                        const object2 = {
                              EMP_ID: activity_owner_data_found[d].ACTIVITY_OWNER,
                              EMP_NAME: empss[0].EMP_NAME,
                              EMP_IMAGE: empss[0].EMP_IMAGE

                        }
                        obj1.ASSIGNED_TO.push(object2)

                  }
                  task_ids.push(obj1)

            }

            res.send(task_ids)




      }
      catch (error) {
            //console.log(error)
            res.status(404).send("error")
      }
}

const uploadTaskAttachmentMob = async (req, res) => {
      try {
            const TASK_ID = req.query.id
            const TASK_ATTACHMENTs = req.files.TASK_ATTACHMENT
            // const task_length = TASK_ATTACHMENTs.length
            // console.log(task_length)
            for (i = 0; i < TASK_ATTACHMENTs.length; i++) {
                  const task_attachment_add = await task_attachment.insertMany({ TASK_ID: TASK_ID, TASK_ATTACHMENT: TASK_ATTACHMENTs[i].originalname })

            }
            res.send("Task attachment Inserted Successfully")

      }

      catch (error) {
            //console.log(error)
            res.status(404).send("error")

      }
}

const uploadTaskAttachment = async (req, res) => {
      try {
            const TASK_ID = req.query.id
            const TASK_ATTACHMENTs = req.files.TASK_ATTACHMENT
            // const task_length = TASK_ATTACHMENTs.length
            // console.log(task_length)
            for (i = 0; i < TASK_ATTACHMENTs.length; i++) {
                  const task_attachment_add = await task_attachment.insertMany({ TASK_ID: TASK_ID, TASK_ATTACHMENT: TASK_ATTACHMENTs[i].originalname })

            }
            res.send("Task attachment Inserted Successfully")

      }

      catch (error) {
            //console.log(error)
            res.status(404).send("error")

      }
}


const uploadActivityAttachmentMob=async(req,res)=>{
      try{
            const ACTIVITY_ID = req.query.id
            const ACTIVITY_ATTACHMENTs = req.files.ACTIVITY_ATTACHMENT
            // const task_length = TASK_ATTACHMENTs.length
            // console.log(task_length)
            for (i = 0; i < ACTIVITY_ATTACHMENTs.length; i++) {
                  const task_attachment_add = await activity_attachment.insertMany({ ACTIVITY_ID: ACTIVITY_ID, ACTIVITY_ATTACHMENT: ACTIVITY_ATTACHMENTs[i].originalname })

            }
            res.send("Activity attachment Inserted Successfully") 

      }
      catch(error){
             //console.log(error)
             res.status(404).send("error")

      }
}

const uploadActivityAttachment=async(req,res)=>{
      try{
            const ACTIVITY_ID = req.query.id
            const ACTIVITY_ATTACHMENTs = req.files.ACTIVITY_ATTACHMENT
            // const task_length = TASK_ATTACHMENTs.length
            // console.log(task_length)
            for (i = 0; i < ACTIVITY_ATTACHMENTs.length; i++) {
                  const task_attachment_add = await activity_attachment.insertMany({ ACTIVITY_ID: ACTIVITY_ID, ACTIVITY_ATTACHMENT: ACTIVITY_ATTACHMENTs[i].originalname })

            }
            res.send("Activity attachment Inserted Successfully") 

      }
      catch(error){
             //console.log(error)
             res.status(404).send("error")

      }
}
module.exports = {
      assignedTaskPriorityChart, assignedTaskStatusChart, assignedTeamStatusChart, createActivity, createActivityMob, createTaskMob, createTask, deleteActivityMob, deleteTaskMob, deligatedTaskPriorityChart, deligatedTaskStatusChart, deligatedTeamStatusChart, getAllActivityByEmpMob, uploadTaskAttachmentMob,uploadTaskAttachment,uploadActivityAttachmentMob,uploadActivityAttachment
}