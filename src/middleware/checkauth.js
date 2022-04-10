const jwt=require("jsonwebtoken")
//callback function
module.exports=(req,res,next)=>{
    try{
        // statement to split header from the token
        const token=req.headers.authorization.split(" ")[1];
console.log("after splitting the token is "+token);
//verify method is used to decode token ,it will select data
const decodeToken=jwt.verify(token,"secretkey");
req.userData={id:decodeToken.id};
// console.log("username in checkauth is "+req.userData.name);
console.log("id in checkauth is "+req.userData.id);
//next statement is used to jumbout ,it works like break statement in switch
next()
    }
    catch(error){
        res.status(401).json({message:"auth failed"})
    }
}