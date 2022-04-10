const express=require("express")
const doctDB=require("../Model/DoctorData")
const appoiDB=require("../Model/AppointmentData")
const patientrouter=express.Router()
const check=require("../middleware/checkauth")
patientrouter.get("/Listdoctor",(req,res)=>{
    doctDB.find().then((response)=>{
        res.status(200).json({
            detail:response
        })
    })
})
patientrouter.get("/Appointment/:id",(req,res)=>{
    const id=req.params.id
    doctDB.findOne({_id:id}).then((response)=>{
        res.status(200).json({
            detail:response
        })
    })
})


// adminrouter.get("/editdr/:id",(req,res)=>{
//     const id=req.params.id
//     doctADD.findOne({_id:id}).then((response)=>{
//         res.status(200).json({
//             detail:response
//         })
//     })
// })



patientrouter.post("/appointment/:id",(req,res)=>{
    const doctorid=req.params.id
doctDB.findOne({_id:doctorid}).then((details)=>{
var id=details._id
const items={
    doctor_id:id,
    name:req.body.name,
    age:req.body.age,
    mobile:req.body.mobile,
    place:req.body.place,
    date:req.body.date
}
const appoiData=appoiDB(items)
appoiData.save().then((response)=>{
    console.log("appointment datas saved"+response);
    res.status(200).json({
        detail:response
    })
})
})
   
   
})
patientrouter.get("/patienthome",check,(req,res)=>{
const tokenValue=req.userData.name
console.log("token value is"+tokenValue);
res.status(200).json({
    detail:tokenValue
})
})
module.exports=patientrouter