const axios = require('axios');
const { MongoClient } = require('mongodb');

const schema_distributor = require("../model/distributor_master")


const add_data = async (req, res) => {
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
                        const new_detail = new schema_distributor({...items,...{PASSWORD:"123456"}})
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


const get_data=async(req,res)=>{
      const all_data=await schema_distributor.find({})
      res.send(all_data)
}

// const axios = require('axios');
// const { MongoClient } = require('mongodb');

// const url = 'mongodb://localhost:27017';
// const dbName = 'yourDatabaseName';
// const collectionName = 'yourCollectionName';

// const data = {
//   FROMDATE: '2018-03-26',
//   TODATE: '2023-03-26'
// };

// axios.post('http://192.168.1.204/api/GetData/GetCustomerMaster', data)
//   .then(async (response) => {
//     const newYummy = response.data.Data;
//     const client = await MongoClient.connect(url);
//     const db = client.db(dbName);
//     //const collection = db.collection(collectionName);
// console.log(newYummy)
//   })

//     newYummy.forEach(async (user) => {
//       const distributor_id = user.DISTRIBUTOR_ID;
//       const DISTRIBUTOR = user.DISTRIBUTOR_NAME;
//       const DISTRIBUTOR_EMAIL_ID = user.DISTRIBUTOR_EMAIL_ID;
//       const DISTRIBUTOR_MOB_NO = user.DISTRIBUTOR_MOB_NO;
//       const DISTRIBUTOR_DISTRICT = user.DISTRIBUTOR_DISTRICT;
//       const DISTRIBUTOR_STATE = user.DISTRIBUTOR_STATE;
//       const DISTRIBUTOR_PINCODE = user.DISTRIBUTOR_PINCODE;
//       const IIL_LICENCE_NO = user.LICENCE_NO;
//       const DISTRIBUTOR_ADD = user.DISTRIBUTOR_ADDRESS1;
//       const DISTRIBUTOR_ADDRESS2 = user.DISTRIBUTOR_ADDRESS2;
//       const DISTRIBUTOR_ADDRESS3 = user.DISTRIBUTOR_ADDRESS3;
//       const DISTRIBUTOR_GSTIN = user.DISTRIBUTOR_GSTIN;
//       const DISTRIBUTOR_PAN = user.DISTRIBUTOR_PAN;
//       const DISTRIBUTOR_AADHAR_ID = user.DISTRIBUTOR_AADHAR_ID;
//       const DISTRIBUTOR_BANK_ACC_NO = user.DISTRIBUTOR_BANK_ACC_NO;
//       const UPDATED_BY = user.UPDATED_BY;
//       const DISTRIBUTOR_LONG = user.DISTRIBUTOR_LONG;
//       const UPDATED_ON = user.UPDATED_ON;
//       const DISTRIBUTOR_LAT = user.DISTRIBUTOR_LAT;
//       const FLAG = user.FLAG;

//       const DISTRIBUTOR_NAME = DISTRIBUTOR.replace("'", "\'");
//       const DISTRIBUTOR_ADDRESS1 = DISTRIBUTOR_ADD.replace("'", "\'");
//       const hashed_password = await bcrypt.hash('123456', 10);

//       const count_query = { emp_id: DISTRIBUTOR_ID };
//       const count_cust = await collection.countDocuments(count_query);

//       let users_query;
//       if (count_cust === 0) {
//         users_query = {
//           emp_id: DISTRIBUTOR_ID,
//           name: DISTRIBUTOR_NAME,
//           email: DISTRIBUTOR_EMAIL_ID,
//           password: hashed_password,
//           flag: 1,
//           USER_TYPE: 2
//         };
//       } else {
//         users_query = {
//           $set: {
//             emp_id: DISTRIBUTOR_ID,
//             name: DISTRIBUTOR_NAME,
//             email: DISTRIBUTOR_EMAIL_ID,
//             password: hashed_password,
//             flag: 1,
//             USER_TYPE: 2
//           }
//         };
//       }

//       collection.updateOne(count_query, users_query, { upsert: true }, (err) => {
//         if (err) {
//           console.error('Error while inserting/updating user:', err);
//         } else {
//           console.log('User inserted/updated successfully');
//         }
//       });

//       const distributorData = {
//         DISTRIBUTOR_ID,
//         DISTRIBUTOR_NAME,
//         DISTRIBUTOR_EMAIL_ID,
//         DISTRIBUTOR_MOB_NO,
//         DISTRIBUTOR_DISTRICT,
//         DISTRIBUTOR_STATE,
//         DISTRIBUTOR_PINCODE,
//         IIL_LICENCE_NO,
//         DISTRIBUTOR_ADDRESS1,
//         DISTRIBUTOR_ADDRESS2,
//         DISTRIBUTOR_ADDRESS3,
//         DISTRIBUTOR_GSTIN,
//         DISTRIBUTOR_PAN,

//       }


const login=async(req,res)=>{
      const id=req.query.distributor_id
      const password=req.query.password

      const login_data=await schema_distributor.find({DISTRIBUTOR_ID:id,PASSWORD:password})
       res.send(login_data)

}
module.exports = {
      add_data,get_data,login
}