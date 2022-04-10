const mongoose=require("mongoose")
const nurseSchema=new mongoose.Schema({
    name:String,
      dept:String,
     
      email:String,
      mobile:Number,
      place:String
})
const nurseDB=mongoose.model("NursesDetails",nurseSchema)
module.exports=nurseDB