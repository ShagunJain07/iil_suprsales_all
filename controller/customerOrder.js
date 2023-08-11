const customer_order = require("../model/customer_order_master")

const customer_order_detail = require("../model/customer_order_detail")

const emp_customer_mapping = require("../model/emp_customer_mapping")

const invoice_master = require("../model/invoice_master")

const order_master = require("../model/order_master")

const employee_master = require("../model/employee_master")

const plant_master = require("../model/plant_master")

const distributor_master = require("../model/distributor_master")

const packing_sku_master = require("../model/packing_sku_master")

const price_master=require("../model/price_master")

const packing_unit_master=require("../model/packing_unit_master")

const category_master=require("../model/category_master")

const region_master=require("../model/region_master")

const emp_region_mapping=require("../model/emp_region_mapping")

const stock_master=require("../model/stock_master")

const material_group_master=require("../model/material_group_master")

const createOrder = async (req, res) => {
      try {

            const CUSTOMER_ID = req.body.CUSTOMER_ID

            const TOTAL_ORDER_VALUE = req.body.TOTAL_ORDER_VALUE

            const IDs = req.body.SKU_ID   //array
            const QUANTITY = req.body.SKU_QUANTITY // array
            const SKU_VALUE = req.body.TOTAL_SKU_VALUE // array

            const employee = await emp_customer_mapping.find({ CUSTOMER_ID: CUSTOMER_ID }, { EMP_ID: 1, _id: 0 })
            // console.log(employee[0].EMP_ID)
            const APPROVED_BY = employee[0].EMP_ID

            const count_order = await customer_order.countDocuments()
            const new_count = count_order + 1
            const order_master = await customer_order.insertMany({ ORDER_ID: new_count, APPROVED_BY: APPROVED_BY, CUSTOMER_ID: CUSTOMER_ID, TOTAL_ORDER_VALUE: TOTAL_ORDER_VALUE, APPROVE_STATUS: 2, ACKNOWLEDGE_STATUS: 1,PLANT_ID:0 })
            for (i = 0; i < IDs.length; i++) {
                  const order_detail = await customer_order_detail.insertMany({ ORDER_ID: new_count, SKU_ID: IDs[i], SKU_QUANTITY: QUANTITY[i], TOTAL_SKU_VALUE: SKU_VALUE[i], STATUS: 3 })
            }

            res.send("Order Inserted Successfully")

      }
      catch (error) {
            console.log(error)
            res.status(404).send("error")
      }
}


const createOrderMob = async (req, res) => {
      try {

            const CUSTOMER_ID = req.body.CUSTOMER_ID

            const TOTAL_ORDER_VALUE = req.body.TOTAL_ORDER_VALUE

            const IDs = req.body.SKU_ID   //array
            const QUANTITY = req.body.SKU_QUANTITY // array
            const SKU_VALUE = req.body.TOTAL_SKU_VALUE // array

            const employee = await emp_customer_mapping.find({ CUSTOMER_ID: CUSTOMER_ID }, { EMP_ID: 1, _id: 0 })
            // console.log(employee[0].EMP_ID)
            const APPROVED_BY = employee[0].EMP_ID

            const count_order = await customer_order.countDocuments()
            const new_count = count_order + 1
            const order_master = await customer_order.insertMany({ ORDER_ID: new_count, APPROVED_BY: APPROVED_BY, CUSTOMER_ID: CUSTOMER_ID, TOTAL_ORDER_VALUE: TOTAL_ORDER_VALUE, APPROVE_STATUS: 2, ACKNOWLEDGE_STATUS: 1,PLANT_ID:0})
            for (i = 0; i < IDs.length; i++) {
                  const order_detail = await customer_order_detail.insertMany({ ORDER_ID: new_count, SKU_ID: IDs[i], SKU_QUANTITY: QUANTITY[i], TOTAL_SKU_VALUE: SKU_VALUE[i], STATUS: 3 })
            }

            res.send("Order Inserted Successfully")

      }
      catch (error) {
            // console.log(error)
            res.status(404).send("error")
      }
}


const getCustomerOrder = async (req, res) => {
      try {

            const APPROVED_BY = req.query.id
            const START_DATE = req.query.start_date
            const END_DATE = req.query.end_date
            const STATUS = req.query.status

            const array1 = []
            const array2 = []
            const customer_order_master_data = await customer_order.find({APPROVED_BY:APPROVED_BY})
            console.log("customer_order_master_data",customer_order_master_data)
            for (i = 0; i < customer_order_master_data.length; i++) {
                  const order_master_detail = await order_master.find({ CUSTOMER_ORDER_ID: customer_order_master_data[i].ORDER_ID, CUSTOMER_ID: customer_order_master_data[i].CUSTOMER_ID })
// console.log("order_master_detail",order_master_detail)
                  const invoice_data = await invoice_master.find({SUPRSALES_ORDER_NO: order_master_detail[0].ORDER_ID, CUSTOMER_ID: order_master_detail[0].CUSTOMER_ID })
// console.log("invoice_data",invoice_data)
                  const distributor_data = await distributor_master.find({ DISTRIBUTOR_ID: customer_order_master_data[i].CUSTOMER_ID })
// console.log("distributor_data",distributor_data)
                  const plant_data = await plant_master.find({ PLANT_ID: customer_order_master_data[i].PLANT_ID })
// console.log("plant_data",plant_data)
if(customer_order_master_data[i].PLANT_ID==0){
      const object1 = {
            "INVOICE_NO": invoice_data[0].INVOICE_NO,
            "INVOICE_DATE": invoice_data[0].INVOICE_DATE,
            "ORDER_ID": customer_order_master_data[i].ORDER_ID,
            "ORDER_DATE": customer_order_master_data[i].ORDER_DATE,
           // "PLANT_ID": customer_order_master_data[i].PLANT_ID,
            "APPROVE_STATUS": customer_order_master_data[i].APPROVE_STATUS,
            "ACKNOWLEDGE_STATUS": customer_order_master_data[i].ACKNOWLEDGE_STATUS,
            "TOTAL_ORDER_VALUE": customer_order_master_data[i].TOTAL_ORDER_VALUE,
            "REMARKS": customer_order_master_data[i].REMARKS,
            "CUSTOMER_ID": customer_order_master_data[i].CUSTOMER_ID,
            "CUSTOMER_NAME": distributor_data[0].DISTRIBUTOR_NAME,
          //  "PLANT_DESCRIPTION": plant_data[0].PLANT_DESCRIPTION

      }
      array1.push(object1)

}
else{
      const object1 = {
            "INVOICE_NO": invoice_data[0].INVOICE_NO,
            "INVOICE_DATE": invoice_data[0].INVOICE_DATE,
            "ORDER_ID": customer_order_master_data[i].ORDER_ID,
            "ORDER_DATE": customer_order_master_data[i].ORDER_DATE,
            "PLANT_ID": customer_order_master_data[i].PLANT_ID,
            "APPROVE_STATUS": customer_order_master_data[i].APPROVE_STATUS,
            "ACKNOWLEDGE_STATUS": customer_order_master_data[i].ACKNOWLEDGE_STATUS,
            "TOTAL_ORDER_VALUE": customer_order_master_data[i].TOTAL_ORDER_VALUE,
            "REMARKS": customer_order_master_data[i].REMARKS,
            "CUSTOMER_ID": customer_order_master_data[i].CUSTOMER_ID,
            "CUSTOMER_NAME": distributor_data[0].DISTRIBUTOR_NAME,
            "PLANT_DESCRIPTION": plant_data[0].PLANT_DESCRIPTION

      }
      //console.log("object1",object1)
      array1.push(object1)

}
                  
            }

            for (j = 0; j < array1.length; j++) {
                  if (STATUS.length != 0 && START_DATE.length!= 0) {
                       // console.log("inside1")
                        if (array1[j].APPROVE_STATUS == STATUS && (array[j].ORDER_DATE >= START_DATE && array[j].ORDER_DATE <= END_DATE)) {
                              array2.push(array1[j])
                        }
                  }

                  else if (STATUS.length != 0 && START_DATE.length==0) {
                        // console.log("inside2")
                        // console.log("array1",array1[j])

                        if (array1[j].APPROVE_STATUS == STATUS) {
                              array2.push(array1[j])
                        }
                  }

                  if (STATUS.length == 0 && START_DATE.length!=0) {
                        // console.log("inside3")

                        if (array[j].ORDER_DATE >= START_DATE && array[j].ORDER_DATE <= END_DATE) {
                              array2.push(array1[j])
                        }
                  }


            }
            res.send(array2)

      }
      catch (error) {
            console.log(error)
            res.status(404).send("error")
      }
}

const getCustomerOrderByCustID = async (req, res) => {
      try {
            const CUSTOMER_ID = req.query.id
            const START_DATE = req.query.start_date
            const END_DATE = req.query.end_date
            const STATUS = req.query.status

            const array1 = []
            const array2 = []
            const customer_order_master_data = await customer_order.find({ CUSTOMER_ID: CUSTOMER_ID, ORDER_DATE: { $lte: END_DATE, $gte: START_DATE } })

            for (i = 0; i < customer_order_master_data.length; i++) {
                  const order_master_detail = await order_master.find({ CUSTOMER_ORDER_ID: customer_order_master_data[i].ORDER_ID, CUSTOMER_ID: customer_order_master_data[i].CUSTOMER_ID })

                  const invoice_data = await invoice_master.find({ SUPRSALES_ORDER_NO: order_master_detail[0].ORDER_ID, CUSTOMER_ID: order_master_detail[0].CUSTOMER_ID })

                  const distributor_data = await distributor_master.find({ DISTRIBUTOR_ID: customer_order_master_data[i].CUSTOMER_ID })

                  const plant_data = await plant_master.find({ PLANT_ID: customer_order_master_data[i].PLANT_ID })

                  const object1 = {
                        "INVOICE_NO": invoice_data[0].INVOICE_NO,
                        "INVOICE_DATE": invoice_data[0].INVOICE_DATE,
                        "ORDER_ID": customer_order_master_data[i].ORDER_ID,
                        "ORDER_DATE": customer_order_master_data[i].ORDER_DATE,
                        "PLANT_ID": customer_order_master_data[i].PLANT_ID,
                        "APPROVE_STATUS": customer_order_master_data[i].APPROVE_STATUS,
                        "ACKNOWLEDGE_STATUS": customer_order_master_data[i].ACKNOWLEDGE_STATUS,
                        "TOTAL_ORDER_VALUE": customer_order_master_data[i].TOTAL_ORDER_VALUE,
                        "REMARKS": customer_order_master_data[i].REMARKS,
                        "CUSTOMER_ID": customer_order_master_data[i].CUSTOMER_ID,
                        "CUSTOMER_NAME": distributor_data[0].DISTRIBUTOR_NAME,
                        "PLANT_DESCRIPTION": plant_data[0].PLANT_DESCRIPTION

                  }
                  array1.push(object1)
            }

            for (j = 0; j < array1.length; j++) {
                  if (STATUS.length != 0 && START_DATE.length!=0) {
                       // console.log("inside1",array1[j])
                        if (array1[j].APPROVE_STATUS == STATUS) {
                              array2.push(array1[j])
                        }
                  }

                  else if (STATUS.length != 0 && START_DATE.length==0) {
                        console.log("inside2")

                        if (array1[j].APPROVE_STATUS == STATUS) {
                              array2.push(array1[j])
                        }
                  }

                  if (STATUS.length == 0 && START_DATE.length!=0) {
                        console.log("inside3")

                        if (array1[j].ORDER_DATE >= START_DATE && array1[j].ORDER_DATE <= END_DATE) {
                              array2.push(array1[j])
                        }
                  }


            }
            res.send(array2)
      }
      catch (error) {
            console.log(error)
            res.status(404).send("error")
      }
}

const getCustomerOrderByCustIDMob = async (req, res) => {
      try {

            const CUSTOMER_ID = req.query.id

            const array1=[]

            const customer_order_master_data = await customer_order.find({ CUSTOMER_ID: CUSTOMER_ID }).sort({ ORDER_DATE: -1 })


            for (i = 0; i < customer_order_master_data.length; i++) {

                  const approver_name=await employee_master.find({EMP_ID:customer_order_master_data[i].APPROVED_BY},{EMP_NAME:1,_id:0})

                  const plant_data=await plant_master.find({PLANT_ID:customer_order_master_data[i].PLANT_ID})
                  const object1 = {
                        ORDER_ID: customer_order_master_data[i].ORDER_ID,
                        APPROVED_BY: customer_order_master_data[i].APPROVED_BY,
                        APPROVER_NAME: approver_name[0].EMP_NAME,
                        ORDER_DATE: customer_order_master_data[i].ORDER_DATE,
                        PLANT_ID: customer_order_master_data[i].PLANT_ID,
                        TOTAL_ORDER_VALUE: customer_order_master_data[i].TOTAL_ORDER_VALUE,
                        PLANT_DESCRIPTION: plant_data[0].PLANT_DESCRIPTION,
                        REMARKS: customer_order_master_data[i].REMARKS,
                        APPROVE_STATUS: customer_order_master_data[i].APPROVE_STATUS,
                        ACKNOWLEDGE_STATUS: customer_order_master_data[i].ACKNOWLEDGE_STATUS,
                        ORDER_DETAIL: [],
                        INVOICE_DETAIL: []
                  }

                  const customer_order_detail_data=await customer_order_detail.find({ORDER_ID:customer_order_master_data[i].ORDER_ID})

                  for(j=0;j<customer_order_detail_data.length;j++){

                        const sku_descripton_data=await packing_sku_master.find({SKU_ID:customer_order_detail_data[j].SKU_ID})

                        const region_found=await distributor_master.find({DISTRIBUTOR_ID:CUSTOMER_ID},{_id:0})

                        const price_data=await price_master.find({REGION_ID:region_found[0].REGION_ID})

                        const unit_found=await packing_unit_master.find({UNIT_ID:sku_descripton_data[0].UNIT_ID})

                        const category_name=await category_master.find({CATEGORY_ID:unit_found[0].CATEGORY_ID})

                        const region_master_data=await region_master.find({REGION_ID:region_found[0].REGION_ID})

                        const object2={
                              SKU_ID:customer_order_detail_data[j].SKU_ID,
                              SKU_DESCRIPTION:sku_descripton_data[0].SKU_DESCRIPTION,
                              FACTOR:sku_descripton_data[0].FACTOR,
                              SKU_QUANTITY:customer_order_detail_data[j].SKU_QUANTITY,
                              PRICE:price_data[0].PRICE,
                              TOTAL_SKU_VALUE:customer_order_detail_data[j].TOTAL_SKU_VALUE,
                              CATEGORY_NAME:category_name[0].CATEGORY_NAME,
                              REGION_ID:region_found[0].REGION_ID,
                              REGION_NAME:region_master_data[0].REGION_NAME,
                              UNIT:unit_found[0].UNIT_VALUE,
                              UNIT_ID:sku_descripton_data[0].UNIT_ID,
                              UPDATED_ON:price_data[0].UPDATED_ON
                        }
                        // console.log(object2)
                        // console.log(object1.ORDER_DETAIL)
                        object1.ORDER_DETAIL.push(object2)
                  }
array1.push(object1)

            }
            res.send(array1)
      }
      catch (error) {
            console.log(error)
            res.status(404).send("error")
      }
}

const getCustomerOrderByEmpIDMob=async(req,res)=>{
      try{
           const EMP_ID=req.query.id

           const customer_array=[]

           const array1=[]
           const all_customers=await emp_customer_mapping.find({EMP_ID:EMP_ID})

           for(i=0;i<all_customers.length;i++){
            customer_array.push(all_customers[i].CUSTOMER_ID)
           }

           const all_orders=await customer_order.find({CUSTOMER_ID:{$in:customer_array}}).sort({ORDER_DATE:-1})

           for(j=0;j<all_orders.length;j++){
            const distributor_name=await distributor_master.find({DISTRIBUTOR_ID:all_orders[j].CUSTOMER_ID})
            const employee_name=await employee_master.find({EMP_ID:all_orders[j].APPROVED_BY})
            const plant_data=await plant_master.find({PLANT_ID:all_orders[j].PLANT_ID})
            const object1={
            ORDER_ID:all_orders[j].ORDER_ID,
	      CUSTOMER_NAME:distributor_name[0].DISTRIBUTOR_NAME,
        APPROVED_BY:all_orders[j].APPROVED_BY,
       APPROVER_NAME:employee_name[0].EMP_NAME,
       ORDER_DATE:all_orders[j].ORDER_DATE,
       PLANT_ID:all_orders[j].PLANT_ID,
       TOTAL_ORDER_VALUE:all_orders[j].TOTAL_ORDER_VALUE,
        PLANT_DESCRIPTION:plant_data[0].PLANT_DESCRIPTION,
        REMARKS:all_orders[j].REMARKS,
        APPROVE_STATUS:all_orders[j].APPROVE_STATUS,
		  ACKNOWLEDGE_STATUS:all_orders[j].ACKNOWLEDGE_STATUS,
       ORDER_DETAIL:[]
           }
           const customer_order_details_data=await customer_order_detail.find({ORDER_ID:all_orders[j].ORDER_ID})
           for(k=0;k<customer_order_details_data.length;k++){
            const sku_descripton_data=await packing_sku_master.find({SKU_ID:customer_order_details_data[k].SKU_ID})

            const region_found=await distributor_master.find({DISTRIBUTOR_ID:all_orders[j].CUSTOMER_ID},{_id:0})

            const price_data=await price_master.find({REGION_ID:region_found[0].REGION_ID})

            const unit_found=await packing_unit_master.find({UNIT_ID:sku_descripton_data[0].UNIT_ID})

            const category_name=await category_master.find({CATEGORY_ID:unit_found[0].CATEGORY_ID})

            const region_master_data=await region_master.find({REGION_ID:region_found[0].REGION_ID})

            const object2={
                  SKU_ID:customer_order_details_data[k].SKU_ID,
                  SKU_DESCRIPTION:sku_descripton_data[0].SKU_DESCRIPTION,
                  FACTOR:sku_descripton_data[0].FACTOR,
                  SKU_QUANTITY:customer_order_details_data[k].SKU_QUANTITY,
                  PRICE:price_data[0].PRICE,
                  TOTAL_SKU_VALUE:customer_order_details_data[k].TOTAL_SKU_VALUE,
                  CATEGORY_NAME:category_name[0].CATEGORY_NAME,
                  REGION_ID:region_found[0].REGION_ID,
                  REGION_NAME:region_master_data[0].REGION_NAME,
                  UNIT:unit_found[0].UNIT_VALUE,
                  UNIT_ID:sku_descripton_data[0].UNIT_ID,
                  UPDATED_ON:price_data[0].UPDATED_ON
            }
            object1.ORDER_DETAIL.push(object2)
           }
           array1.push(object1)
      }
      res.send(array1)

      }
      catch(error){
            console.log(error)
            res.status(404).send("error")
      }
}

const getCustomerOrderDetail=async(req,res)=>{
      try{

            const ORDER_ID=req.query.order_id

            const array1=[]

            const customer_order_master_data=await customer_order.find({ORDER_ID:ORDER_ID})

            const distributor_data=await distributor_master.find({DISTRIBUTOR_ID:customer_order_master_data[0].CUSTOMER_ID})

            const customer_order_detail_data=await customer_order_detail.find({ORDER_ID:ORDER_ID})

            for(i=0;i<customer_order_detail_data.length;i++){
                  const sku_descripton_data=await packing_sku_master.find({SKU_ID:customer_order_detail_data[i].SKU_ID})

                  // console.log(distributor_data[0].REGION_ID)
                  // console.log(customer_order_detail_data[i].SKU_ID)
                  const price_data=await price_master.find({REGION_ID:distributor_data[0].REGION_ID,SKU_ID:customer_order_detail_data[i].SKU_ID})

                  const object1={
                        "SKU_ID":customer_order_detail_data[i].SKU_ID,
                        "SKU_DESCRIPTION":sku_descripton_data[0].SKU_DESCRIPTION,
                        "SKU_QUANTITY":customer_order_detail_data[i].SKU_ID,
                        "FACTOR":sku_descripton_data[0].FACTOR,
                        "PRICE":price_data[0].PRICE,
                        "TOTAL_SKU_VALUE":customer_order_detail_data[i].TOTAL_SKU_VALUE,
                        "STATUS":customer_order_detail_data[i].STATUS
                  }

array1.push(object1)
            }
            res.send(array1)
      }
      catch(error){
            console.log(error)
            res.status(404).send("error")
      }
}


const skuListByCustomerId=async(req,res)=>{
      try{
            const CUSTOMER_ID=req.query.id
const array1=[]
const array_emp=[]
            const mapping=await emp_customer_mapping.find({CUSTOMER_ID:CUSTOMER_ID})

            for(i=0;i<mapping.length;i++){
array_emp.push(mapping[i].EMP_ID)
            }
            const region_data=await emp_region_mapping.find({EMP_ID:{$in:array_emp}})
// console.log("region_data",region_data)
               for(j=0;j<region_data.length;j++)
            {
                  const region_master_data=await region_master.find({REGION_ID:region_data[j].REGION_ID})

                  const plant_master_data=await plant_master.find({REGION_ID:region_data[j].REGION_ID})
                
            // console.log(plant_master_data)
                  for(l=0;l<plant_master_data.length;l++){
                        const stock_master_data=await stock_master.find({PLANT_ID:plant_master_data[l].PLANT_ID})
                        for(m=0;m<stock_master_data.length;m++){
                              const packing_sku_master_data=await packing_sku_master.find({SKU_ID:stock_master_data[m].SKU_ID})
                              const packing_unit_master_data=await packing_unit_master.find({UNIT_ID:packing_sku_master_data[0].UNIT_ID})
                              const price_master_data=await price_master.find({SKU_ID:packing_sku_master_data[0].SKU_ID})
                              console.log(price_master_data[0])
                              const material_master=await material_group_master.find({GROUP_ID:packing_sku_master_data[0].GROUP_ID})
// console.log("material_master",material_master)

                              const object1={
                                    "SKU_ID":stock_master_data[m].SKU_ID,
                                    "SKU_DESCRIPTION":stock_master_data[m].SKU_DESCRIPTION,
                                    "UNIT_ID":packing_sku_master_data[0].UNIT_ID,
                                    "FACTOR":packing_sku_master_data[0].FACTOR,
                                    "UNIT_VALUE":packing_unit_master_data[0].UNIT_VALUE,
                                    "UNIT_TYPE":packing_unit_master_data[0].UNIT_TYPE,
                                    "REGION_NAME":region_master_data[j].REGION_NAME,
                                    "GROUP_ID":material_master[0].GROUP_ID,
                                    "PRICE":price_master_data[0].PRICE,
                                    "REGION_ID":region_data[j].REGION_ID
                                    
                              }
                              array1.push(object1)
                        }
                  }


            }
            res.send(array1)

            }
      catch(error){
            console.log(error)
            res.status(404).send("error")
      }
}


module.exports = {
      createOrder, createOrderMob, getCustomerOrder, getCustomerOrderByCustID,getCustomerOrderByCustIDMob,getCustomerOrderByEmpIDMob,getCustomerOrderDetail,skuListByCustomerId
}