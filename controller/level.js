const level_master=require("../model/level_master")
const level_exp_rates=require("../model/level_exp_rates")
const user_monthly_expenses = require("../model/user_expense_rates")
const u_m_e=require("../model/user_monthly_expenses")
const emp_master=require("../model/employee_master")
const global_setting=require("../model/global_setting")
const createLevel=async(req,res)=>{
      try{
      const LEVEL_RANK_ID=req.body.LEVEL_RANK_ID
      const LEVEL_NAME=req.body.LEVEL_NAME
      const LEVEL_DESC=req.body.LEVEL_DESC

      const insert_data=await level_master.insertMany({LEVEL_RANK_ID:LEVEL_RANK_ID,LEVEL_NAME:LEVEL_NAME,LEVEL_DESC:LEVEL_DESC})
      res.send("inserted level successfully")
      }
      catch(error){
            res.status(404).send("error in function create level")
      }


}
const createLevelExpRates=async(req,res)=>{
      const LEVEL_RANK_ID=req.query.id 
      const DA_RATES_LOCAL=req.body.DA_RATES_LOCAL
      const DA_RATES_OUTST=req.body.DA_RATES_OUTST
      const EXP_PER_KM_RATE=req.body.EXP_PER_KM_RATE
      const EXP_BUS_TRAIN=req.body.EXP_BUS_TRAIN
      const EXP_PLANE=req.body.EXP_PLANE
      const EXP_TAXI_AUTO=req.body.EXP_TAXI_AUTO
      const EXP_VEH_REPAIR=req.body.EXP_VEH_REPAIR
      const EXP_HOTEL=req.body.EXP_HOTEL
      const EXP_STATIONARY=req.body.EXP_STATIONARY
      const EXP_MOBILE_INTERNET=req.body.EXP_MOBILE_INTERNET
      const EXP_MISC=req.body.EXP_MISC
      const EXP_FUEL=req.body.EXP_FUEL
      const MAX_ALLOWED_KM=req.body.MAX_ALLOWED_KM
      const EMP_ID=req.body.EMP_ID

      const add_exp_rates=await level_exp_rates.findOneAndUpdate({LEVEL_RANK_ID:LEVEL_RANK_ID},{$set:{LEVEL_RANK_ID:LEVEL_RANK_ID,DA_RATES_LOCAL:DA_RATES_LOCAL,DA_RATES_OUTST:DA_RATES_OUTST,EXP_PER_KM_RATE:EXP_PER_KM_RATE,EXP_BUS_TRAIN:EXP_BUS_TRAIN,EXP_PLANE:EXP_PLANE,EXP_TAXI_AUTO:EXP_TAXI_AUTO,EXP_VEH_REPAIR:EXP_VEH_REPAIR,EXP_HOTEL:EXP_HOTEL,EXP_STATIONARY:EXP_STATIONARY,EXP_MOBILE_INTERNET:EXP_MOBILE_INTERNET,EXP_MISC:EXP_MISC,EXP_FUEL:EXP_FUEL,MAX_ALLOWED_KM:MAX_ALLOWED_KM}})

      const monthly_exp_rates=await user_monthly_expenses.insertMany({DA_RATES_LOCAL:DA_RATES_LOCAL,DA_RATES_OUTST:DA_RATES_OUTST,EXP_PER_KM_RATE:EXP_PER_KM_RATE,EXP_BUS_TRAIN:EXP_BUS_TRAIN,EXP_PLANE:EXP_PLANE,EXP_TAXI_AUTO:EXP_TAXI_AUTO,EXP_VEH_REPAIR:EXP_VEH_REPAIR,EXP_HOTEL:EXP_HOTEL,EXP_STATIONARY:EXP_STATIONARY,EXP_MOBILE_INTERNET:EXP_MOBILE_INTERNET,EXP_MISC:EXP_MISC,EXP_FUEL:EXP_FUEL,MAX_ALLOWED_KM:MAX_ALLOWED_KM,EMPLOYEE_ID:EMP_ID,LEVEL_RANK_ID:LEVEL_RANK_ID})

      res.send("inserted")

}

const getEmpLevelExpRates=async(req,res)=>{
      const get_emp_exp=await user_monthly_expenses.find({})
         //console.log(get_emp_exp)
      const array=[]
      for(i=0;i<get_emp_exp.length;i++){
            
            const emp_data=await emp_master.find({EMP_ID:get_emp_exp[i].EMPLOYEE_ID})
            if(emp_data.length!=0){
            const level_data=await level_master.find({LEVEL_RANK_ID:get_emp_exp[i].LEVEL_RANK_ID})
            //console.log(emp_data)
            const output_set={...{DA_RATES_LOCAL:get_emp_exp[i].DA_RATES_LOCAL,DA_RATES_OUTST:get_emp_exp[i].DA_RATES_OUTST,EXP_PER_KM_RATE:get_emp_exp[i].EXP_PER_KM_RATE,EXP_BUS_TRAIN:get_emp_exp[i].EXP_BUS_TRAIN,EXP_PLANE:get_emp_exp[i].EXP_PLANE,EXP_TAXI_AUTO: get_emp_exp[i].EXP_TAXI_AUTO,
                  EXP_VEH_REPAIR: get_emp_exp[i].EXP_VEH_REPAIR,
                  EXP_HOTEL: get_emp_exp[i].EXP_HOTEL,
                  EXP_STATIONARY: get_emp_exp[i].EXP_STATIONARY,
                  EXP_MOBILE_INTERNET: get_emp_exp[i].EXP_MOBILE_INTERNET,
                  EXP_MISC: get_emp_exp[i].EXP_MISC,
                  EXP_FUEL: get_emp_exp[i].EXP_FUEL,
                  MAX_ALLOWED_KM: get_emp_exp[i].MAX_ALLOWED_KM,
                  EMPLOYEE_ID: get_emp_exp[i].EMPLOYEE_ID,
                  LEVEL_RANK_ID: get_emp_exp[i].LEVEL_RANK_ID},...{EMP_NAME:emp_data[0].EMP_NAME,VEHICLE_TYPE:emp_data[0].VEHICLE_TYPE,LEVEL_NAME:level_data[0].LEVEL_NAME}}
            array.push(output_set)
            }
      }
res.send(array)
}

const getEmployeeLevelExpRatesMob=async(req,res)=>{
      const EMPLOYEE_ID=req.query.id
      const get_emp_exp=await user_monthly_expenses.find({EMPLOYEE_ID:EMPLOYEE_ID})

      const array=[]
      
            const emp_data=await emp_master.find({EMP_ID:EMPLOYEE_ID})
            const user_monthly_expense_data=await u_m_e.find({EMP_ID:EMPLOYEE_ID})
            const level_data=await level_master.find({LEVEL_RANK_ID:get_emp_exp[0].LEVEL_RANK_ID})
            const output_set={...{DA_RATES_LOCAL:get_emp_exp[0].DA_RATES_LOCAL,DA_RATES_OUTST:get_emp_exp[0].DA_RATES_OUTST,EXP_PER_KM_RATE:get_emp_exp[0].EXP_PER_KM_RATE,EXP_BUS_TRAIN:get_emp_exp[0].EXP_BUS_TRAIN,EXP_PLANE:get_emp_exp[0].EXP_PLANE,EXP_TAXI_AUTO: get_emp_exp[0].EXP_TAXI_AUTO,
                  EXP_VEH_REPAIR: get_emp_exp[0].EXP_VEH_REPAIR,
                  EXP_HOTEL: get_emp_exp[0].EXP_HOTEL,
                  EXP_STATIONARY: get_emp_exp[0].EXP_STATIONARY,
                  EXP_MOBILE_INTERNET: get_emp_exp[0].EXP_MOBILE_INTERNET,
                  EXP_MISC: get_emp_exp[0].EXP_MISC,
                  EXP_FUEL: get_emp_exp[0].EXP_FUEL,
                  MAX_ALLOWED_KM: get_emp_exp[0].MAX_ALLOWED_KM,
                  EMPLOYEE_ID: get_emp_exp[0].EMPLOYEE_ID,
                  LEVEL_RANK_ID: get_emp_exp[0].LEVEL_RANK_ID},...{EMP_NAME:emp_data[0].EMP_NAME,VEHICLE_TYPE:emp_data[0].VEHICLE_TYPE,LEVEL_NAME:level_data[0].LEVEL_NAME,LEFT_ALLOWED_FUEL:user_monthly_expense_data[0].LEFT_ALLOWED_FUEL,LEFT_MAX_MOBILE_INTERNET:user_monthly_expense_data[0].LEFT_MAX_MOBILE_INTERNET,LEFT_MAX_MISC:user_monthly_expense_data[0].LEFT_MAX_MISC,LEFT_MAX_ALLOWED_KM:user_monthly_expense_data[0].LEFT_MAX_ALLOWED_KM}}
            array.push(output_set)
      
res.send(array)
} 
const getGlobalSettingMob=async(req,res)=>{
      const max_days=await global_setting.find({})
      res.send(max_days)

}

const getLevel=async(req,res)=>{
    const level_data=await level_master.find({})
    res.send(level_data)
}

const getLevelExpRates=async(req,res)=>{
      const LEVEL_RANK_ID=req.query.id

      const level_exp_data=await level_exp_rates.find({LEVEL_RANK_ID:LEVEL_RANK_ID})
      res.send(level_exp_data)
}

const globalSetting=async(req,res)=>{
      const MAX_CLAIM_DAYS_LIMIT=req.body.MAX_CLAIM_DAYS_LIMIT
  
      const add_data=await global_setting.findOneAndUpdate({id:1},{$set:{maxClaimDaysLimit:MAX_CLAIM_DAYS_LIMIT}})
      res.send("inserted")
  }

  const updateEmpLevelExpRates=async(req,res)=>{
     const EMPLOYEE_ID=req.query.id
     const LEVEL_RANK_ID=req.body.LEVEL_RANK_ID
      const DA_RATES_LOCAL=req.body.DA_RATES_LOCAL
      const DA_RATES_OUTST=req.body.DA_RATES_OUTST
      const EXP_PER_KM_RATE=req.body.EXP_PER_KM_RATE
      const EXP_BUS_TRAIN =req.body.EXP_BUS_TRAIN
const EXP_PLANE = req.body.EXP_PLANE
const EXP_TAXI_AUTO = req.body.EXP_TAXI_AUTO
const EXP_VEH_REPAIR =req.body.EXP_VEH_REPAIR
const EXP_HOTEL = req.body.EXP_HOTEL
const EXP_STATIONARY = req.body.EXP_STATIONARY
const EXP_MOBILE_INTERNET = req.body.EXP_MOBILE_INTERNET
const EXP_MISC = req.body.EXP_MISC
const EXP_FUEL = req.body.EXP_FUEL
const MAX_ALLOWED_KM = req.body.MAX_ALLOWED_KM

const update_data=await user_monthly_expenses.findOneAndUpdate({EMPLOYEE_ID:EMPLOYEE_ID},{$set:{LEVEL_RANK_ID:LEVEL_RANK_ID, DA_RATES_LOCAL:DA_RATES_LOCAL,DA_RATES_OUTST:DA_RATES_OUTST, EXP_PER_KM_RATE:EXP_PER_KM_RATE,EXP_BUS_TRAIN:EXP_BUS_TRAIN, EXP_PLANE:EXP_PLANE,EXP_TAXI_AUTO:EXP_TAXI_AUTO, EXP_VEH_REPAIR:EXP_VEH_REPAIR,EXP_HOTEL:EXP_HOTEL, EXP_STATIONARY:EXP_STATIONARY,EXP_MOBILE_INTERNET:EXP_MOBILE_INTERNET, EXP_MISC:EXP_MISC, CHANGED_STATUS:1,EXP_FUEL:EXP_FUEL,MAX_ALLOWED_KM:MAX_ALLOWED_KM}})
res.send(await user_monthly_expenses.find({EMPLOYEE_ID:EMPLOYEE_ID}))

  }
module.exports={
      createLevel,createLevelExpRates,getEmpLevelExpRates,getEmployeeLevelExpRatesMob,getGlobalSettingMob,getLevel,getLevelExpRates,globalSetting,updateEmpLevelExpRates
}