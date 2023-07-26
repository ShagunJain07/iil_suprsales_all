const employee_master=require("../model/employee_master")
const distributor=require("../model/distributor_master")
const emp_customer=require("../model/emp_customer_mapping")
const balance=require("../model/customer_balance")
const invoice_data=require("../model/invoice_master")

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
      const id=req.query.id
      const password=req.query.password
      if(id==null||password==null){
            res.send("please enter id and password")}
      else{
      const employee_data=await employee_master.find({EMP_ID:id,PASSWORD:password})
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
            const current_year=new Date().getFullYear();
            const start_date=new Date(current_year+'-04-01')
            const end_date=new Date((current_year+1)+'-03-31')
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
                     const invoice_datas=await invoice_data.find({CUSTOMER_ID:{'$in':customers_array},INVOICE_DATE: { $gte: start_date, 
                     $lte: end_date 
                   }})
                  // console.log(invoice_datas)
const sum = invoice_datas.reduce((accumulator, object) => {
      return accumulator + object.PRICE;
    }, 0);


    const sum1 = invoice_datas.reduce((accumulator, object) => {
      return accumulator - object.PRODUCT_DISCOUNT;
    }, 0);

    const sum2 = invoice_datas.reduce((accumulator, object) => {
      return accumulator - object.CASH_DISCOUNT;
    }, 0);

    const cash_discount_total=sum2
   const product_discount_total=sum1
   const price_total=sum

   const all_price=(price_total-(product_discount_total+cash_discount_total))
   console.log("all_price",all_price)
     data_object.TOTAL=all_price
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