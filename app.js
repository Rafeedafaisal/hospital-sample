const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const path=require("path")

const app=express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//keep note it
 app.use(express.static(path.join(__dirname,"./build")))
 app.get("/*",(req,res)=>{res.sendFile(path.join(__dirname,"./build"))})

mongoose.connect("mongodb+srv://Rafeeda:Rafee%40123@cluster1.naasj.mongodb.net/fullstackDatabase?retryWrites=true&w=majority",()=>{
    console.log("Data base connected..");
})

const userRouter=require("./src/Controller/userRouter")
app.use("/api",userRouter)
const adminrouter=require("./src/Controller/adminRouter")
app.use("/api/admin",adminrouter)
const patientrouter=require("./src/Controller/patientRouter")
app.use("/api/patient",patientrouter)
const doctorrouter=require("./src/Controller/doctorRouter")
app.use("/api/doctor",doctorrouter)
//port nu,ber written above listen
const PORT=process.env.PORT || 2000
// app.listen(9090,()=>{
//     console.log("http://localhost:9090");
// })
app.listen(PORT,function(){
    console.log("\server running");
})
