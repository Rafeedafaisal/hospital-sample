const { response } = require("express")
const express=require("express")
const doctorrouter=express.Router()
const check=require("../middleware/checkauth")
const appoiData=require("../Model/AppointmentData")
const doctADD=require("../Model/DoctorData")
doctorrouter.get("/doctorhome",check,(req,res)=>{
    const tokenValue=req.userData.id
    console.log("response  dataas are"+ typeof tokenValue);
 
    doctADD.findOne({login_id:tokenValue}).then((resp)=>{
        console.log("response  dataas are"+resp);
        console.log("doctor id from response data iis  "+resp._id);
        const id=resp._id;
        const drname=resp.name;

        appoiData.find({doctor_id:id}).then((response)=>{
            console.log("appointmentdetails displayedin doctors dash board"+response);
            res.status(200).json({
                detail:tokenValue,
                datas:response,
                doctorname:drname
            })
        })
       
    })  

    
    })
// doctorrouter.get("/schedule",check,(req,res)=>{
    
// })  
// doctorrouter.get("/doctorhome",check,(req,res)=>{
//     // const tokenValue=req.userData.id
//       appoiData.findOne({doctor_id:req.userData.id}).then((response)=>{
//         res.status(200).json({
//             detail:response
//         })
//       })

//     console.log("token value is"+tokenValue);
    
//     })  
    module.exports=doctorrouter
   