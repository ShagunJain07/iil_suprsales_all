const order_master = require("../model/order_master")
const order_detail = require("../model/order_details")
const crypto = require('crypto');
const employee_model = require("../model/employee_master");
const farmer_master = require("../model/farmer_master")
const distributor_master = require("../model/distributor_master");
const retailer_master = require("../model/retailer_master")
const plant_master = require("../model/plant_master")
const createOrder = async (req, res) => {
      try {
            const generateOrderId = () => {
                  const randomBytes = crypto.randomBytes(5);
                  const hexString = randomBytes.toString('hex').toUpperCase();
                  const orderId = hexString.replace(/E/g, 'F');
                  return orderId;
            };

            const ORDER_ID = generateOrderId();

            const order_master_order_id = await order_master.find({ ORDER_ID: ORDER_ID })
            if (order_master_order_id.length != 0) {
                  const EMPLOYEE_ID = req.query.id
                  const CUSTOMER_ID = req.body.CUSTOMER_ID
                  const CUST_TYPE_CODE = req.body.CUST_TYPE_CODE
                  const TOTAL_ORDER_VALUE = req.body.TOTAL_ORDER_VALUE
                  const REMARKS = req.body.REMARKS
                  const PLANT_ID = req.body.PLANT_ID

                  const ID = req.body.SKU_ID
                  const QUANTITY = req.body.SKU_QUANTITY
                  const SKU_VALUE = req.body.TOTAL_SKU_VALUE

                  // console.log(CUSTOMER_ID)
                  const order_master_insert = await order_master.insertMany({
                        ORDER_ID: ORDER_ID, CREATED_BY: EMPLOYEE_ID, CUSTOMER_ID: CUSTOMER_ID, CUST_TYPE_CODE: CUST_TYPE_CODE, PLANT_ID: PLANT_ID,
                        TOTAL_ORDER_VALUE: TOTAL_ORDER_VALUE, REMARKS: REMARKS, STATUS: 1
                  })

                  for (i = 0; i < ID.length; i++) {
                        const order_detail_insert = await order_detail.insertMany({ ORDER_ID: ORDER_ID, SKU_ID: ID[i], SKU_QUANTITY: QUANTITY[i], TOTAL_SKU_VALUE: SKU_VALUE[i] })
                  }
                  res.send("inserted successfully")
            }
            else {
                  const ORDER_ID = generateOrderId();
                  const EMPLOYEE_ID = req.query.id
                  const CUSTOMER_ID = req.body.CUSTOMER_ID
                  const CUST_TYPE_CODE = req.body.CUST_TYPE_CODE
                  const TOTAL_ORDER_VALUE = req.body.TOTAL_ORDER_VALUE
                  const REMARKS = req.body.REMARKS
                  const PLANT_ID = req.body.PLANT_ID

                  const ID = req.body.SKU_ID
                  const QUANTITY = req.body.SKU_QUANTITY
                  const SKU_VALUE = req.body.TOTAL_SKU_VALUE


                  const order_master_insert = await order_master.insertMany({
                        ORDER_ID: ORDER_ID, CREATED_BY: EMPLOYEE_ID, CUSTOMER_ID: CUSTOMER_ID, CUST_TYPE_CODE: CUST_TYPE_CODE, PLANT_ID: PLANT_ID,
                        TOTAL_ORDER_VALUE: TOTAL_ORDER_VALUE, REMARKS: REMARKS, STATUS: 1
                  })

                  for (i = 0; i < ID.length; i++) {
                        const order_detail_insert = await order_detail.insertMany({ ORDER_ID: ORDER_ID, SKU_ID: ID[i], SKU_QUANTITY: QUANTITY[i], TOTAL_SKU_VALUE: SKU_VALUE[i] })
                  }
                  res.send("inserted successfully")

            }
      }
      catch (error) {
            console.log(error)
            res.status(404).send("error")
      }
}


const getOrderByLoginEmp = async (req, res) => {
      try {
            const EMPLOYEE_ID = req.query.id
            const START_DATE = req.query.start_date
            const END_DATE = req.query.end_date
            const array1 = []
            const order_master_data = await order_master.find({ CREATED_BY: EMPLOYEE_ID, ORDER_DATE: { $lte: END_DATE, $gte: START_DATE } })
            for (i = 0; i < order_master_data.length; i++) {
                  const emp_data = await employee_model.find({ EMP_ID: order_master_data[i].CREATED_BY })//PLACED_BY

                  const region_id_found = await plant_master.find({ PLANT_ID: order_master_data[i].PLANT_ID })//REGION_ID

                  const object1 = {}
                  if (order_master_data[i].CUST_TYPE_CODE == 'FAR') {
                        const customer_data = await farmer_master.find({ FARMER_ID: order_master_data[i].CUSTOMER_ID })
                        object1[CUSTOMER_NAME] = customer_data[0].FARMER_NAME
                        object1[CUSTOMER_DISTRICT] = customer_data[0].FARMER_DISTRICT

                  }
                  else if (order_master_data[i].CUST_TYPE_CODE == 'DIS') {
                        const customer_data = await distributor_master.find({ DISTRIBUTOR_ID: order_master_data[i].CUSTOMER_ID })
                        object1[CUSTOMER_NAME] = customer_data[0].DISTRIBUTOR_NAME
                        object1[CUSTOMER_DISTRICT] = customer_data[0].DISTRIBUTOR_DISTRICT

                  }
                  else if (order_master_data[i].CUST_TYPE_CODE == 'RET') {
                        const customer_data = await retailer_master.find({ RETAILER_ID: order_master_data[i].CUSTOMER_ID })
                        object1[CUSTOMER_NAME] = customer_data[0].RETAILER_NAME
                        object1[CUSTOMER_DISTRICT] = customer_data[0].RETAILER_DISTRICT

                  }

                  const object2 = {
                        "ORDER_ID": order_master_data[i].ORDER_ID,
                        "CUSTOMER_ID": order_master_data[i].CUSTOMER_ID,
                        "ORDER_DATE": order_master_data[i].ORDER_DATE,
                        "PLACED_BY": emp_data[0].EMP_NAME,
                        "TOTAL_ORDER_VALUE": order_master_data[i].TOTAL_ORDER_VALUE,
                        'PLANT_NAME': region_id_found[0].PLANT_DESCRIPTION,
                        "PLANT_ID": order_master_data[i].PLANT_ID,
                        "REMARKS": order_master_data[i].REMARKS,
                        "REGION_ID": order_master_data[i].REGION_ID,
                        "STATUS": order_master_data[i].STATUS
                  }
                  array1.push({ ...object2, ...object1 })
            }
            res.send(array1)






      }
      catch (error) {
            //console.log(error)
            res.status(404).send("error")
      }
}


const getPlantOrder = async (req, res) => {
      try {

            const emp_id = req.query.emp_id
            const id = req.query.id // array
            const start_date = req.query.start_date
            const end_date = req.query.start_date
            const status = req.query.status
            const array1=[]
            const plant_data = await plant_master.find({ PLANT_POC_ID: emp_id })
      //      console.log(emp_id)
      //       console.log(plant_data)
            if (id.length != 0 && status.length != 0) {
                  for (j = 0; j< id.length; j++) {

                        //const plant_data=await plant_master.find({PLANT_POC_ID:emp_id})
                        const order_master_data = await order_master.find({ CREATED_BY: id[j], ORDER_DATE: { $lte: end_date, $gte: start_date }, PLANT_ID: plant_data[0].PLANT_ID, STATUS: status })
                        for (i = 0; i < order_master_data.length; i++) {
                              const emp_data = await employee_model.find({ EMP_ID: order_master_data[i].CREATED_BY })//PLACED_BY

                              const region_id_found = await plant_master.find({ PLANT_ID: order_master_data[i].PLANT_ID })//REGION_ID

                              const object1 = {}
                              if (order_master_data[i].CUST_TYPE_CODE == 'FAR') {
                                    const customer_data = await farmer_master.find({ FARMER_ID: order_master_data[i].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].FARMER_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].FARMER_DISTRICT

                              }
                              else if (order_master_data[i].CUST_TYPE_CODE == 'DIS') {
                                    const customer_data = await distributor_master.find({ DISTRIBUTOR_ID: order_master_data[i].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].DISTRIBUTOR_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].DISTRIBUTOR_DISTRICT

                              }
                              else if (order_master_data[i].CUST_TYPE_CODE == 'RET') {
                                    const customer_data = await retailer_master.find({ RETAILER_ID: order_master_data[i].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].RETAILER_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].RETAILER_DISTRICT

                              }

                              const object2 = {
                                    "ORDER_ID": order_master_data[i].ORDER_ID,
                                    "CUSTOMER_ID": order_master_data[i].CUSTOMER_ID,
                                    "ORDER_DATE": order_master_data[i].ORDER_DATE,
                                    "PLACED_BY": emp_data[0].EMP_NAME,
                                    "TOTAL_ORDER_VALUE": order_master_data[i].TOTAL_ORDER_VALUE,
                                    'PLANT_NAME': region_id_found[0].PLANT_DESCRIPTION,
                                    "PLANT_ID": order_master_data[i].PLANT_ID,
                                    "REMARKS": order_master_data[i].REMARKS,
                                    "REGION_ID": order_master_data[i].REGION_ID,
                                    "STATUS": order_master_data[i].STATUS
                              }
                              array1.push({ ...object2, ...object1 })
                        }
                  }
            }

            else if (id.length != 0 && status.length == 0) {
                  for (j = 0; j < id.length; j++) {

                        // const plant_data=await plant_master.find({PLANT_POC_ID:emp_id})
                        const order_master_data = await order_master.find({ CREATED_BY: id[j], ORDER_DATE: { $lte: end_date, $gte: start_date }, PLANT_ID: plant_data[0].PLANT_ID })
                        for (i = 0; i < order_master_data.length; i++) {
                              const emp_data = await employee_model.find({ EMP_ID: order_master_data[i].CREATED_BY })//PLACED_BY

                              const region_id_found = await plant_master.find({ PLANT_ID: order_master_data[i].PLANT_ID })//REGION_ID

                              const object1 = {}
                              if (order_master_data[i].CUST_TYPE_CODE == 'FAR') {
                                    const customer_data = await farmer_master.find({ FARMER_ID: order_master_data[i].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].FARMER_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].FARMER_DISTRICT

                              }
                              else if (order_master_data[i].CUST_TYPE_CODE == 'DIS') {
                                    const customer_data = await distributor_master.find({ DISTRIBUTOR_ID: order_master_data[i].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].DISTRIBUTOR_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].DISTRIBUTOR_DISTRICT

                              }
                              else if (order_master_data[i].CUST_TYPE_CODE == 'RET') {
                                    const customer_data = await retailer_master.find({ RETAILER_ID: order_master_data[i].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].RETAILER_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].RETAILER_DISTRICT

                              }

                              const object2 = {
                                    "ORDER_ID": order_master_data[i].ORDER_ID,
                                    "CUSTOMER_ID": order_master_data[i].CUSTOMER_ID,
                                    "ORDER_DATE": order_master_data[i].ORDER_DATE,
                                    "PLACED_BY": emp_data[0].EMP_NAME,
                                    "TOTAL_ORDER_VALUE": order_master_data[i].TOTAL_ORDER_VALUE,
                                    'PLANT_NAME': region_id_found[0].PLANT_DESCRIPTION,
                                    "PLANT_ID": order_master_data[i].PLANT_ID,
                                    "REMARKS": order_master_data[i].REMARKS,
                                    "REGION_ID": order_master_data[i].REGION_ID,
                                    "STATUS": order_master_data[i].STATUS
                              }
                              array1.push({ ...object2, ...object1 })
                        }
                  }
            }
            else if (id.length == 0 && status.length != 0) {

                        const order_master_data = await order_master.find({ ORDER_DATE: { $lte: end_date, $gte: start_date }, PLANT_ID: plant_data[0].PLANT_ID ,STATUS:status})
                        for (i = 0; i < order_master_data.length; i++) {
                              const emp_data = await employee_model.find({ EMP_ID: order_master_data[i].CREATED_BY })//PLACED_BY

                              const region_id_found = await plant_master.find({ PLANT_ID: order_master_data[i].PLANT_ID })//REGION_ID

                              const object1 = {}
                              if (order_master_data[i].CUST_TYPE_CODE == 'FAR') {
                                    const customer_data = await farmer_master.find({ FARMER_ID: order_master_data[i].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].FARMER_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].FARMER_DISTRICT

                              }
                              else if (order_master_data[i].CUST_TYPE_CODE == 'DIS') {
                                    const customer_data = await distributor_master.find({ DISTRIBUTOR_ID: order_master_data[i].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].DISTRIBUTOR_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].DISTRIBUTOR_DISTRICT

                              }
                              else if (order_master_data[i].CUST_TYPE_CODE == 'RET') {
                                    const customer_data = await retailer_master.find({ RETAILER_ID: order_master_data[i].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].RETAILER_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].RETAILER_DISTRICT

                              }

                              const object2 = {
                                    "ORDER_ID": order_master_data[i].ORDER_ID,
                                    "CUSTOMER_ID": order_master_data[i].CUSTOMER_ID,
                                    "ORDER_DATE": order_master_data[i].ORDER_DATE,
                                    "PLACED_BY": emp_data[0].EMP_NAME,
                                    "TOTAL_ORDER_VALUE": order_master_data[i].TOTAL_ORDER_VALUE,
                                    'PLANT_NAME': region_id_found[0].PLANT_DESCRIPTION,
                                    "PLANT_ID": order_master_data[i].PLANT_ID,
                                    "REMARKS": order_master_data[i].REMARKS,
                                    "REGION_ID": order_master_data[i].REGION_ID,
                                    "STATUS": order_master_data[i].STATUS
                              }
                              array1.push({ ...object2, ...object1 })
                        }
                  
            }

            else if (id.length == 0 && status.length == 0) {

                  const order_master_data = await order_master.find({ ORDER_DATE: { $lte: end_date, $gte: start_date }, PLANT_ID: plant_data[0].PLANT_ID})
                  for (i = 0; i < order_master_data.length; i++) {
                        const emp_data = await employee_model.find({ EMP_ID: order_master_data[i].CREATED_BY })//PLACED_BY

                        const region_id_found = await plant_master.find({ PLANT_ID: order_master_data[i].PLANT_ID })//REGION_ID

                        const object1 = {}
                        if (order_master_data[i].CUST_TYPE_CODE == 'FAR') {
                              const customer_data = await farmer_master.find({ FARMER_ID: order_master_data[i].CUSTOMER_ID })
                              object1[CUSTOMER_NAME] = customer_data[0].FARMER_NAME
                              object1[CUSTOMER_DISTRICT] = customer_data[0].FARMER_DISTRICT

                        }
                        else if (order_master_data[i].CUST_TYPE_CODE == 'DIS') {
                              const customer_data = await distributor_master.find({ DISTRIBUTOR_ID: order_master_data[i].CUSTOMER_ID })
                              object1[CUSTOMER_NAME] = customer_data[0].DISTRIBUTOR_NAME
                              object1[CUSTOMER_DISTRICT] = customer_data[0].DISTRIBUTOR_DISTRICT

                        }
                        else if (order_master_data[i].CUST_TYPE_CODE == 'RET') {
                              const customer_data = await retailer_master.find({ RETAILER_ID: order_master_data[i].CUSTOMER_ID })
                              object1[CUSTOMER_NAME] = customer_data[0].RETAILER_NAME
                              object1[CUSTOMER_DISTRICT] = customer_data[0].RETAILER_DISTRICT

                        }

                        const object2 = {
                              "ORDER_ID": order_master_data[i].ORDER_ID,
                              "CUSTOMER_ID": order_master_data[i].CUSTOMER_ID,
                              "ORDER_DATE": order_master_data[i].ORDER_DATE,
                              "PLACED_BY": emp_data[0].EMP_NAME,
                              "TOTAL_ORDER_VALUE": order_master_data[i].TOTAL_ORDER_VALUE,
                              'PLANT_NAME': region_id_found[0].PLANT_DESCRIPTION,
                              "PLANT_ID": order_master_data[i].PLANT_ID,
                              "REMARKS": order_master_data[i].REMARKS,
                              "REGION_ID": order_master_data[i].REGION_ID,
                              "STATUS": order_master_data[i].STATUS
                        }
                        array1.push({ ...object2, ...object1 })
                  }
            
      }

res.send(array1)
      }
      catch (error) {
            //console.log(error)
            res.status(404).send("error")
      }
}

const getOrderByEmp=async(req,res)=>{
      try{

            const EMPLOYEE_ID=req.query.id //array
            const start_date=req.query.start_date
            const end_date=req.query.end_date
            const status=req.query.status
const array1=[]
            if(EMPLOYEE_ID.length!=0&status!=0)
            {
                  for(i=0;i<EMPLOYEE_ID.length;i++){
                        const order_master_data = await order_master.find({ CREATED_BY:EMPLOYEE_ID[i],ORDER_DATE: { $lte: end_date, $gte: start_date },STATUS:status})

                        for (j = 0; j < order_master_data.length; j++) {
                              const emp_data = await employee_model.find({ EMP_ID: order_master_data[j].CREATED_BY })//PLACED_BY

                              const region_id_found = await plant_master.find({ PLANT_ID: order_master_data[j].PLANT_ID })//REGION_ID

                              const object1 = {}
                              if (order_master_data[i].CUST_TYPE_CODE == 'FAR') {
                                    const customer_data = await farmer_master.find({ FARMER_ID: order_master_data[j].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].FARMER_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].FARMER_DISTRICT

                              }
                              else if (order_master_data[i].CUST_TYPE_CODE == 'DIS') {
                                    const customer_data = await distributor_master.find({ DISTRIBUTOR_ID: order_master_data[j].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].DISTRIBUTOR_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].DISTRIBUTOR_DISTRICT

                              }
                              else if (order_master_data[i].CUST_TYPE_CODE == 'RET') {
                                    const customer_data = await retailer_master.find({ RETAILER_ID: order_master_data[j].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].RETAILER_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].RETAILER_DISTRICT

                              }

                              const object2 = {
                                    "ORDER_ID": order_master_data[j].ORDER_ID,
                                    "CUSTOMER_ID": order_master_data[j].CUSTOMER_ID,
                                    "ORDER_DATE": order_master_data[j].ORDER_DATE,
                                    "PLACED_BY": emp_data[0].EMP_NAME,
                                    "TOTAL_ORDER_VALUE": order_master_data[j].TOTAL_ORDER_VALUE,
                                    'PLANT_NAME': region_id_found[0].PLANT_DESCRIPTION,
                                    "PLANT_ID": order_master_data[j].PLANT_ID,
                                    "REMARKS": order_master_data[j].REMARKS,
                                    "REGION_ID": order_master_data[j].REGION_ID,
                                    "STATUS": order_master_data[j].STATUS
                              }
                              array1.push({ ...object2, ...object1 })
                        }
                  }
            }
            
            else if(EMPLOYEE_ID.length!=0&status==0)
            {
                  for(i=0;i<EMPLOYEE_ID.length;i++){
                        const order_master_data = await order_master.find({ CREATED_BY:EMPLOYEE_ID[i],ORDER_DATE: { $lte: end_date, $gte: start_date }})

                        for (j = 0; j < order_master_data.length; j++) {
                              const emp_data = await employee_model.find({ EMP_ID: order_master_data[j].CREATED_BY })//PLACED_BY

                              const region_id_found = await plant_master.find({ PLANT_ID: order_master_data[j].PLANT_ID })//REGION_ID

                              const object1 = {}
                              if (order_master_data[i].CUST_TYPE_CODE == 'FAR') {
                                    const customer_data = await farmer_master.find({ FARMER_ID: order_master_data[j].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].FARMER_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].FARMER_DISTRICT

                              }
                              else if (order_master_data[i].CUST_TYPE_CODE == 'DIS') {
                                    const customer_data = await distributor_master.find({ DISTRIBUTOR_ID: order_master_data[j].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].DISTRIBUTOR_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].DISTRIBUTOR_DISTRICT

                              }
                              else if (order_master_data[i].CUST_TYPE_CODE == 'RET') {
                                    const customer_data = await retailer_master.find({ RETAILER_ID: order_master_data[j].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].RETAILER_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].RETAILER_DISTRICT

                              }

                              const object2 = {
                                    "ORDER_ID": order_master_data[j].ORDER_ID,
                                    "CUSTOMER_ID": order_master_data[j].CUSTOMER_ID,
                                    "ORDER_DATE": order_master_data[j].ORDER_DATE,
                                    "PLACED_BY": emp_data[0].EMP_NAME,
                                    "TOTAL_ORDER_VALUE": order_master_data[j].TOTAL_ORDER_VALUE,
                                    'PLANT_NAME': region_id_found[0].PLANT_DESCRIPTION,
                                    "PLANT_ID": order_master_data[j].PLANT_ID,
                                    "REMARKS": order_master_data[j].REMARKS,
                                    "REGION_ID": order_master_data[j].REGION_ID,
                                    "STATUS": order_master_data[j].STATUS
                              }
                              array1.push({ ...object2, ...object1 })
                        }
                  }
            }
            else if(EMPLOYEE_ID.length==0&status!=0)
            {
                 
                        const order_master_data = await order_master.find({ORDER_DATE: { $lte: end_date, $gte: start_date },STATUS:status})

                        for (j = 0; j < order_master_data.length; j++) {
                              const emp_data = await employee_model.find({ EMP_ID: order_master_data[j].CREATED_BY })//PLACED_BY

                              const region_id_found = await plant_master.find({ PLANT_ID: order_master_data[j].PLANT_ID })//REGION_ID

                              const object1 = {}
                              if (order_master_data[i].CUST_TYPE_CODE == 'FAR') {
                                    const customer_data = await farmer_master.find({ FARMER_ID: order_master_data[j].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].FARMER_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].FARMER_DISTRICT

                              }
                              else if (order_master_data[i].CUST_TYPE_CODE == 'DIS') {
                                    const customer_data = await distributor_master.find({ DISTRIBUTOR_ID: order_master_data[j].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].DISTRIBUTOR_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].DISTRIBUTOR_DISTRICT

                              }
                              else if (order_master_data[i].CUST_TYPE_CODE == 'RET') {
                                    const customer_data = await retailer_master.find({ RETAILER_ID: order_master_data[j].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].RETAILER_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].RETAILER_DISTRICT

                              }

                              const object2 = {
                                    "ORDER_ID": order_master_data[j].ORDER_ID,
                                    "CUSTOMER_ID": order_master_data[j].CUSTOMER_ID,
                                    "ORDER_DATE": order_master_data[j].ORDER_DATE,
                                    "PLACED_BY": emp_data[0].EMP_NAME,
                                    "TOTAL_ORDER_VALUE": order_master_data[j].TOTAL_ORDER_VALUE,
                                    'PLANT_NAME': region_id_found[0].PLANT_DESCRIPTION,
                                    "PLANT_ID": order_master_data[j].PLANT_ID,
                                    "REMARKS": order_master_data[j].REMARKS,
                                    "REGION_ID": order_master_data[j].REGION_ID,
                                    "STATUS": order_master_data[j].STATUS
                              }
                              array1.push({ ...object2, ...object1 })
                        }
                  
            }
               
            else if(EMPLOYEE_ID.length==0&status==0)
            {
                 
                        const order_master_data = await order_master.find({ORDER_DATE: { $lte: end_date, $gte: start_date }})

                        for (j = 0; j < order_master_data.length; j++) {
                              const emp_data = await employee_model.find({ EMP_ID: order_master_data[j].CREATED_BY })//PLACED_BY

                              const region_id_found = await plant_master.find({ PLANT_ID: order_master_data[j].PLANT_ID })//REGION_ID

                              const object1 = {}
                              if (order_master_data[i].CUST_TYPE_CODE == 'FAR') {
                                    const customer_data = await farmer_master.find({ FARMER_ID: order_master_data[j].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].FARMER_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].FARMER_DISTRICT

                              }
                              else if (order_master_data[i].CUST_TYPE_CODE == 'DIS') {
                                    const customer_data = await distributor_master.find({ DISTRIBUTOR_ID: order_master_data[j].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].DISTRIBUTOR_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].DISTRIBUTOR_DISTRICT

                              }
                              else if (order_master_data[i].CUST_TYPE_CODE == 'RET') {
                                    const customer_data = await retailer_master.find({ RETAILER_ID: order_master_data[j].CUSTOMER_ID })
                                    object1[CUSTOMER_NAME] = customer_data[0].RETAILER_NAME
                                    object1[CUSTOMER_DISTRICT] = customer_data[0].RETAILER_DISTRICT

                              }

                              const object2 = {
                                    "ORDER_ID": order_master_data[j].ORDER_ID,
                                    "CUSTOMER_ID": order_master_data[j].CUSTOMER_ID,
                                    "ORDER_DATE": order_master_data[j].ORDER_DATE,
                                    "PLACED_BY": emp_data[0].EMP_NAME,
                                    "TOTAL_ORDER_VALUE": order_master_data[j].TOTAL_ORDER_VALUE,
                                    'PLANT_NAME': region_id_found[0].PLANT_DESCRIPTION,
                                    "PLANT_ID": order_master_data[j].PLANT_ID,
                                    "REMARKS": order_master_data[j].REMARKS,
                                    "REGION_ID": order_master_data[j].REGION_ID,
                                    "STATUS": order_master_data[j].STATUS
                              }
                              array1.push({ ...object2, ...object1 })
                        }
                  
            }
            res.send(array1)
      }
      catch (error) {
            console.log(error)
            res.status(404).send("error")
      }
}

const downloadAllEmpOrder=async(req,res)=>{
      try{

            const start_date=req.query.start_date
            const end_date=req.query.end_date

            const order_master_data=await order_master.find({ORDER_DATE:{$lte:end_date,$gte:start_date}})

            for(i=0;i<order_master_data;i++){
                  const update_order_master=await order_master.findOneAndUpdate({ORDER_ID:order_master_data[i]},{$set:{STATUS:2}})
            }
            res.send("updated")
      }
      catch (error) {
            console.log(error)
            res.status(404).send("error")
      }
}
module.exports = { createOrder, getOrderByLoginEmp,getPlantOrder,getOrderByEmp,downloadAllEmpOrder}