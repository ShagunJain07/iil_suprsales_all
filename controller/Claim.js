const claim_master=require("../model/employee_claim_master")
//const employee_claim_master=("../model/employee_claim_master.js")
const user_monthly_expenses=require("../model/user_monthly_expenses")
const employee_master=require("../model/employee_master")
const create_claim_Mob=async(req,res)=>{
      const employeeId = req.query.id;
      const CLAIM_ID=(await claim_master.countDocuments()+1)
      const daRatesLocal = req.body.DA_RATES_LOCAL;
      const daRatesOutst = req.body.DA_RATES_OUTST;
      const expFuel = req.body.EXP_FUEL;
      const expBusTrain = req.body.EXP_BUS_TRAIN;
      const expPlane = req.body.EXP_PLANE;
      const expTaxiAuto = req.body.EXP_TAXI_AUTO;
      const expVehRepair = req.body.EXP_VEH_REPAIR;
      const expHotel = req.body.EXP_HOTEL;
      const expStationary = req.body.EXP_STATIONARY;
      const expMobileInternet = req.body.EXP_MOBILE_INTERNET;
      const expMisc = req.body.EXP_MISC;
      const startKm = req.body.START_KM;
      const claimDate = req.body.CLAIM_DATE;
      const endKm = req.body.END_KM;
      const miscComments = req.body.MISC_COMMENTS;
      const totalClaimedAmount = req.body.TOTAL_CLAIMED_AMOUNT;
      const totalKm = endKm - startKm;

      const insert_data1=await claim_master.insertMany({...req.body,...{CLAIM_ID:CLAIM_ID,APPROVAL_STATUS:0,EMPLOYEE_ID:employeeId}})
      const user_monthly_expenses_data=await user_monthly_expenses.find({EMP_ID:employeeId})
     // console.log(user_monthly_expenses_data)
      const monthly_expense={
            LEFT_MAX_ALLOWED_FUEL:(user_monthly_expenses_data[0].LEFT_MAX_ALLOWED_FUEL)-expFuel,
            LEFT_MAX_MOBILE_INTERNET:(user_monthly_expenses_data[0].LEFT_MAX_MOBILE_INTERNET)-expMobileInternet,
            LEFT_MAX_MISC:(user_monthly_expenses_data[0].LEFT_MAX_MISC)-expMisc,
            LEFT_MAX_ALLOWED_KM:(user_monthly_expenses_data[0].LEFT_MAX_ALLOWED_KM)-totalKm
      }
      const update_monthly_expense=await user_monthly_expenses.findOneAndUpdate({EMP_ID:employeeId},{$set:monthly_expense})

      res.send("updated_successfully")
}

const approveClaim=async(req,res)=>{
      const CLAIM_ID=req.body.CLAIM_ID
      const APPROVAL_STATUS=req.body.APPROVAL_STATUS

      for(i=0;i<CLAIM_ID.length;i++){
            if(APPROVAL_STATUS==1){
                  const approve_all=await claim_master.findOneAndUpdate({CLAIM_ID:CLAIM_ID[i]},{$set:{APPROVAL_STATUS:1}})
                  
            }
            else if(APPROVAL_STATUS==2){
                  const reject_all=await claim_master.findOneAndUpdate({CLAIM_ID:CLAIM_ID[i]},{$set:{APPROVAL_STATUS:2}})
 
            }
      }
      res.send("approved")
}

const deleteClaimMob=async(req,res)=>{
      const CLAIM_ID=req.query.id
      const claim_data=await claim_master.find({CLAIM_ID:CLAIM_ID})
      console.log(claim_data)
      const monthly_expense=await user_monthly_expenses.find({EMPLOYEE_ID:claim_data[0].EMP_ID})
      console.log(monthly_expense)
      const totalKm=(claim_data[0].END_KM)-(claim_data[0].START_KM)
      const monthly_expense_update={
            LEFT_MAX_ALLOWED_FUEL:(monthly_expense[0].LEFT_MAX_ALLOWED_FUEL)+claim_data[0].EXP_FUEL,
            LEFT_MAX_MOBILE_INTERNET:(monthly_expense[0].LEFT_MAX_MOBILE_INTERNET)+claim_data[0].EXP_MOBILE_INTERNET,
            LEFT_MAX_MISC:(monthly_expense[0].LEFT_MAX_MISC)+claim_data[0].EXP_MISC,
            LEFT_MAX_ALLOWED_KM:(monthly_expense[0].LEFT_MAX_ALLOWED_KM)-totalKm
      }
      const update_claim=await user_monthly_expenses.findOneAndUpdate({EMPLOYEE_ID:claim_data[0].EMP_ID},{$set:monthly_expense_update})
      const delete_record=await claim_master.deleteOne({CLAIM_ID:CLAIM_ID})
      res.send("deleted")
}

const getAllClaim=async(req,res)=>{
      const START_DATE=req.query.start_date
      const end_date=req.query.end_date
      const approve_status=req.query.status
      const emp_id=req.query.emp_id
      const final=[]
      if(approve_status==''&&START_DATE!=null&&end_date!=null&&emp_id==''){
            const all_data=await claim_master.find({CLAIM_DATE:{
                  $gt: START_DATE,
                  $lt:end_date
              }},{_id:0,__v:0})
              for(i=0;i<all_data.length;i++){
                  // console.log(all_data[i])
            const employee=await employee_master.find({EMP_ID:all_data[i].EMPLOYEE_ID})
            //     console.log(employee[0])
                final.push({
                  "EXP_BUS_TRAIN": all_data[i].EXP_BUS_TRAIN,
        "EXP_TAXI_AUTO": all_data[i].EXP_TAXI_AUTO,
        "EXP_HOTEL": all_data[i].EXP_HOTEL,
        "EXP_STATIONARY": all_data[i].EXP_STATIONARY,
        "EXP_MOBILE_INTERNET": all_data[i].EXP_MOBILE_INTERNET,
        "DA_RATES_LOCAL": all_data[i].DA_RATES_LOCAL,
        "DA_RATES_OUTST": all_data[i].DA_RATES_OUTST,
        "EXP_PLANE": all_data[i].EXP_PLANE,
        "EXP_VEH_REPAIR": all_data[i].EXP_VEH_REPAIR,
        "EXP_MISC": all_data[i].EXP_MISC,
        "TOTAL_CLAIMED_AMOUNT": all_data[i].TOTAL_CLAIMED_AMOUNT,
        "CLAIM_DATE": all_data[i].CLAIM_DATE,
        "START_KM": all_data[i].START_KM,
        "MISC_COMMENTS": all_data[i].MISC_COMMENTS,
        "END_KM":all_data[i].END_KM,
        "EXP_FUEL": all_data[i].EXP_FUEL,
        "APPROVAL_STATUS": all_data[i].APPROVAL_STATUS,
        "CLAIM_ID": all_data[i].CLAIM_ID,
        "EMPLOYEE_ID": all_data[i].EMPLOYEE_ID,
        "EMPLOYEE_NAME":employee[0].EMP_NAME
                })
           // final.push({...all_data[i],...{EMPLOYEE_NAME:employee[0].EMP_NAME}})
      }
           // console.log(final)
            res.send(final)
      }
      else if(approve_status==''&&START_DATE==''&&end_date==''&&emp_id!=null)
      {
            const all_data=await claim_master.find({EMPLOYEE_ID:emp_id},{_id:0,__v:0})
            for(i=0;i<all_data.length;i++){
                  // console.log(all_data[i])
            const employee=await employee_master.find({EMP_ID:all_data[i].EMPLOYEE_ID})
            //     console.log(employee[0])
                final.push({
                  "EXP_BUS_TRAIN": all_data[i].EXP_BUS_TRAIN,
        "EXP_TAXI_AUTO": all_data[i].EXP_TAXI_AUTO,
        "EXP_HOTEL": all_data[i].EXP_HOTEL,
        "EXP_STATIONARY": all_data[i].EXP_STATIONARY,
        "EXP_MOBILE_INTERNET": all_data[i].EXP_MOBILE_INTERNET,
        "DA_RATES_LOCAL": all_data[i].DA_RATES_LOCAL,
        "DA_RATES_OUTST": all_data[i].DA_RATES_OUTST,
        "EXP_PLANE": all_data[i].EXP_PLANE,
        "EXP_VEH_REPAIR": all_data[i].EXP_VEH_REPAIR,
        "EXP_MISC": all_data[i].EXP_MISC,
        "TOTAL_CLAIMED_AMOUNT": all_data[i].TOTAL_CLAIMED_AMOUNT,
        "CLAIM_DATE": all_data[i].CLAIM_DATE,
        "START_KM": all_data[i].START_KM,
        "MISC_COMMENTS": all_data[i].MISC_COMMENTS,
        "END_KM":all_data[i].END_KM,
        "EXP_FUEL": all_data[i].EXP_FUEL,
        "APPROVAL_STATUS": all_data[i].APPROVAL_STATUS,
        "CLAIM_ID": all_data[i].CLAIM_ID,
        "EMPLOYEE_ID": all_data[i].EMPLOYEE_ID,
        "EMPLOYEE_NAME":employee[0].EMP_NAME
                })
           // final.push({...all_data[i],...{EMPLOYEE_NAME:employee[0].EMP_NAME}})
      }
           // console.log(final)
            res.send(final)
      }
      else if(approve_status!=null&&START_DATE==''&&end_date==''&&emp_id=='')
      {
            const all_data=await claim_master.find({APPROVAL_STATUS:approve_status},{_id:0,__v:0})
            for(i=0;i<all_data.length;i++){
                  // console.log(all_data[i])
            const employee=await employee_master.find({EMP_ID:all_data[i].EMPLOYEE_ID})
            //     console.log(employee[0])
                final.push({
                  "EXP_BUS_TRAIN": all_data[i].EXP_BUS_TRAIN,
        "EXP_TAXI_AUTO": all_data[i].EXP_TAXI_AUTO,
        "EXP_HOTEL": all_data[i].EXP_HOTEL,
        "EXP_STATIONARY": all_data[i].EXP_STATIONARY,
        "EXP_MOBILE_INTERNET": all_data[i].EXP_MOBILE_INTERNET,
        "DA_RATES_LOCAL": all_data[i].DA_RATES_LOCAL,
        "DA_RATES_OUTST": all_data[i].DA_RATES_OUTST,
        "EXP_PLANE": all_data[i].EXP_PLANE,
        "EXP_VEH_REPAIR": all_data[i].EXP_VEH_REPAIR,
        "EXP_MISC": all_data[i].EXP_MISC,
        "TOTAL_CLAIMED_AMOUNT": all_data[i].TOTAL_CLAIMED_AMOUNT,
        "CLAIM_DATE": all_data[i].CLAIM_DATE,
        "START_KM": all_data[i].START_KM,
        "MISC_COMMENTS": all_data[i].MISC_COMMENTS,
        "END_KM":all_data[i].END_KM,
        "EXP_FUEL": all_data[i].EXP_FUEL,
        "APPROVAL_STATUS": all_data[i].APPROVAL_STATUS,
        "CLAIM_ID": all_data[i].CLAIM_ID,
        "EMPLOYEE_ID": all_data[i].EMPLOYEE_ID,
        "EMPLOYEE_NAME":employee[0].EMP_NAME
                })
           // final.push({...all_data[i],...{EMPLOYEE_NAME:employee[0].EMP_NAME}})
      }
           // console.log(final)
            res.send(final)
      }
      else if(approve_status==''&&START_DATE!=''&&end_date!=''&&emp_id!=null)
      {
            const all_data=await claim_master.find({EMPLOYEE_ID:emp_id,CLAIM_DATE:{
                  $gt: START_DATE,
                  $lt:end_date
              }},{_id:0,__v:0})
            for(i=0;i<all_data.length;i++){
                  // console.log(all_data[i])
            const employee=await employee_master.find({EMP_ID:all_data[i].EMPLOYEE_ID})
            //     console.log(employee[0])
                final.push({
                  "EXP_BUS_TRAIN": all_data[i].EXP_BUS_TRAIN,
        "EXP_TAXI_AUTO": all_data[i].EXP_TAXI_AUTO,
        "EXP_HOTEL": all_data[i].EXP_HOTEL,
        "EXP_STATIONARY": all_data[i].EXP_STATIONARY,
        "EXP_MOBILE_INTERNET": all_data[i].EXP_MOBILE_INTERNET,
        "DA_RATES_LOCAL": all_data[i].DA_RATES_LOCAL,
        "DA_RATES_OUTST": all_data[i].DA_RATES_OUTST,
        "EXP_PLANE": all_data[i].EXP_PLANE,
        "EXP_VEH_REPAIR": all_data[i].EXP_VEH_REPAIR,
        "EXP_MISC": all_data[i].EXP_MISC,
        "TOTAL_CLAIMED_AMOUNT": all_data[i].TOTAL_CLAIMED_AMOUNT,
        "CLAIM_DATE": all_data[i].CLAIM_DATE,
        "START_KM": all_data[i].START_KM,
        "MISC_COMMENTS": all_data[i].MISC_COMMENTS,
        "END_KM":all_data[i].END_KM,
        "EXP_FUEL": all_data[i].EXP_FUEL,
        "APPROVAL_STATUS": all_data[i].APPROVAL_STATUS,
        "CLAIM_ID": all_data[i].CLAIM_ID,
        "EMPLOYEE_ID": all_data[i].EMPLOYEE_ID,
        "EMPLOYEE_NAME":employee[0].EMP_NAME
                })
           // final.push({...all_data[i],...{EMPLOYEE_NAME:employee[0].EMP_NAME}})
      }
           // console.log(final)
            res.send(final)
      }
     // const all_data=await claim_master.find({},{_id:0,__v:0})
           
}

const all_claims_by_empid=async(req,res)=>{
      const approver_id=req.query.id
      const start_date=req.query.start_date
      const end_date=req.query.end_date
      const year=req.query.year

      if(approver_id==null&&start_date!=null&&end_date!=null&&year!=null){
            const employee_data=await employee_master.find({APPROVER_ID:approver_id})
            for(i=0;i<employee_data.length;i++){
                  const emp=employee_data[i].EMP_ID
                 // console.log(emp)

            }
      }

}


module.exports={
      create_claim_Mob,approveClaim,deleteClaimMob,getAllClaim,all_claims_by_empid
}