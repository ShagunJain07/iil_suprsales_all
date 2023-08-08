const order_master = require("../model/order_master")
const order_detail = require("../model/order_details")
const crypto = require('crypto');

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

module.exports={createOrder}