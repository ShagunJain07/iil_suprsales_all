const customer_balance=require("../model/customer_balance")
const invoice_master=require("../model/invoice_master")
const packing_sku_master=require("../model/packing_sku_master")
const axios = require('axios');
const distributor_master=require("../model/distributor_master")
const emp_customer_mapping=require("../model/emp_customer_mapping")
const employee_master=require("../model/employee_master")
const ledger_master=require("../model/ledger_master")
const getAgingByCustId=async(req,res)=>{
  try{
  const customer_id=req.query.id
  if(customer_id==null){
    res.send("please enter customer_id")
  }
  else{
  const get_data=await customer_balance.find({CUSTOMER_ID:customer_id})
  res.send(get_data)
  }
}
  catch(error){
    res.send("error in function getAgingByCustId ")
  }
}
const getAgingByCustIdMob=async(req,res)=>{
  try{
  const customer_id=req.query.id
  if(customer_id==null){
    res.send("please enter customer_id")
  }
  else{
  const get_data=await customer_balance.find({CUSTOMER_ID:customer_id})
  res.send(get_data)
  }
}
  catch(error){
    res.send("error in function getAgingByCustId ")
  }
}

const add_balance=async(req,res)=>{
  let data = JSON.stringify({
    "DT_FROM": "2018-02-06",
    "DT_TO": "2023-02-06"
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://192.168.1.204:80/api/GetData/GetCustomerBalance?FROMDATE=2018-04-01&TODATE=2024-03-31',
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
                      const new_detail = await customer_balance.findOneAndUpdate({CUSTOMER_ID:items.CUSTOMER_ID},{$set:{items}})
                     // new_detail.save((respond, err) => {

                      })
               
                res.send("data inserted")
          })
          
          .catch((error) => {
                console.log(error);
          });

}

const graph_product2=async(req,res)=>{

  const CUSTOMER_ID=req.query.id
  const pipeline = [
    {
      $match: {
        CUSTOMER_ID: CUSTOMER_ID,
        INVOICE_DATE: {
          $gte: "2023-04-01",
          $lte: "2024-03-31",
        },
        DOCUMENT_TYPE: 'RV'
      }
    }
  ];
  
  const result = await invoice_master.aggregate(pipeline)


  result.map(async(item,index)=>{
    //console.log(item.BILLING_CATEGORY)
    
    if(item.BILLING_CATEGORY=='M'||item.BILLING_CATEGORY=='P'){
           value=Number(item.PRICE)
          arr.push(value)
    }
    else if(item.BILLING_CATEGORY=='O'||item.BILLING_CATEGORY=='S'){
          value=(item.PRICE*-1)
          arr.push(value)
    }
    else if(item.BILLING_CATEGORY=='N'&& arr2.includes(item.ORDER_NO)){
          

           value=(item.PRICE*-1)
          arr.push(value)

    }
    else{
           value=0
          arr.push(value)

    }
})
 // console.log(result);
  
}

const invoice_data=async(req,res)=>{
  let data = JSON.stringify({
    "DT_FROM": "2021-05-01",
    "DT_TO": "2021-05-10"
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://192.168.1.204/api/GetData/GetInvoice?FROMDATE=2021-05-01&TODATE=2021-05-10',
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
                      data.map(async (items, index) => {
                        const packing=await packing_sku_master.find({SKU_ID:items.SKU_ID})
                        if(packing.length!==0){
                     //   console.log(packing[0].SKU_ID)
                        const new_detail = await invoice_master.insertMany({...items,...{SKU_CATEGORY:packing[0].SKU_CATEGORY}})}
                      //const new_detail = await invoice_master.insertMany({items})
                    })
                      res.send("data inserted")
          }).catch((error) => {
                console.log(error);
          });

}

const currentVsLastSales=async(req,res)=>{
      const final=[]
     const customer_id=req.query.id
     const all_years=[]
     const current_year=new Date().getFullYear();
     const last_year=(current_year-1)
     const last2_year=(current_year-2)
     all_years.push(current_year,last_year,last2_year)
     for(i=0;i<all_years.length;i++){
      const start_date=new Date(all_years[i]+'-04-01')
      const end_date=new Date((all_years[i]+1)+'-03-31')
     // console.log(start_date,end_date)
      const data= await invoice_master.aggregate([
        {$match: {
          INVOICE_DATE: {
              $gte:  start_date,
              $lte:  end_date}
            ,
          CUSTOMER_ID:customer_id}
        },
  
        {
          $group: {
            _id: {
              month: { $month: "$INVOICE_DATE" }
            },
            totalPrice: { $sum: '$PRICE' },
          totalDiscount1: { $sum: { $toDouble: "$CASH_DISCOUNT" } },
          totalDiscount2: { $sum:{ $toDouble: "$PRODUCT_DISCOUNT" } }
          }
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            netPrice: {
              $add: [
                '$totalPrice',
                { $add: ['$totalDiscount1', '$totalDiscount2'] }
              ]
            }
          }
        }
      ])

      const monthNumbers = [4, 5, 6, 7, 8, 9, 10, 11, 12,1,2,3];

      const arrangedData = monthNumbers.map((monthNumber) => {
        const dataItem = data.find(item => item.month === monthNumber);
        if (dataItem) {
          return {
            PRICE: (dataItem.netPrice).toFixed(2),
            MONTH: String(monthNumber)
          };
        } else {
          return {
            PRICE: '0.00',
            MONTH: String(monthNumber)
          };
        }
      });
      
      const totalSales = data.reduce((total, item) => total + item.netPrice, 0);
      
      const finalResult = [...arrangedData, { TOTAL_SALES: totalSales.toFixed(2) }];
      
      //console.log(finalResult);
      // })
     // res.send(finalResult)
     final.push(finalResult)
    }

   res.send(final)

}



const graph_product=async(req,res)=>{
  const customer_id=req.query.id
  const final=[
  ]

  const all_sku=[]
  const current_year=new Date().getFullYear();
  
    const start_date=new Date(current_year+'-04-01')
    const end_date=new Date((current_year+1)+'-03-31')
     const data= await invoice_master.aggregate([
      {$match: {
        SKU_CATEGORY:"SPS-REGULAR",
        INVOICE_DATE: {
            $gte:  start_date,
            $lte:  end_date}
          ,
        CUSTOMER_ID:customer_id}
      },

      {
        $group: {
          _id: {
            category: "$MATERIAL_GROUP",
            month: { $month: "$INVOICE_DATE" }
          },
          totalPrice: { $sum: '$PRICE' },
          totalDiscount1: { $sum: {$toDouble:'$CASH_DISCOUNT'}},
          totalDiscount2: { $sum: {$toDouble:'$PRODUCT_DISCOUNT'} }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id.category",
          month: "$_id.month",
          netPrice: {
            $add: [
              '$totalPrice',
              { $add: ['$totalDiscount1', '$totalDiscount2'] }
            ]
          }
        }
      }
    ])
    data.map(async (data_output, index) => {
      let num = final.findIndex(items => items.category == data_output.category)
      if (num == -1) {
          final.push({
             "MAT":data_output.category
          })
      }
      else if (num != -1) {
        final.push({
          "MAT":data_output.category
       })
      }
      
    
  })

  const groupedData = data.reduce((result, item) => {
    const key = item.category;
    if (!result[key]) {
      result[key] = {
        category: item.category,
        months: []
      };
    }
    result[key].months.push({
      month: item.month,
      netPrice: item.netPrice
    });
    return result;
  }, {});
  
  const finalResult = Object.values(groupedData);
  
  //console.log(finalResult);
    //  await invoice_master.find({SKU_CATEGORY:"SCP-REGULAR",CUSTOMER_ID:customer_id,INVOICE_DATE:{
    //   $gte: start_date,
    //   $lte: end_date
    // }})
    // console.log(data)
    // const groupedData = data.reduce((acc, obj) => {
    //   const { MATERIAL_GROUP } = obj;
    //   if (!acc[MATERIAL_GROUP]) {
    //     acc[MATERIAL_GROUP] = [];
    //   }
    //   acc[MATERIAL_GROUP].push({"GROUP_ID":obj.MATERIAL_GROUP});
    //   return acc;
    // }, {});
    //nconsole.log(groupedData);
    const monthsAbbreviation = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const arrangedData = data.reduce((result, item) => {
      const { category, month, netPrice } = item;
      const existingCategory = result.find(entry => entry.MATERIAL_GROUP === category);
      
      if (existingCategory) {
        existingCategory[monthsAbbreviation[month - 1]] = netPrice.toFixed(7);
      } else {
        const newCategory = {
          MATERIAL_GROUP: category,
          MATERIAL_DESC: '', // Add the appropriate field value here
        };
        monthsAbbreviation.forEach((abbr, index) => {
          if (index + 1 === month) {
            newCategory[abbr] = netPrice.toFixed(7);
          } else {
            newCategory[abbr] = '0.00';
          }
        });
        result.push(newCategory);
      }
    
      return result;
    }, []);
    
   // console.log(arrangedData);   
    res.send(arrangedData)

}



const salesBySkuCategory=async(req,res)=>{
  let final=[]
  const customer_id=req.query.id
  const sku_category=req.query.cat
  const all_years=[]
  const current_year=new Date().getFullYear();
  const last_year=(current_year-1)
  const last2_year=(current_year-2)
  all_years.push(current_year,last_year,last2_year)
  for(i=0;i<all_years.length;i++){
   const start_date=new Date(all_years[i]+'-04-01')
   const end_date=new Date((all_years[i]+1)+'-03-31')
  // console.log(start_date,end_date)
   const data= await invoice_master.aggregate([
    {$match: {
      SKU_CATEGORY:sku_category,
      INVOICE_DATE: {
          $gte:  start_date,
          $lte:  end_date}
        ,
      CUSTOMER_ID:customer_id}
    },

    {
      $group: {
        _id: {
          month: { $month: "$INVOICE_DATE" }
        },
        totalPrice: { $sum: '$PRICE' },
      totalDiscount1: { $sum: '$CASH_DISCOUNT' },
      totalDiscount2: { $sum: '$PRODUCT_DISCOUNT' }
      }
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        netPrice: {
          $add: [
            '$totalPrice',
            { $add: ['$totalDiscount1', '$totalDiscount2'] }
          ]
        }
      }
    }
  ])

  const monthNumbers = [4, 5, 6, 7, 8, 9, 10, 11, 12,1, 2, 3];

  const arrangedData = monthNumbers.map((monthNumber) => {
    const dataItem = data.find(item => item.month === monthNumber);
    if (dataItem) {
      return {
        PRICE: (dataItem.netPrice).toFixed(7),
        MONTH: String(monthNumber)
      };
    } else {
      return {
        PRICE: '0.00',
        MONTH: String(monthNumber)
      };
    }
  });
  
  const totalSales = data.reduce((total, item) => total + item.netPrice, 0);
  
  const finalResult = [...arrangedData, { TOTAL_SALES: totalSales.toFixed(15) }];
  
  //console.log(finalResult);
  // })
 // res.send(finalResult)
 final.push(finalResult)
}

res.send(final)

}

const skuBySkuCategory=async(req,res)=>{
  const final=[]
  const customer_id=req.query.id
  const all_years=[]
  const current_year=new Date().getFullYear();
  const last_year=(current_year-1)
  const last2_year=(current_year-2)
  all_years.push(current_year,last_year,last2_year)
  //for(i=0;i<all_years.length;i++){
   const start_date=new Date(current_year+'-04-01')
   const end_date=new Date((current_year+1)+'-03-31')
   //console.log(start_date,end_date)
   const data= await invoice_master.aggregate([
     {$match: {
       INVOICE_DATE: {
           $gte:  start_date,
           $lte:  end_date}
         ,
       CUSTOMER_ID:customer_id}
     },

     {
       $group: {
         _id: {
           month: { $month: "$INVOICE_DATE" },
           category: "$MATERIAL_GROUP",

         },

         totalquantity: { $sum: '$BOX_QUANTITY' },
      
       }
     },
     {
       $project: {
         _id: 0,
         month: "$_id.month",
         category: "$_id.category",
         netquantity: "$totalquantity"
       }
     }
   ])
   const groupedData = data.reduce((acc, item) => {
    const month = item.month;
    acc[month] = acc[month] || [];
    acc[month].push(item);
    return acc;
}, {});

// Prepare the result in the desired format
const result = Object.entries(groupedData).map(([month, group]) => {
    const materialDesc = group.map(item => item.category);
    const quantitySum = group.map(item => item.netquantity.toFixed(4));
    return {
        "MATERIAL_DESC": materialDesc,
        "QUANTITY_SUM": quantitySum,
        "MONTH": month
    };
});

//console.log(result);
 //}

res.send(result)
}


const topmost_product=async(req,res)=>{
  const final=[]
  const customer_id=req.query.id
  const current_year=new Date().getFullYear();
  const start_date=new Date(current_year+'-04-01')
  const end_date=new Date((current_year+1)+'-03-31')
  const data= await invoice_master.aggregate([
    {$match: {
      INVOICE_DATE: {
          $gte:  start_date,
          $lte:  end_date}
        ,
      CUSTOMER_ID:customer_id}
    },

    {
      $group: {
        _id: {
          category: "$SKU_CATEGORY",

        },
        totalPrice: { $sum: '$PRICE' },
        totalDiscount1: { $sum: {$toDouble:'$CASH_DISCOUNT'}},
        totalDiscount2: { $sum: {$toDouble:'$PRODUCT_DISCOUNT'} }
     
      }
    },
    {
      $project: {
        _id: 0,
      
        category: "$_id.category",
        netquantity: {
          $add: [
            '$totalPrice',
            { $add: ['$totalDiscount1', '$totalDiscount2'] }
          ]
        }
       // netquantity: "$totalquantity"
      }
    }
  ])
  const groupedData = data.reduce((acc, item) => {
    const category = item.category;
    acc[category] = acc[category] || 0;
    acc[category] += item.netquantity;
    return acc;
}, {});

// Prepare the result in the desired format
const result = Object.entries(groupedData).map(([category, totalSku]) => {
    return {
        "SKU_CATEGORY": category,
        "TOTAL_SKU": totalSku.toFixed(7)
    };
});

// Sort the result in descending order by total SKU
result.sort((a, b) => b.TOTAL_SKU - a.TOTAL_SKU);

//console.log(result);


  res.send(result)
}
const getAllSkuCatgory=async(req,res)=>{
  const data=await packing_sku_master.distinct('SKU_CATEGORY')
  const arrangedList = data.map(category => ({ SKU_CATEGORY: category }));
res.send(arrangedList)
}

const getCustomerByCustId=async(req,res)=>{
  const distributor=req.query.id

  const distributor_data=await distributor_master.find({DISTRIBUTOR_ID:distributor})
  res.send(distributor_data)
}


const getCustomerDetailById=async(req,res)=>{
  const distributor=req.query.id
  const distributor_data=await distributor_master.find({DISTRIBUTOR_ID:distributor})
  
  const emp_customer_data=await emp_customer_mapping.find({CUSTOMER_ID:distributor_data[0].DISTRIBUTOR_ID})

  const emp_data=await employee_master.find({EMP_ID:emp_customer_data[0].EMP_ID})

  const data_final=[{
    DISTRIBUTOR_ID:distributor_data[0].DISTRIBUTOR_ID,
    DISTRIBUTOR_NAME:distributor_data[0].DISTRIBUTOR_NAME,
    DISTRIBUTOR_MOB_NO:distributor_data[0].DISTRIBUTOR_MOB_NO,
    DISTRIBUTOR_EMAIL_ID:distributor_data[0].DISTRIBUTOR_EMAIL_ID,
    DISTRIBUTOR_DISTRICT:distributor_data[0].DISTRIBUTOR_DISTRICT,
    REGION_ID:distributor_data[0].REGION_ID,
    EMP_ID:emp_customer_data[0].EMP_ID,
    EMP_NAME:emp_data[0].EMP_NAME
  }]
  res.send(data_final)
}

const getLedgerByCustId=async(req,res)=>{
  const distributor=req.query.id
  const ledger_data=await ledger_master.find({CUSTOMER_ID:distributor}).sort({TRANSACTION_TIME:-1})
  res.send(ledger_data)
}



const getLedgerByCustIdMob=async(req,res)=>{
  const distributor=req.query.id
  const ledger_data=await ledger_master.find({CUSTOMER_ID:distributor}).sort({TRANSACTION_TIME:-1})
  res.send(ledger_data)
}


const monthlySalesMob=async(req,res)=>{
  const customer_id=req.query.id
  const current_year=new Date().getFullYear();
  const start_date=new Date(current_year+'-04-01')
  const end_date=new Date((current_year+1)+'-03-31')
  const data= await invoice_master.aggregate([
    {$match: {
      SKU_CATEGORY:"SCP-REGULAR",
      INVOICE_DATE: {
          $gte:  start_date,
          $lte:  end_date}
        ,
      CUSTOMER_ID:customer_id}
    },

    {
      $group: {
        _id: {
          category: "$MATERIAL_GROUP",
          month: { $month: "$INVOICE_DATE" }
        },
        totalPrice: { $sum: '$PRICE' },
      totalDiscount1: { $sum: '$CASH_DISCOUNT' },
      totalDiscount2: { $sum: '$PRODUCT_DISCOUNT' }
      }
    },
    {
      $project: {
        _id: 0,
        category: "$_id.category",
        month: "$_id.month",
        netPrice: {
          $add: [
            '$totalPrice',
            { $add: ['$totalDiscount1', '$totalDiscount2'] }
          ]
        }
      }
    }
  ])
 // console.log(data)
  const materialSale = [];

  data.forEach(item => {
    const category = item.category;
    const month = item.month;
    const netPrice = item.netPrice;
  
    let group = materialSale.find(group => group.GROUP_ID === category);
  
    if (!group) {
      group = {
        GROUP_ID: category,
        APR: null,
        MAY: null,
        JUN: null,
        JUL: null,
        AUG: null,
        SEP: null,
        OCT: null,
        NOV: null,
        DEC: null,
        JAN: null,
        FEB: null,
        MAR: null
      };
      materialSale.push(group);
    }
  
    switch (month) {
      case 4:
        group.APR = netPrice.toString();
        break;
      case 5:
        group.MAY = netPrice.toString();
        break;
      case 6:
        group.JUN = netPrice.toString();
        break;
      case 7:
        group.JUL = netPrice.toString();
        break;
      case 8:
        group.AUG = netPrice.toString();
        break;
      case 9:
        group.SEP = netPrice.toString();
        break;
      case 10:
        group.OCT = netPrice.toString();
        break;
      case 11:
        group.NOV = netPrice.toString();
        break;
      case 12:
        group.DEC = netPrice.toString();
        break;
      case 1:
        group.JAN = netPrice.toString();
        break;
      case 2:
        group.FEB = netPrice.toString();
        break;
      case 3:
        group.MAR = netPrice.toString();
        break;
      default:
        break;
    }
  });
  
  const result = { MATERIAL_SALE: materialSale };
  //console.log(result);
  const monthData = [
    {
      APR: '0',
      MAY: '0',
      JUN: '0',
      JUL: '0',
      AUG: '0',
      SEP: '0',
      OCT: '0',
      NOV: '0',
      DEC: '0',
      JAN: '0',
      FEB: '0',
      MAR: '0'
    }
  ];
  
  data.forEach(item => {
    const month = item.month;
    const netPrice = item.netPrice;
  
    switch (month) {
      case 4:
        monthData[0].APR = (parseFloat(monthData[0].APR) + netPrice).toString();
        break;
      case 5:
        monthData[0].MAY = (parseFloat(monthData[0].MAY) + netPrice).toString();
        break;
      case 6:
        monthData[0].JUN = (parseFloat(monthData[0].JUN) + netPrice).toString();
        break;
      case 7:
        monthData[0].JUL = (parseFloat(monthData[0].JUL) + netPrice).toString();
        break;
      case 8:
        monthData[0].AUG = (parseFloat(monthData[0].AUG) + netPrice).toString();
        break;
      case 9:
        monthData[0].SEP = (parseFloat(monthData[0].SEP) + netPrice).toString();
        break;
      case 10:
        monthData[0].OCT = (parseFloat(monthData[0].OCT) + netPrice).toString();
        break;
      case 11:
        monthData[0].NOV = (parseFloat(monthData[0].NOV) + netPrice).toString();
        break;
      case 12:
        monthData[0].DEC = (parseFloat(monthData[0].DEC) + netPrice).toString();
        break;
      case 1:
        monthData[0].JAN = (parseFloat(monthData[0].JAN) + netPrice).toString();
        break;
      case 2:
        monthData[0].FEB = (parseFloat(monthData[0].FEB) + netPrice).toString();
        break;
      case 3:
        monthData[0].MAR = (parseFloat(monthData[0].MAR) + netPrice).toString();
        break;
      default:
        break;
    }
  });
  
  const result2 = { MONTH: monthData };
  //console.log(result2);
  const final_output=[]
  final_output.push({...result,...result2})
  res.send(final_output)
// Populate data for each category and month


}

const salesBySkuCategoryMob=async(req,res)=>{
  const final_output=[]
  const customer_id=req.query.id
  const current_year=new Date().getFullYear();
  const all_years=[]
  all_years.push(current_year,current_year-1,current_year-2)
  //console.log(all_years)
  for(i=0;i<all_years.length;i++){

    const start_date=new Date(all_years[i]+'-04-01')
    const end_date=new Date((all_years[i]+1)+'-03-31')
  const data= await invoice_master.aggregate([
    {$match: {
      INVOICE_DATE: {
          $gte:  start_date,
          $lte:  end_date}
        ,
      CUSTOMER_ID:customer_id}
    },

    {
      $group: {
        _id: {
          category: "$SKU_CATEGORY",
        },
        totalPrice: { $sum: '$PRICE' },
        totalDiscount1: { $sum: {$toDouble:'$CASH_DISCOUNT'}},
        totalDiscount2: { $sum: {$toDouble:'$PRODUCT_DISCOUNT'} }
      }
    },
    {
      $project: {
        _id: 0,
        category: "$_id.category",
        netPrice: {
          $add: [
            '$totalPrice','$totalDiscount1','$totalDiscount2'
            // { $add: ['$totalDiscount1', '$totalDiscount2'] }
          ]
        }
      }
    }
  ])
  data.forEach(item => {
    if(all_years[i]==current_year){
      final_output.push({...item,...{year:'2022'}})

    }
    else if(all_years[i]==current_year-1){
      final_output.push({...item,...{year:'2021'}})
    }
    else if(all_years[i]==current_year-2){
      final_output.push({...item,...{year:'2020'}})
    }
   
    // "SKU_CATEGORY":item.category,
    // current_year:item.netPrice
    // }
    // final_output.push(data_add)
  })

 // console.log(data)
  }
  //console.log(final_output)
  const output = final_output.reduce((result, item) => {
    const { category, netPrice, year } = item;
    const skuCategory = category;
    const yearKey = year.toString();
  
    // Find the existing entry for the SKU_CATEGORY
    let existingEntry = result.find(entry => entry.SKU_CATEGORY == skuCategory);
  
    if (!existingEntry) {
      // Create a new entry if it doesn't exist
      existingEntry = {
        SKU_CATEGORY: skuCategory,
        '2020': null,
        '2021': null,
        '2022': null
      };
      result.push(existingEntry);
    }
  
    // Set the netPrice for the corresponding year
    existingEntry[yearKey] = netPrice;
  
    return result;
  }, []);
  
  res.send(output);
}

const currentVsLastSalesMob=async(req,res)=>{
  const data_to_send=[]
  const final_output=[]
  const customer_id=req.query.id
  const total=[]
  const total2=[]
  const total3=[]
  const current_year=new Date().getFullYear();
  const all_years=[]
  all_years.push(current_year,current_year-1,current_year-2)
  //console.log(all_years)
  for(i=0;i<all_years.length;i++){
    const start_date=new Date(all_years[i]+'-04-01')
    const end_date=new Date((all_years[i]+1)+'-03-31')
  const data= await invoice_master.aggregate([
    {$match: {
      INVOICE_DATE: {
          $gte:  start_date,
          $lte:  end_date}
        ,
      CUSTOMER_ID:customer_id}
    },

    {
      $group: {
        _id: {
          month: { $month: "$INVOICE_DATE" },
          
        },
        totalPrice: { $sum: '$PRICE' },
      totalDiscount1: { $sum: '$CASH_DISCOUNT' },
      totalDiscount2: { $sum: '$PRODUCT_DISCOUNT' }
      }
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        netPrice: {
          $add: [
            '$totalPrice',
            { $add: ['$totalDiscount1', '$totalDiscount2'] }
          ]
        }
      }
    }
  ])
  final_output.push(data)
  // console.log(i,data)
  const sales = {
    CURRENT_YEAR_SALES: [
      {
        APR: "0.000",
        MAY: "0.000",
        JUN: "0.000",
        JUL: "0.000",
        AUG: "0.000",
        SEP: "0.000",
        OCT: "0.000",
        NOV: "0.000",
        DEC: "0.000",
        JAN: "0.000",
        FEB: "0.000",
        MAR: "0.000"
      }
    ]
  };
  
  data.forEach(item => {
    const month = item.month;
    const netPrice = item.netPrice;
    if (month == 4) {
      sales.CURRENT_YEAR_SALES[0].APR = netPrice.toString();
    } else if (month == 5) {
      sales.CURRENT_YEAR_SALES[0].MAY = netPrice.toString();
    } else if (month == 6) {
      sales.CURRENT_YEAR_SALES[0].JUN = netPrice.toString();
    } else if (month == 7) {
      sales.CURRENT_YEAR_SALES[0].JUL = netPrice.toString();
    } else if (month == 8) {
      sales.CURRENT_YEAR_SALES[0].AUG = netPrice.toString();
    } else if (month == 9) {
      sales.CURRENT_YEAR_SALES[0].SEP = netPrice.toString();
    } else if (month == 10) {
      sales.CURRENT_YEAR_SALES[0].OCT = netPrice.toString();
    } else if (month == 11) {
      sales.CURRENT_YEAR_SALES[0].NOV = netPrice.toString();
    } else if (month == 12) {
      sales.CURRENT_YEAR_SALES[0].DEC = netPrice.toString();
    } else if (month == 1) {
      sales.CURRENT_YEAR_SALES[0].JAN = netPrice.toString();
    } else if (month == 2) {
      sales.CURRENT_YEAR_SALES[0].FEB = netPrice.toString();
    } else if (month == 3) {
      sales.CURRENT_YEAR_SALES[0].MAR = netPrice.toString();
    }
  });
  
  //console.log(sales);
  
  
  
  
  
  
  

  
  
  }
  const all_data=
  {
    "CURRENT_YEAR_SALES": "0.000",
    "LAST_YEAR_SALES": "0.000",
    "LAST_YEAR2_SALES": "0.000",
}
for(j=0;j<final_output.length;j++){

if(j==0){

  const sales = {
    CURRENT_YEAR_SALES: [
      {
        APR: "0.000",
        MAY: "0.000",
        JUN: "0.000",
        JUL: "0.000",
        AUG: "0.000",
        SEP: "0.000",
        OCT: "0.000",
        NOV: "0.000",
        DEC: "0.000",
        JAN: "0.000",
        FEB: "0.000",
        MAR: "0.000"
      }
    ]
  };
  
  final_output[0].forEach(item => {
    const month = item.month;
    const netPrice = item.netPrice;
    total.push(item.netPrice)

    if (month == 4) {
      sales.CURRENT_YEAR_SALES[0].APR = netPrice.toString();
    } else if (month == 5) {
      sales.CURRENT_YEAR_SALES[0].MAY = netPrice.toString();
    } else if (month == 6) {
      sales.CURRENT_YEAR_SALES[0].JUN = netPrice.toString();
    } else if (month == 7) {
      sales.CURRENT_YEAR_SALES[0].JUL = netPrice.toString();
    } else if (month == 8) {
      sales.CURRENT_YEAR_SALES[0].AUG = netPrice.toString();
    } else if (month == 9) {
      sales.CURRENT_YEAR_SALES[0].SEP = netPrice.toString();
    } else if (month == 10) {
      sales.CURRENT_YEAR_SALES[0].OCT = netPrice.toString();
    } else if (month == 11) {
      sales.CURRENT_YEAR_SALES[0].NOV = netPrice.toString();
    } else if (month == 12) {
      sales.CURRENT_YEAR_SALES[0].DEC = netPrice.toString();
    } else if (month == 1) {
      sales.CURRENT_YEAR_SALES[0].JAN = netPrice.toString();
    } else if (month == 2) {
      sales.CURRENT_YEAR_SALES[0].FEB = netPrice.toString();
    } else if (month == 3) {
      sales.CURRENT_YEAR_SALES[0].MAR = netPrice.toString();
    }

    let sum = 0;
 
// Running the for loop
for (let i = 0; i < total.length; i++) {
    sum += total[i];
}
all_data.CURRENT_YEAR_SALES=sum.toString()
  });
  data_to_send.push(sales)
  // console.log(sales);
}
  else if(j==1){

    const sales1 = {
      LAST_YEAR_SALES: [
        {
          APR: "0.000",
          MAY: "0.000",
          JUN: "0.000",
          JUL: "0.000",
          AUG: "0.000",
          SEP: "0.000",
          OCT: "0.000",
          NOV: "0.000",
          DEC: "0.000",
          JAN: "0.000",
          FEB: "0.000",
          MAR: "0.000"
        }
      ]
    };
    
    final_output[1].forEach(items => {
      const month = items.month;
      const netPrice = items.netPrice;
    total2.push(items.netPrice)
      if (month == 4) {
        sales1.LAST_YEAR_SALES[0].APR = netPrice.toString();
      } else if (month == 5) {
        sales1.LAST_YEAR_SALES[0].MAY = netPrice.toString();
      } else if (month == 6) {
        sales1.LAST_YEAR_SALES[0].JUN = netPrice.toString();
      } else if (month == 7) {
        sales1.LAST_YEAR_SALES[0].JUL = netPrice.toString();
      } else if (month == 8) {
        sales1.LAST_YEAR_SALES[0].AUG = netPrice.toString();
      } else if (month == 9) {
        sales1.LAST_YEAR_SALES[0].SEP = netPrice.toString();
      } else if (month == 10) {
        sales1.LAST_YEAR_SALES[0].OCT = netPrice.toString();
      } else if (month == 11) {
        sales1.LAST_YEAR_SALES[0].NOV = netPrice.toString();
      } else if (month == 12) {
        sales1.LAST_YEAR_SALES[0].DEC = netPrice.toString();
      } else if (month == 1) {
        sales1.LAST_YEAR_SALES[0].JAN = netPrice.toString();
      } else if (month == 2) {
        sales1.LAST_YEAR_SALES[0].FEB = netPrice.toString();
      } else if (month == 3) {
        sales1.LAST_YEAR_SALES[0].MAR = netPrice.toString();
      }
      let sum = 0;
 
      // Running the for loop
      for (let i = 0; i < total2.length; i++) {
          sum += total2[i];
      }
      all_data.LAST_YEAR_SALES=sum.toString()
    });
    data_to_send.push(sales1)
    // console.log(sales1);
    }
    else if(j==2){

      const sales2 = {
        LAST_YEAR2_SALES: [
          {
            APR: "0.000",
            MAY: "0.000",
            JUN: "0.000",
            JUL: "0.000",
            AUG: "0.000",
            SEP: "0.000",
            OCT: "0.000",
            NOV: "0.000",
            DEC: "0.000",
            JAN: "0.000",
            FEB: "0.000",
            MAR: "0.000"
          }
        ]
      };
      
      final_output[2].forEach(items => {
        const month = items.month;
        const netPrice = items.netPrice;
    total3.push(items.netPrice)
        if (month == 4) {
          sales2.LAST_YEAR2_SALES[0].APR = netPrice.toString();
        } else if (month == 5) {
          sales2.LAST_YEAR2_SALES[0].MAY = netPrice.toString();
        } else if (month == 6) {
          sales2.LAST_YEAR2_SALES[0].JUN = netPrice.toString();
        } else if (month == 7) {
          sales2.LAST_YEAR2_SALES[0].JUL = netPrice.toString();
        } else if (month == 8) {
          sales2.LAST_YEAR2_SALES[0].AUG = netPrice.toString();
        } else if (month == 9) {
          sales2.LAST_YEAR2_SALES[0].SEP = netPrice.toString();
        } else if (month == 10) {
          sales2.LAST_YEAR2_SALES[0].OCT = netPrice.toString();
        } else if (month == 11) {
          sales2.LAST_YEAR2_SALES[0].NOV = netPrice.toString();
        } else if (month == 12) {
          sales2.LAST_YEAR2_SALES[0].DEC = netPrice.toString();
        } else if (month == 1) {
          sales2.LAST_YEAR2_SALES[0].JAN = netPrice.toString();
        } else if (month == 2) {
          sales2.LAST_YEAR2_SALES[0].FEB = netPrice.toString();
        } else if (month == 3) {
          sales2.LAST_YEAR2_SALES[0].MAR = netPrice.toString();
        }
        let sum = 0;
 
        // Running the for loop
        for (let i = 0; i < total3.length; i++) {
            sum += total3[i];
        }
        all_data.LAST_YEAR2_SALES=sum.toString()
      });
      data_to_send.push(sales2)
      // console.log(sales2);
      }
     
      // console.log(all_data)
     
}
// data_to_send.push(all_data)
let sending_data = []
sending_data.push(all_data)
sending_data.push(data_to_send[0])
sending_data.push(data_to_send[1])
sending_data.push(data_to_send[2])

res.send(sending_data)
 // console.log(final_output.length)
}



const salesByMonthAndCategoryMob=async(req,res)=>{
  const final=[]
 const customer_id=req.query.id
 const current_year=new Date().getFullYear();
  const all_years=[]
  all_years.push(current_year,current_year-1,current_year-2)
  // console.log(all_years)
  for(i=0;i<all_years.length;i++){
    const start_date=new Date(all_years[i]+'-04-01')
    const end_date=new Date((all_years[i]+1)+'-03-31')
  const data= await invoice_master.aggregate([
    {$match: {
      INVOICE_DATE: {
          $gte:  start_date,
          $lte:  end_date}
        ,
      CUSTOMER_ID:customer_id}
    },

    {
      $group: {
        _id: {
          category: "$MATERIAL_GROUP",
          year: { $year: "$INVOICE_DATE" },
         
          group:"$SKU_CATEGORY"
        },
        totalPrice: { $sum: '$PRICE' },
        totalDiscount1: { $sum: {$toDouble:'$CASH_DISCOUNT'}},
        totalDiscount2: { $sum: {$toDouble:'$PRODUCT_DISCOUNT'} }
      }
    },
    {
      $project: {
        _id: 0,
       
        year: "$_id.year",
        category:"$_id.category",
        group:"$_id.group",
        netPrice: {
          $add: [
            '$totalPrice','$totalDiscount1','$totalDiscount2'
            // { $add: ['$totalDiscount1', '$totalDiscount2'] }
          ]
        }
      //    netPrice:"$totalPrice",
      // CASH:"$totalDiscount1",
      // PRODUCT:"$totalDiscount2"
      }
    }
  ])

  
 // final.push(result)
  //console.log(result);
  //res.send(result)]\[]
  for(j=0;j<data.length;j++){
   // console.log(data[j].year)
    if(i==0){
      const op={...data[j],...{year2:2022}}
      final.push(op)
    }
    else if(i==1){
      const op={...data[j],...{year2:2021}}
      final.push(op)
    }
    else if(i==2){
      const op={...data[j],...{year2:2020}}
      final.push(op)
    }
    
  }
}
 console.log(final)
const groupedData = {};
for (const item of final) {
  const { category, group, year2 } = item;
  if (!groupedData[group]) {
    groupedData[group] = {};
  }
  if (!groupedData[group][category]) {
    groupedData[group][category] = {
      GROUP_NAME: category,
      2021: null,
      2022: null,
      2020: null,
    };
  }
  groupedData[group][category][year2] = item.netPrice;
}

// Convert grouped data to the desired format
const arrangedData = [];
for (const group in groupedData) {
  const skuCategory = { SKU_CATEGORY: group, SKU: [] };
  for (const category in groupedData[group]) {
    skuCategory.SKU.push(groupedData[group][category]);
  }
  arrangedData.push(skuCategory);
}

// Sort the arranged data based on the year2 field
arrangedData.sort((a, b) => {
  const aYear2 = a.SKU[0][2020];
  const bYear2 = b.SKU[0][2020];
  return bYear2 - aYear2;
});

// console.log(arrangedData);
const new_data=[]
for(t=0;t<all_years.length;t++){
  const start_date=new Date(all_years[t]+'-04-01')
  const end_date=new Date((all_years[t]+1)+'-03-31')
const month_wise_data=await invoice_master.aggregate([
  {$match: {
    INVOICE_DATE: {
        $gte:  start_date,
        $lte:  end_date}
      ,
    CUSTOMER_ID:customer_id}
  },

  {
    $group: {
      _id: {
        year: { $year: "$INVOICE_DATE" },
        month: { $month: "$INVOICE_DATE" },
        group:"$SKU_CATEGORY"
      },
      totalPrice: { $sum: '$PRICE' },
    totalDiscount1: { $sum: {$toDouble:'$CASH_DISCOUNT'}},
    totalDiscount2: { $sum: {$toDouble:'$PRODUCT_DISCOUNT'} }
    }
  },
  {
    $project: {
      _id: 0,
      month:"$_id.month",
      year: "$_id.year",
      group:"$_id.group",
      netPrice: {
        $add: [
          '$totalPrice',
          { $add: ['$totalDiscount1', '$totalDiscount2'] }
        ]
      }
      // netPrice:"$totalPrice",
      // CASH:"$totalDiscount1",
      // PRODUCT:"$totalDiscount2"
    }
  }
])

for(k=0;k<month_wise_data.length;k++){
  if(t==0){
    new_data.push({...month_wise_data[k],...{year2:2022}})
  
  }
  else  if(t==1){
    new_data.push({...month_wise_data[k],...{year2:2021}})
  
  }
  else  if(t==2){
    new_data.push({...month_wise_data[k],...{year2:2020}})
  
  }
}


}

function arrangeDatanw(new_data) {
  const result = {};
  const groups = {};

  for (const entry of new_data) {
    const { month, year2, group, netPrice } = entry;
    const yearKey = year2;
    const monthKey = getMonthKey(month);

    if (!groups[group]) {
      groups[group] = {
        SKU_CATEGORY: group,
        2022: generateMonthsData(),
        2021: generateMonthsData(),
        2020: generateMonthsData(),
      };
    }

    if (groups[group][yearKey] && groups[group][yearKey][monthKey] !== undefined) {
      groups[group][yearKey][monthKey] = netPrice;
    }
  }

  for (const group in groups) {
    result[group] = groups[group];
  }

  return Object.values(result);
}

function generateMonthsData() {
  const monthsData = {};
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (const month of months) {
    monthsData[month] = null;
  }

  return monthsData;
}

function getMonthKey(month) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[month - 1];
}

// Your input array
const inputData = [
  {
    // ... (your data)
  },
];

const arrangedDatasss = arrangeDatanw(new_data);
// console.log(arrangedDatasss);

// for(m=0;m<arrangedDatasss.length;m++){
//   console.log(arrangedDatasss[m].2022)

// }

arrangedData.forEach(object => {
  object[2020] = [];
  object[2021] = [];
  object[2022] = [];

});

arrangedDatasss.map(async(items, index)=> {
for(n=0;n<arrangedData.length;n++){
  if(items.SKU_CATEGORY==arrangedData[n].SKU_CATEGORY){
    arrangedData[n]={...arrangedData[n],...{2022:[items[2022]]},...{2021:[items[2021]]},...{2020:[items[2020]]}}
  }
}
// console.log(items.SKU_CATEGORY)
})
// const fetched2022Objects = arrangedDatasss.map(item => item['2022']);
res.send(arrangedData)
// console.log(fetched2022Objects);
}

const viewLedgerMob=async(req,res)=>{

  try{

    const customer_id=req.query.id
    const current_year=new Date().getFullYear();
    
    const output_fetch=[
    
    ]
    const all_years=[]
    all_years.push(current_year,current_year-1,current_year-2)
    for(i=0;i<all_years.length;i++){
      const start_date=new Date(all_years[i]+'-04-01')
      const end_date=new Date((all_years[i]+1)+'-03-31')
     
      const ledger_data=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME:{ $gte: start_date, 
      $lte:end_date 
    }}).sort({TRANSACTION_TIME:-1})
       if(all_years[i]==current_year){
        const opening_balance=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME:{ $gte:new Date((current_year-1)+'-04-01'), 
          $lte:new Date(current_year+'-03-31') 
        }}).sort({TRANSACTION_TIME:-1}).limit(1);
// console.log(opening_balance)
        output_fetch.push({2022:[{CLOSING_BALANCE:ledger_data[0].BALANCE,OPENING_BALANCE:opening_balance[0].BALANCE},{LEDGER:ledger_data}]})
       }
       else if(all_years[i]==current_year-1){
        const opening_balance=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME:{ $gte:new Date((current_year-2)+'-04-01'), 
        $lte:new Date((current_year-1)+'-03-31') 
      }}).sort({TRANSACTION_TIME:-1}).limit(1);
        output_fetch.push({2021:[{CLOSING_BALANCE:ledger_data[0].BALANCE,OPENING_BALANCE:opening_balance[0].BALANCE},{LEDGER:ledger_data}]})
       }
       else if(all_years[i]==current_year-2){
        const opening_balance=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME:{ $gte:new Date((current_year-3)+'-04-01'), 
        $lte:new Date((current_year-2)+'-03-31') 
      }}).sort({TRANSACTION_TIME:-1}).limit(1);
      if(opening_balance.length==0){
        output_fetch.push({2020:[{CLOSING_BALANCE:ledger_data[0].BALANCE,OPENING_BALANCE:0},{LEDGER:ledger_data}]})
      }
      else{
        output_fetch.push({2020:[{CLOSING_BALANCE:ledger_data[0].BALANCE,OPENING_BALANCE:opening_balance[0].BALANCE},{2020:ledger_data}]})
      }
      }
    }
     res.send(output_fetch)
  }
  catch(error){
    console.log(error)
    res.status(404).send("error")
  }
}
module.exports={
  viewLedgerMob,salesByMonthAndCategoryMob,getAgingByCustIdMob,getLedgerByCustIdMob,monthlySalesMob,salesBySkuCategoryMob,currentVsLastSalesMob,getAgingByCustId,getCustomerByCustId,getLedgerByCustId,getCustomerDetailById,add_balance,invoice_data,graph_product,currentVsLastSales,salesBySkuCategory,skuBySkuCategory,topmost_product,getAllSkuCatgory
}