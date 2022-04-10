const mongoose=require("mongoose")
const signupSchema=new mongoose.Schema({
    login_id: ({ type: mongoose.Schema.Types.ObjectId, ref: "signinData" }),
    uname:String,
    email:String,
    phone:Number,
    place:String,

})
const signupDB=mongoose.model("signupData",signupSchema)
module.exports=signupDB