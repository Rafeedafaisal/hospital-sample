const mongoose=require("mongoose")
const doctorSchema=new mongoose.Schema({
  login_id: ({ type: mongoose.Schema.Types.ObjectId, ref: "signinData" }),
    name:String,
      dept:String,
      qual:String,
      starttime:String,
      endtime:String,
      sunday:Boolean,
      monday:Boolean,
      tuesday:Boolean,
      wednessday:Boolean,
      thursday:Boolean,
      friday:Boolean,
      saturday:Boolean,
      email:String,
      mobile:Number,
      place:String,
      username:String,
      password:String
})
const doctorsDB=mongoose.model("DoctorDetails",doctorSchema)
module.exports=doctorsDB