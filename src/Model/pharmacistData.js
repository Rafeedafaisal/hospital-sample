const mongoose=require("mongoose")
const pharmSchema=new mongoose.Schema({
    name:String,
      
      mobile:Number,
      email:String,
     
      place:String
})
const pharmDB=mongoose.model("pharmacist",pharmSchema)
module.exports=pharmDB