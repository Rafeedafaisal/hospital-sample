// const { response } = require("express")
// const { response } = require("express")

const express=require("express")
const bcrypt=require("bcrypt")
// const doctorADD=require("../Model/DoctorsData")
// const doctorADD=require("../Model/DoctorData")
const doctADD=require("../Model/DoctorData")
const nurseADD=require("../Model/NurseData")
const labADD=require("../Model/LabData")
const pharmADD=require("../Model/pharmacistData")
const signinADD=require("../Model/SigninData")

const adminrouter=express.Router()
adminrouter.post("/Adddoctor",(req,res)=>{
    bcrypt.hash(req.body.password,10,(error,data)=>{
        if(error){
            console.log("error");
        }
        else{
            console.log(data);

        }
        const loginitems={
            username:req.body.username,
            password:data,
            role:"doctor"
        }
       const signinData= signinADD(loginitems)
        signinData.save().then(()=>{
            signinADD.findOne({username:loginitems.username}).then((details)=>{
             var id=details._id

             const items={
                 login_id:id,
                name:req.body.name,
              dept:req.body.dept,
              qual:req.body.qual,
              starttime:req.body.starttime,
              endtime:req.body.endtime,
              sunday:req.body.sunday,
              monday:req.body.monday,
              tuesday:req.body.tuesday,
              wednessday:req.body.wednessday,
              thursday:req.body.thursday,
              friday:req.body.friday,
              saturday:req.body.saturday,
              email:req.body.email,
              mobile:req.body.mobile,
              place:req.body.place
            }
            console.log("data doctor"+items);
            const doctorData=doctADD(items)
            doctorData.save().then((response)=>{
                console.log("doctors datas saved"+response);
                res.status(200).json({
                    detail:response
                })
            })
            })
        })
     })
   

})
adminrouter.get("/Adddoctor",(req,res)=>{
    doctADD.find().then((response)=>{
        res.status(200).json({
            detail:response
        })
    })
})
adminrouter.delete("/delete/:id",(req,res)=>{
    const id=req.params.id
    doctADD.findByIdAndDelete(id).then(()=>{
        res.status(200).json({
            details:"successfully deleted"
        })
    })
})

adminrouter.get("/editdr/:id",(req,res)=>{
    const id=req.params.id
    doctADD.findOne({_id:id}).then((response)=>{
        res.status(200).json({
            detail:response
        })
    })
})
adminrouter.put("/editdr/:id",(req,res)=>{
    const id=req.params.id
    const items={
        name:req.body.name,
      dept:req.body.dept,
      qual:req.body.qual,
      starttime:req.body.starttime,
      endtime:req.body.endtime,
      email:req.body.email,
      mobile:req.body.mobile,
      place:req.body.place
    }
    console.log("data updated doctor"+items);
    doctADD.findByIdAndUpdate(id,items).then((response)=>{
        console.log("doctors datas saved"+response);
        res.status(200).json({
            detail:response
        })
    })
    })
//nurse data
adminrouter.post("/Addnurse",(req,res)=>{
    const items={
        name:req.body.name,
      dept:req.body.dept,
     
      email:req.body.email,
      mobile:req.body.mobile,
      place:req.body.place
    }
    console.log("nurse datas are"+items);
    const nurseData=nurseADD(items)
    nurseData.save().then((response)=>{
        console.log("nurse datas saved"+response);
        res.status(200).json({
            detail:response
        })
    })
})
adminrouter.get("/Addnurse",(req,res)=>{
    nurseADD.find().then((response)=>{
        res.status(200).json({
            detail:response
        })
    })
})
adminrouter.delete("/deletenurse/:id",(req,res)=>{
    const id=req.params.id
    nurseADD.findByIdAndDelete(id).then(()=>{
        res.status(200).json({
            details:"successfully deleted"
        })
    })
})

adminrouter.get("/editnurse/:id",(req,res)=>{
    const id=req.params.id
    nurseADD.findOne({_id:id}).then((response)=>{
        res.status(200).json({
            detail:response
        })
    })
})
adminrouter.put("/editnurse/:id",(req,res)=>{
    const id=req.params.id
    const items={
        name:req.body.name,
      dept:req.body.dept,
    
      email:req.body.email,
      mobile:req.body.mobile,
      place:req.body.place
    }
    console.log("data updated nurse"+items);
    nurseADD.findByIdAndUpdate(id,items).then((response)=>{
        console.log("nurse datas saved"+response);
        res.status(200).json({
            detail:response
        })
    })
    })
//lab data
adminrouter.post("/Addlab",(req,res)=>{
    const items={
        name:req.body.name,
      dept:req.body.dept,
      mobile:req.body.mobile,
      email:req.body.email,
     
      place:req.body.place
    }
    console.log("LAB datas are"+items);
    const labData=labADD(items)
    labData.save().then((response)=>{
        console.log("labdata datas saved"+response);
        res.status(200).json({
            detail:response
        })
    })
})
adminrouter.get("/Addlab",(req,res)=>{
    labADD.find().then((response)=>{
        res.status(200).json({
            detail:response
        })
    })
})
adminrouter.delete("/deletelab/:id",(req,res)=>{
    const id=req.params.id
    labADD.findByIdAndDelete(id).then(()=>{
        res.status(200).json({
            details:"successfully deleted"
        })
    })
})


adminrouter.get("/editlab/:id",(req,res)=>{
    const id=req.params.id
    labADD.findOne({_id:id}).then((response)=>{
        res.status(200).json({
            detail:response
        })
    })
})
adminrouter.put("/editlab/:id",(req,res)=>{
    const id=req.params.id
    const items={
        name:req.body.name,
      dept:req.body.dept,
    
      email:req.body.email,
      mobile:req.body.mobile,
      place:req.body.place
    }
    console.log("data updated lab"+items);
    labADD.findByIdAndUpdate(id,items).then((response)=>{
        console.log("lab datas saved"+response);
        res.status(200).json({
            detail:response
        })
    })
    })


//pharmacist
adminrouter.post("/Addpharm",(req,res)=>{
    const items={
        name:req.body.name,
    
      mobile:req.body.mobile,
      email:req.body.email,
     
      place:req.body.place
    }
    console.log("LAB datas are"+items);
    const pharmData=pharmADD(items)
    pharmData.save().then((response)=>{
        console.log("labdata datas saved"+response);
        res.status(200).json({
            detail:response
        })
    })
})
adminrouter.get("/Addpharm",(req,res)=>{
    pharmADD.find().then((response)=>{
        res.status(200).json({
            detail:response
        })
    })
})
adminrouter.delete("/deletepharm/:id",(req,res)=>{
    const id=req.params.id
    pharmADD.findByIdAndDelete(id).then(()=>{
        res.status(200).json({
            details:"successfully deleted"
        })
    })
})


adminrouter.get("/editpharm/:id",(req,res)=>{
    const id=req.params.id
    pharmADD.findOne({_id:id}).then((response)=>{
        res.status(200).json({
            detail:response
        })
    })
})
adminrouter.put("/editpharm/:id",(req,res)=>{
    const id=req.params.id
    const items={
        name:req.body.name,
     
        mobile:req.body.mobile,
      email:req.body.email,
     
      place:req.body.place
    }
    console.log("data updated pharmacist"+items);
    pharmADD.findByIdAndUpdate(id,items).then((response)=>{
        console.log("pharm datas saved"+response);
        res.status(200).json({
            detail:response
        })
    })
    })
module.exports=adminrouter