const distributor_master = require("../model/distributor_master")
const farmer_master = require("../model/farmer_master")
const retailer_master = require("../model/retailer_master")
const customer_balance = require("../model/customer_balance")
const employee_master = require("../model/employee_master")
const employee_customer_mapping = require("../model/emp_customer_mapping")
const invoice_master = require("../model/invoice_master")
const axios = require('axios');

const api_update = async (req, res) => {
      try {
            //console.log("api-update")

            const custId = req.query.id;
            const typeCode = req.query.code;
            const custName = req.body.CUST_NAME;
            const custMob = req.body.CUST_MOB;
            const custBankAccount = req.body.CUST_BANK_ACCOUNT;
            const flag = req.body.FLAG;
            if (typeCode == null) {
                  res.send("please enter type")
            }
            else {
                  if (typeCode == 'FAR') {
                        const update_farmer = await farmer_master.findOneAndUpdate({ FARMER_ID: custId }, { $set: { FARMER_NAME: custName, FARMER_MOB: custMob, FARMER_BANK_ACC_NO: custBankAccount, FLAG: flag } })
                        const data = await farmer_master.find({ FARMER_ID: custId })
                        res.send(data)
                  }
                  else if (typeCode == 'RET') {
                        const update_retailer = await retailer_master.findOneAndUpdate({ RETAILER_ID: custId }, { $set: { RETAILER_NAME: custName, RETAILER_MOB: custMob, RETAILER_BANK_ACC_NO: custBankAccount, FLAG: flag } })
                        const data = await retailer_master.find({ RETAILER_ID: custId })
                        res.send(data)
                  }
            }
      }
      catch (error) {
            console.log(error);
      }
}

const create_customer_balance = async (req, res) => {
      console.log(create - customer - balance)
      let data = JSON.stringify({
            "DT_FROM": "2023-02-06",
            "DT_TO": "2023-02-06"
      });

      let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://192.168.1.204/api/GetData/GetCustomerMaster?FROMDATE=2018-03-26&TODATE=2023-03-26',
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic VmVuZG9yUG9ydGFsOlZtVnVaRzl5'
            },
            data: data
      };
      const sendingdata =
            axios.request(config)
                  .then((response) => {
                        let data = response.data.Data
                        // res.send(data)
                        data.map(async (items, index) => {
                              // res.send("sending")
                              const new_detail = new customer_balance({ items })
                              new_detail.save((respond, err) => {

                              })
                        })
                        res.send("data inserted")

                  })
                  .catch((error) => {
                        console.log(error);
                  });
}

const create_distributor = async (req, res) => {
      console.log("create_distributor")
      let data = JSON.stringify({
            "DT_FROM": "2023-02-06",
            "DT_TO": "2023-02-06"
      });

      let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://192.168.1.204/api/GetData/GetCustomerMaster?FROMDATE=2017-03-26&TODATE=2023-05-30',
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic VmVuZG9yUG9ydGFsOlZtVnVaRzl5'
            },
            data: data
      };
      const sendingdata =
            axios.request(config)
                  .then((response) => {
                        let data = response.data.Data
                        // res.send(data)
                        data.map(async (items, index) => {
//console.log(items)
                              const new_detail = await distributor_master.findOneAndUpdate({EMP_ID:items.EMP_ID},{$set:{ ...items, ...{ PASSWORD: "123456" } }})
                             // new_detail.save((respond, err) => {

                              })
                       
                        res.send("data inserted")
                  })
                  
                  .catch((error) => {
                        console.log(error);
                  });

}

const create_farmer = async (req, res) => {
      //console.log("create_farmer")
      let data = JSON.stringify({
            "DT_FROM": "2023-02-06",
            "DT_TO": "2023-02-06"
      });

      let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://192.168.1.204/api/GetData/GetCustomerMaster?FROMDATE=2018-03-26&TODATE=2023-03-26',
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic VmVuZG9yUG9ydGFsOlZtVnVaRzl5'
            },
            data: data
      };
      const sendingdata =
            axios.request(config)
                  .then((response) => {
                        let data = response.data.Data
                        // res.send(data)
                        data.map(async (items, index) => {
                              // res.send("sending")
                              const new_detail = new farmer_master({ ...items, ...{ PASSWORD: "123456" } })
                              new_detail.save((respond, err) => {
                                    //       if (respond) {
                                    //             // res.send(respond)
                                    //       }
                                    //       else {
                                    //             // res.send(err)
                                    //       }
                              })
                        })
                        res.send("data inserted")
                        // schema_distributor.insertMany({DISTRIBUTOR_ID:response.data.Data.DISTRIBUTOR_ID})
                        // res.send(response.data.Data)
                        // //console.log(JSON.stringify(response.data));
                  })
                  .catch((error) => {
                        console.log(error);
                  });
}

const create_one_distributor = async (req, res) => {
      console.log("create_one_distributor")
      const maximum_id = await distributor_master.countDocuments({}).sort({ DISTRIBUTOR_ID: -1 })
      console.log(maximum_id)
      const ID = ('C' + (maximum_id + 1))
      const add_distributor = await distributor_master.insertMany({ ...req.body, ...{ DISTRIBUTOR_ID: ID } })
      res.send("added")
}

const create_one_farmer = async (req, res) => {
      console.log("create_one_farmer")
      const maximum_id = await farmer_master.countDocuments({}).sort({ FARMER_ID: -1 })
      console.log(maximum_id)
      const ID = (maximum_id + 1)
      const add_farmer = await farmer_master.insertMany({ ...req.body, ...{ FARMER_ID: ID } })
      res.send("added")
}

const create_one_retailer = async (req, res) => {
      console.log("create_one_retailer")
      const maximum_id = await retailer_master.countDocuments({}).sort({ RETAILER_ID: -1 })
      console.log(maximum_id)
      const ID = (maximum_id + 1)
      const add_retailer = await retailer_master.insertMany({ ...req.body, ...{ RETAILER_ID: ID } })
      res.send("added")
}

const create_retailer = async (req, res) => {
      console.log("create_retailer")
}

const customer_login = async (req, res) => {
      try{
       console.log("customer_login")
      const id=req.query.distributor_id
      const password=req.query.password

      const login_data=await distributor_master.find({DISTRIBUTOR_ID:id,PASSWORD:password})
      if(login_data.length==0){
            res.status(404).send("no data found")
      }
      else{
       res.send(login_data)}
      }
      catch(error){
            res.send(error)
      }
      // const data=await invoice_master.aggregate([
      //       {
      //         $match: {
      //           CUSTOMER_ID: "1010174", // Replace 'your_customer_id' with the actual customer ID
      //           INVOICE_DATE: {
      //             $gte: new Date(`2023-04-01`),
      //             $lte: new Date(`2024-03-31`)
      //           },
      //           DOCUMENT_TYPE: 'RV'
      //         }
      //       },
      //       {
      //         $group: {
      //           _id: {month: { $month: "$INVOICE_DATE" } },
      //           SALES: {
      //             $sum: {
      //               $cond: [
      //                 { $in: ['$BILLING_CATEGORY', ['M', 'P']] },
      //                 '$PRICE',
      //                 {
      //                   $cond: [
      //                     { $in: ['$BILLING_CATEGORY', ['O', 'S']] },
      //                     { $multiply: ['$PRICE', -1] },
      //                     {
      //                       $cond: [
      //                         {
      //                           $and: [
      //                             { $eq: ['$BILLING_CATEGORY', 'N'] },
      //                             {
      //                               $in: ['$ORDER_NO', {
      //                                 $setUnion: [
      //                                   {
      //                                     $map: {
      //                                       input: {
      //                                         $filter: {
      //                                           input: '$invoice_master',
      //                                           as: 'inv',
      //                                           cond: {
      //                                             $and: [
      //                                               { $eq: ['$$inv.CUSTOMER_ID', '1010174'] },
      //                                               {
      //                                                 $gte: ['$$inv.INVOICE_DATE', new Date(`2023-04-01`)]
      //                                               },
      //                                               {
      //                                                 $lte: ['$$inv.INVOICE_DATE', new Date(`2024-03-31`)]
      //                                               },
      //                                               { $ne: ['$$inv.BILLING_CATEGORY', 'N'] },
      //                                               { $eq: ['$$inv.DOCUMENT_TYPE', 'RV'] }
      //                                             ]
      //                                           }
      //                                         }
      //                                       },
      //                                       as: 'order',
      //                                       in: '$$order.ORDER_NO'
      //                                     }
      //                                   }
      //                                 ]
      //                               }]
      //                             }
      //                           ]
      //                         },
      //                         { $multiply: ['$PRICE', -1] },
      //                         0
      //                       ]
      //                     }
      //                   ]
      //                 }
      //               ]
      //             }
      //           }
      //         }
      //       }
      //     ]);
      //     console.log(data)
      //     res.send(data)
      // const customerID = '1010174'; // Replace with the actual customer ID

      // const query = [
      //       {
      //             $match: {
      //                   CUSTOMER_ID: customerID,
      //                   INVOICE_DATE: {
      //                         $gte: "2023-04-01",
      //                         $lte: "2024-03-31",
      //                   },
      //                   DOCUMENT_TYPE: 'RV',
      //             },
      //       },
            // {
            //       $group: {
            //             _id: null,
            //             SALES: {
            //                   $sum: {
            //                         $switch: {
            //                               branches: [
            //                                     {
            //                                           case: { $in: ['$BILLING_CATEGORY', ['M', 'P']] },
            //                                           then: '$PRICE',
            //                                     },
            //                                     {
            //                                           case: { $in: ['$BILLING_CATEGORY', ['O', 'S']] },
            //                                           then: { $multiply: ['$PRICE', -1] },
            //                                     },
            //                                     // {
            //                                     //       case: {
            //                                     //             $and: [
            //                                     //                   { $eq: ['$BILLING_CATEGORY', 'N'] },
            //                                     //                   {
            //                                     //                         $in: [
            //                                     //                               '$ORDER_NO',
            //                                     //                               {
            //                                     //                                     $map: {
            //                                     //                                           input: {
            //                                     //                                                 $filter: {
            //                                     //                                                       input: '$invoice_master',
            //                                     //                                                       as: 'invoice',
            //                                     //                                                       cond: {
            //                                     //                                                             $and: [
            //                                     //                                                                   // { $eq: '$$invoice.CUSTOMER_ID', customerID },
            //                                     //                                                             ],
            //                                     //                                                       },
            //                                     //                                                 },
            //                                     //                                           },
            //                                     //                                           as: 'invoice',
            //                                     //                                           in: '$$invoice.ORDER_NO',
            //                                     //                                     },
            //                                     //                               },
            //                                     //                         ],
            //                                     //                   },
            //                                     //             ],
            //                                     //       },
            //                                     //       then: { $multiply: ['$PRICE', -1] },
            //                                     // },
            //                               ],
            //                               default: 0,
            //                         },
            //                   },
            //             },
            //       },
            // },
     //];

      // Execute the MongoDB query using the Node.js MongoDB driver
      // const result = await invoice_master.aggregate(query)
      // const result2=await invoice_master.aggregate([
      //       {
      //         $match: {
      //           CUSTOMER_ID:customerID ,
      //           INVOICE_DATE: {
      //             $gte: "2023-04-01",
      //             $lte: "2024-03-31",
      //       },
      //           BILLING_CATEGORY: { $ne: 'N' },
      //           DOCUMENT_TYPE: 'RV'
      //         }
      //       },
      //       {
      //         $group: {
      //           _id: "$ORDER_NO"
      //         }
      //       }
      //     ]);
      //     var arr2=[]
      //     arr2.push(result2[0]._id)
      // console.log(arr2)
      // var arr=[]
      // var value=0
      // const repeat_item=await invoice_master.find({})
      //       console.log(repeat_item)
//       result.map(async(item,index)=>{
//             console.log(item.BILLING_CATEGORY)
            
//             if(item.BILLING_CATEGORY=='M'||item.BILLING_CATEGORY=='P'){
//                    value=Number(item.PRICE)
//                   arr.push(value)
//             }
//             else if(item.BILLING_CATEGORY=='O'||item.BILLING_CATEGORY=='S'){
//                   value=(item.PRICE*-1)
//                   arr.push(value)
//             }
//             else if(item.BILLING_CATEGORY=='N'&& arr2.includes(item.ORDER_NO)){
                  

//                    value=(item.PRICE*-1)
//                   arr.push(value)

//             }
//             else{
//                    value=0
//                   arr.push(value)

//             }
//       })

//       console.log(arr)
// let sum = 0;

// arr.forEach( num => {
//   sum += num;
// })

// console.log(sum) 

// }
}
const employee_customer_array = async (req, res) => {
      console.log("employee_customer_login")
      const employee = await employee_master.find({})
      console.log(employee.length)
      employee.map(async (items, index) => {
            const customers = await distributor_master.find({})
      })

}

const get_customer_balance_chart = async (req, res) => {
      console.log("get_customer_balance_chart")
}

const get_customer_by_emp = async (req, res) => {
      console.log("get_customer_by_emp")
}

const resetPasswordCustomerMob = async (req, res) => {
      console.log("resetPasswordCustomerMob")
}

const index = async (req, res) => {
      try{
        const distributor_data=await distributor_master.find({})
        if(distributor_data.length==0){
              res.send("no data found")
        }
        else{
              res.send(distributor_data)
        }
      }
      catch(error){
        res.status(400).send(error)
      }
  }
  

const update_customer = async (req, res) => {
      console.log("update_customer")
}

const update_distributor = async (req, res) => {
      console.log("update_distributor")
}

const customerLoginMob=async(req,res)=>{

      try{
            const CUSTOMER_ID=req.body.EMP_ID
            const CUSTOMER_PWD=req.body.EMP_PWD
           // console.log(CUSTOMER_ID)
            const data=await distributor_master.find({DISTRIBUTOR_ID:CUSTOMER_ID,PASSWORD:CUSTOMER_PWD})
            const emp_mapped=await employee_customer_mapping.find({CUSTOMER_ID:CUSTOMER_ID})
            const emp_data=await employee_master.find({EMP_ID:emp_mapped[0].EMP_ID})
            // console.log(data)
            // res.send(emp_mapped)
            if(data.length==0){
                  res.status(400).send("no data found")
            }
            else{
            

             const final_output=[{
                  "DISTRIBUTOR_ID": data[0].DISTRIBUTOR_ID,
        "DISTRIBUTOR_NAME": data[0].DISTRIBUTOR_NAME,
        "DISTRIBUTOR_EMAIL_ID": data[0].DISTRIBUTOR_EMAIL_ID,
        "DISTRIBUTOR_MOB_NO": data[0].DISTRIBUTOR_MOB_NO,
        "DISTRIBUTOR_DISTRICT":data[0].DISTRIBUTOR_DISTRICT ,
        "DISTRIBUTOR_STATE": data[0].DISTRIBUTOR_STATE,
        "DISTRIBUTOR_PINCODE": data[0].DISTRIBUTOR_PINCODE,
        "LICENCE_NO": data[0].LICENCE_NO,
        "DISTRIBUTOR_ADDRESS1": data[0].DISTRIBUTOR_ADDRESS1,
        "DISTRIBUTOR_ADDRESS2": data[0].DISTRIBUTOR_ADDRESS2,
        "DISTRIBUTOR_ADDRESS3": data[0].DISTRIBUTOR_ADDRESS3,
        "DISTRIBUTOR_GSTIN":data[0].DISTRIBUTOR_GSTIN,
        "DISTRIBUTOR_PAN":data[0].DISTRIBUTOR_PAN,
        "DISTRIBUTOR_AADHAR_ID": data[0].DISTRIBUTOR_AADHAR_ID,
        "DISTRIBUTOR_BANK_ACC_NO": data[0].DISTRIBUTOR_BANK_ACC_NO,
        "UPDATED_BY": data[0].UPDATED_BY,
        "UPDATED_ON": data[0].UPDATED_ON,
        "DISTRIBUTOR_LONG": data[0].DISTRIBUTOR_LONG,
        "DISTRIBUTOR_LAT": data[0].DISTRIBUTOR_LAT,
        "PRICE_GROUP": data[0].PRICE_GROUP,
        "FLAG": data[0].FLAG,
        "PASSWORD": data[0].PASSWORD,
        "REPORTING_MANAGER":emp_data[0].EMP_ID,
        "REPORTING_MANAGER_NAME":emp_data[0].EMP_NAME
             }]
             res.send(final_output)

            }
      }
      catch(error){
            res.status(400).send(error)
      }
}

module.exports = {
      api_update, update_customer,customerLoginMob, update_distributor, index, resetPasswordCustomerMob, get_customer_by_emp,
      get_customer_balance_chart, employee_customer_array, customer_login, create_distributor, create_one_distributor,
      create_farmer, create_one_farmer, create_retailer, create_one_retailer, create_customer_balance
}