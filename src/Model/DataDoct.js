const mongoose=require("mongoose")
const doctorSchema=new mongoose.Schema({
    name:String,
      dept:String,
      qual:String,
      email:String,
      mobile:Number,
      place:String
})
const doctorsDB=mongoose.model("Doctorsinfo",doctorSchema)
module.exports=doctorsDB