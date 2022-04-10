const mongoose=require("mongoose")
const signinSchema= new mongoose.Schema({
    username:String,
    password:String,
    role:String,
    resetToken:String,
    expireToken:Date
})
const signinDB=mongoose.model("signinData",signinSchema)
module.exports=signinDB