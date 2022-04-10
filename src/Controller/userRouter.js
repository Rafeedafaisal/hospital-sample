const express=require("express")
const userRouter=express.Router()
const signinADD=require("../Model/SigninData")
const signupADD=require("../Model/SignupData")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const nodemailer=require("nodemailer")
const crypto=require("crypto")
// const { response } = require("express")
const {OAuth2Client}=require("google-auth-library")
const client= new OAuth2Client("157798410093-j05aesbiolahsbbv3qp3cmo8fu6rslcq.apps.googleusercontent.com")
userRouter.post("/Signup",(req,res)=>{
    

    bcrypt.hash(req.body.password,10,(error,data)=>{
        if(error){
            console.log("error");
        }
        else{
            console.log(data);
        }  
    // console.log("req body datas are"+req.body);
    // let rq=JSON.stringify(req.body)
    // console.log("stringified re body datas"+rq);
    // console.log("req datas are"+req.body.username);
    const loginitems={
        username:req.body.username,
        password:data,
        role:req.body.role
    }
    signinADD.find({username:req.body.username}).then((response)=>{
        if(!response){
res.status(200).json('error')
        }
        else{
            if(loginitems.role==""){
                    res.status(200).json("select your role")
            }
            else{
                const signinDATA=signinADD(loginitems)
                signinDATA.save().then(()=>{
                signinADD.findOne({username:loginitems.username}).then((details)=>{
                    var id=details._id;
                    
                    const regitems={
                login_id:id,
                uname:req.body.uname,
                email:req.body.email,
                phone:req.body.phone,
                place:req.body.place,
               
                    }
                    
                    const signupDATA=signupADD(regitems)
                    signupDATA.save().then((data)=>{
                        console.log("datas are"+JSON.stringify(data));
                        res.status(200).json({
                            detail:data
                        })
                    })
                })
                })
            }
           
        }

    })
    
   
})
})
userRouter.post("/Signin",(req,res)=>{
    console.log("username is"+req.body.username);
    signinADD.findOne({username:req.body.username}).then((response)=>{
        console.log("log datas.."+response);
        if(response){
            bcrypt.compare(req.body.password,response.password).then((data)=>{
                if(data){
                    // signupADD.findOne({login_id:logindata._id}).then((registerdetails)=>{
                    //     if(registerdetails.role=="admin"){

                    //token generation
                        var token=jwt.sign({id:response._id},"secretkey")
                        console.log("generated token is"+token);
                        console.log("login datasa"+data);
                        //sent tojken to the clientside with datas
                     res.status(200).json({
                        detail:response,token:token
                     })

                     //nnodemailer working
                    //  var transporter=nodemailer.createTransport({
                    //          service:"gmail",
                    //          auth:{
                    //              user:"tkfaisal272@gmail.com",
                    //              pass:"Parayilla"
                    //          }
                    //      }
                    //  )
                    //  const options={
                    //      from:"tkfaisal272@gmail.com",
                    //      to:"rafeedafaisal272@gmail.com",
                    //      subject:"sending email with nodejs",
                    //      text:"wow this is simple"
                    //  }
                    //  transporter.sendMail(options, function(error, info){
                    //     if (error) {
                    //       console.log(error);
                    //     } else {
                    //       console.log('Email sent: ' + info.response);
                    //     }
                    //   });
                        }
                        else{
                            res.status(200).json({
                                detail:"PASSWORD INCORRECT"
                             })   
                        }
                    })
        }
                else{
                    res.status(200).json({
                        detail:"NO USER"
                     })
                    }
            })
        
   
    // res.status(200).json({
    //     detail:response
    // })
})
userRouter.post("/reset",(req,res)=>{
    // crypto.randomBytes(32,(err,buffer)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     const token=buffer.toString("hex")
      
        signinADD.findOne({username:req.body.username}).then((user)=>{
            const token=user._id
            console.log("token that is "+token);
            if(!user){
               return res.status(422).json({error:"user doesnt exist with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now()+3600000
            user.save().then((result)=>{
                 //nnodemailer working
                     var transporter=nodemailer.createTransport({
                             service:"gmail",
                             auth:{
                                 user:"tkfaisal272@gmail.com",
                                 pass:"Parayilla"
                             }
                         }
                     )
                     const options={
                         from:"tkfaisal272@gmail.com",
                         to:`${user.username}`,
                         subject:"your request for password reset",
                         html:`<h5>click in this <a href="http://localhost:3000/newpass/${token}">link<a> to reset password</h5>`
                     }
                     transporter.sendMail(options, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                      res.json({message:"check your email"})
            })
        })
    //})
   
})
userRouter.post("/newpass/:token",(req,res)=>{

    bcrypt.hash(req.body.password,10,(error,data)=>{
        console.log("hey dude new password is going to be saved ...............................");
        const newpass=data
        const token=req.params.token
        console.log("token  :"+token);
        signinADD.findOne({resetToken:token}).then((newData)=>{
            console.log("new data"+newData);
            newData.password=newpass
            newData.save().then((newsave)=>{
                console.log("new saved data"+newsave);
                res.status(200).json({
                    detail:newsave
                })
            })
        })
    })
    


    
})
userRouter.post("/google-login",(req,res)=>{
const {tokenId}=req.body
console.log("token in google login userrouter"+tokenId);
client.verifyIdToken({idToken:tokenId,audience:"157798410093-j05aesbiolahsbbv3qp3cmo8fu6rslcq.apps.googleusercontent.com"}).then((response)=>{
    const {email_verified,name,email}=response.payload
console.log("details "+JSON.stringify(response.payload.email));
signinADD.findOne({username:response.payload.email}).then((response)=>{
    if(response){
        res.status(200).json({details:response})
    }
    else{
        res.status(200).json("no-user")
    }
})
})
})
module.exports=userRouter