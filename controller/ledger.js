const ledger_master=require("../model/ledger_master")
const distributor_master=require("../model/distributor_master")

const createLedger=async(req,res)=>{
      
}
const openingBalance=async(req,res)=>{
  try{
      const customer_id=req.query.id
  const current_year=new Date().getFullYear();
  const start_date=new Date(current_year+'-04-01')
  const end_date=new Date((current_year+1)+'-03-31')
  //  console.log(start_date)
  //  console.log(end_date)
  const ledger_data=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME: {
    $gte:  start_date,
    $lte:  end_date}}).sort({TRANSACTION_TIME:-1}).limit(1)
     
    res.send(ledger_data)}
    catch{
      res.send("no data found")
    }

}

const viewLedgerMob=async(req,res)=>{
  try{
  const customer_id=req.query.id
  const current_year=new Date().getFullYear();
  const type_code=req.query.code

  const start_date=new Date(current_year+'-04-01')
  const end_date=new Date((current_year+1)+'-03-31')
  const ledger_data=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME: {
    $gte:  start_date,
    $lte:  end_date},CUST_TYPE_CODE:"NA"})
    res.send(ledger_data)}
    catch{
      res.send("no data found")
    }
}

const viewLedgerCustomer=async(req,res)=>{
  try{
//   const customer_id=req.query.id
//   const current_year=new Date().getFullYear();
//   const start_date=new Date(current_year+'-04-01')
//   const end_date=new Date((current_year+1)+'-03-31')
//   const last_start_date=new Date((current_year-1)+'-04-01')
//   const last_end_date=new Date(current_year+'-03-31')
//   const ledger_closing_balance=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME: {
//     $gte:  start_date,
//     $lte:  end_date}}).sort({TRANSACTION_TIME:-1}).limit(1)

//     const ledger_opening_balance=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME: {
//       $gte:  last_start_date,
//       $lte:  last_end_date}}).sort({TRANSACTION_TIME:-1}).limit(1)
      
//       const ledger_balance=[{
//         CUSTOMER_ID:ledger_closing_balance[0].CUSTOMER_ID,
//         CUSTOMER_NAME:ledger_closing_balance[0].CUSTOMER_NAME,
//         CLOSING_BALANCE:ledger_closing_balance[0].BALANCE,
//         OPENING_BALANCE:ledger_opening_balance[0].BALANCE,
//         LEDGER_DETAIL:[]

//       }]
//       const ledger_data=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME: {
//         $gte:  start_date,
//         $lte:  end_date}})
//         //console.log(ledger_data.length)
//         for(i=0;i<ledger_data.length;i++){
//           ledger_balance[0].LEDGER_DETAIL.push(ledger_data[i])
//         }
// res.send(ledger_balance)}
  const customer_id=req.query.id
  const current_year=Number(req.query.year)
  const start_date=new Date(current_year+'-04-01')
  const end_date=new Date((current_year+1)+'-03-31')
  const last_start_date=new Date((current_year-1)+'-04-01')
  const last_end_date=new Date(current_year+'-03-31')
  const distributor_data=await distributor_master.find({DISTRIBUTOR_ID:customer_id})
  //console.log(distributor_data)
  const ledger_closing_balance=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME: {
    $gte:  start_date,
    $lte:  end_date}}).sort({TRANSACTION_TIME:-1}).limit(1)
//console.log(ledger_closing_balance)
    const ledger_opening_balance=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME: {
      $gte:  last_start_date,
      $lte:  last_end_date}}).sort({TRANSACTION_TIME:-1}).limit(1)
      //console.log(ledger_opening_balance)

      if(ledger_closing_balance.length==0&&ledger_opening_balance.length==0){
        //console.log("inside1")

        const ledger_balance=[{
          CUSTOMER_ID:distributor_data[0].DISTRIBUTOR_ID,
          CUSTOMER_NAME:distributor_data[0].DISTRIBUTOR_NAME,
          CLOSING_BALANCE:null,
          OPENING_BALANCE:null,
          LEDGER_DETAIL:[]
  
        }]
        res.send(ledger_balance)

      }
      else if(ledger_closing_balance.length==0){
        //console.log("inside2")

        const ledger_balance=[{
          CUSTOMER_ID:distributor_data[0].DISTRIBUTOR_ID,
          CUSTOMER_NAME:distributor_data[0].DISTRIBUTOR_NAME,
          CLOSING_BALANCE:null,
          OPENING_BALANCE:ledger_opening_balance[0].BALANCE,
          LEDGER_DETAIL:[]
  
        }]
        const ledger_data=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME: {
          $gte:  start_date,
          $lte:  end_date}})
          //console.log(ledger_data.length)
          for(i=0;i<ledger_data.length;i++){
            ledger_balance[0].LEDGER_DETAIL.push(ledger_data[i])
          }
  res.send(ledger_balance)
      }
      else if(ledger_opening_balance.length==0){
       // console.log("inside3")

        const ledger_balance=[{
          CUSTOMER_ID:distributor_data[0].DISTRIBUTOR_ID,
          CUSTOMER_NAME:distributor_data[0].DISTRIBUTOR_NAME,
          CLOSING_BALANCE:ledger_closing_balance[0].BALANCE,
          OPENING_BALANCE:null,
          LEDGER_DETAIL:[]
  
        }]
        const ledger_data=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME: {
          $gte:  start_date,
          $lte:  end_date}})
          //console.log(ledger_data.length)
          for(i=0;i<ledger_data.length;i++){
            ledger_balance[0].LEDGER_DETAIL.push(ledger_data[i])
          }
  res.send(ledger_balance)
      }
     else if(ledger_closing_balance.length!=0&&ledger_opening_balance.length!=0){
      //console.log("inside4")
      const ledger_balance=[{
        CUSTOMER_ID:distributor_data[0].DISTRIBUTOR_ID,
        CUSTOMER_NAME:distributor_data[0].DISTRIBUTOR_NAME,
        CLOSING_BALANCE:ledger_closing_balance[0].BALANCE,
        OPENING_BALANCE:ledger_opening_balance[0].BALANCE,
        LEDGER_DETAIL:[]

      }]
      const ledger_data=await ledger_master.find({CUSTOMER_ID:customer_id,TRANSACTION_TIME: {
        $gte:  start_date,
        $lte:  end_date}})
        //console.log(ledger_data.length)
        for(i=0;i<ledger_data.length;i++){
          ledger_balance[0].LEDGER_DETAIL.push(ledger_data[i])
        }
res.send(ledger_balance)
}
}
catch(error){
  res.send(error)
}
}
module.exports={
  openingBalance,viewLedgerMob,viewLedgerCustomer
}