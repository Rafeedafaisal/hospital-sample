const mongoose=require("mongoose")
const labSchema=new mongoose.Schema({
    name:String,
      dept:String,
      mobile:Number,
      email:String,
     
      place:String
})
const labDB=mongoose.model("labdetails",labSchema)
module.exports=labDB