const employee_master=require("../model/employee_master")
const distributor=require("../model/distributor_master")
const emp_customer=require("../model/emp_customer_mapping")
const balance=require("../model/customer_balance")
const user_master=require("../model/user")
const plant_area=require("../model/plant_master")
const area_master=require("../model/area_master")
const axios = require('axios');

const create_emp=async(req,res)=>{
      console.log("create_employee")
      let data = JSON.stringify({
            "DT_FROM": "2017-04-01",
            "DT_TO": "2023-05-30"
      });

      let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://192.168.1.204/api/GetData/GetEmployeeMaster?FROMDATE=2017-04-01&TODATE=2023-05-30',
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
                               console.log(items)
                              const new_detail =await employee_master.insertMany({...items,...{PASSWORD:123456}})
                        })
                        res.send("data inserted")

                  })
                  .catch((error) => {
                        console.log(error);
                  });

}

const employee_login=async(req,res)=>{
      try{
            const array1=[]
      const id=req.query.EMP_ID
      const password=req.query.EMP_PWD
      if(id==null||password==null){
            res.send("please enter id and password")}
      else{
            const users_data=await user_master.find({emp_id:id}) 
            if(users_data[0].password==password){
                  const employee_data=await employee_master.find({EMP_ID:id,PASSWORD:password,FLAG:1})

                  const emp_data=await employee_master.find({EMP_ID:employee_data[0].EMP_ID})

                  const area_data=await area_master.find({AREA_ID:employee_data[0].AREA_ID})
                  const emp_data2=await employee_master.find({EMP_ID:employee_data[0].APPROVER_ID})

                  const plant_data=await plant_area.find({PLANT_ID:employee_data[0].PLANT_ID})

                  const object1={
                        EMP_ID:employee_data[0].EMP_ID,
                        EMP_NAME:employee_data[0].EMP_NAME,
                        EMP_CODE:employee_data[0].EMP_CODE,
                        EMP_DESIGNATION:employee_data[0].EMP_DESIGNATION,
                        EMP_IMAGE:employee_data[0].EMP_IMAGE,
                        EMP_CONTRACT_TYPE:employee_data[0].EMP_CONTRACT_TYPE,
                        EMP_EMAIL:employee_data[0].EMP_EMAIL,
                        EMP_MOBILE_NO:employee_data[0].EMP_MOBILE_NO,
                        VEHICLE_OWNERSHIP:employee_data[0].VEHICLE_OWNERSHIP,
                        VEHICLE_TYPE:employee_data[0].VEHICLE_TYPE,
                        LEVEL_ID:employee_data[0].LEVEL_ID,
                        FLAG:employee_data[0].FLAG,
                        EMP_TYPE:employee_data[0].EMP_TYPE,
                        IS_ADMIN:employee_data[0].IS_ADMIN, 
                        REPORTING_MANAGEER_NAME:emp_data[0].EMP_NAME,
                        AREA_NAME:area_data[0].AREA_NAME,
                        APPROVER_NAME:emp_data2[0].EMP_NAME,
                        PLANT_NAME:plant_data[0].PLANT_NAME,
                        VEHICLE_OWNERSHIP:employee_data[0].VEHICLE_OWNERSHIP,
                        VEHICLE_TYPE:employee_data[0].VEHICLE_TYPE
                  }

array1.push(object1)

res.send(array1)

            }
      if(employee_data.length==0){
            res.status(404).send("no data found")
      }
      else{
       res.send(employee_data)
      }

}
      }
      catch(error){
            res.send("error in function employee login")
      }
}

const getEmp=async(req,res)=>{
      try{
  const employee_data=await employee_master.find({},{PASSWORD:0})
  res.send(employee_data)
      }
catch(error){
      res.send(error)
}
}
const emp_data=async(req,res)=>{
      try{
            const employee_data=await employee_master.find({EMP_ID:req.query.id})
            res.send(employee_data)
                }
          catch(error){
                res.send(error)
          } 
}
const all_reportee=async(req,res)=>{
      try{
            console.log("inside")
            const array1=[]
         const employee=req.query.id
         if(employee==null){
            res.send("please enter employee id")
         }
         else{
            const employee_reportees=await employee_master.find({REPORTING_MANAGER_ID:employee})
            for(i=0;i<employee_reportees.length;i++){
                  const data_object={
                        EMP_ID:employee_reportees[i].EMP_ID,
                        EMP_NAME:employee_reportees[i].EMP_NAME,
                        MOBILE_NO:employee_reportees[i].EMP_MOBILE_NO,
                        STATUS:employee_reportees[i].FLAG,
                        CUSTOMERS:[]
                  }
                  const customers=await emp_customer.find({EMP_ID:employee_reportees[i].EMP_ID})
                  const customers_array=[]

                  for(j=0;j<customers.length;j++){
                       
                        customers_array.push(customers[j].CUSTOMER_ID)

                  }
                 // console.log(customers_array)
                  const distributor_data=await distributor.find({DISTRIBUTOR_ID:{'$in':customers_array}})
                  for(k=0;k<distributor_data.length;k++){
                       
            const balance_data=await balance.find({CUSTOMER_ID:distributor_data[k].DISTRIBUTOR_ID})
            if(balance_data.length!=0){
            //console.log(balance_data)
            data_object.CUSTOMERS.push({CUSTOMER_ID:distributor_data[k].DISTRIBUTOR_ID,
                  CUSTOMER_NAME:distributor_data[k].DISTRIBUTOR_NAME,
            MOBILE_NO:distributor_data[k].DISTRIBUTOR_MOB_NO,
            REMAINING_CREDIT_LIMIT:balance_data[0].REMAINING_CREDIT_LIMIT

      })
}
else{
      data_object.CUSTOMERS.push({CUSTOMER_ID:distributor_data[k].DISTRIBUTOR_ID,
            CUSTOMER_NAME:distributor_data[k].DISTRIBUTOR_NAME,
      MOBILE_NO:distributor_data[k].DISTRIBUTOR_MOB_NO,
      REMAINING_CREDIT_LIMIT:null

})
}
                  }
                  array1.push(data_object)
            }
            res.send(array1)
         }
      }
      catch(error){
            console.log(error)
            res.send(error)
      }
}
module.exports={
      create_emp,employee_login,getEmp,emp_data,all_reportee
}