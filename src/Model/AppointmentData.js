
const mongoose=require("mongoose")
const appointmentSchema=new mongoose.Schema({
    doctor_id:({type:mongoose.Schema.Types.ObjectId,ref:"DoctorDetails"}),
    name:String,
      age:Number,
     
    
      mobile:Number,
      place:String,
      date:Date
})
const appointmentDB=mongoose.model("AppointmentDetails",appointmentSchema)
module.exports=appointmentDB