const express=require("express")
const app=express()
const port=3001
const path=require("path")
const mongoose=require("mongoose")
const parcel=require('./models/parceldetails.js')

app.use(express.static(path.join(__dirname,"public")))


app.listen(port,()=>{
    console.log("server running");
})



app.use(express.json())

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public','index.html'))
})

app.get('/submit',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public',"submit.html"))
})


app.get('/datesearch',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public',"datesearch.html"))
})


app.post("/",async (req,res)=>{
    try{
        const data=req.body;
        const result=await parcel.create(data);
        res.status(201).json(result)
        console.log(result);
    }catch(error){
        console.log(error);
        res.status(500).json()
    }
    })

app.get("/view-all",async(req,res)=>{
    const data=await parcel.find()
    if(data){
        res.status(200).json(data)
    }
    else{
        res.status(404).json()
        }

})

app.put("/edit-parcel/:id",async(req,res)=>{
    console.log("test1")
    const id=req.params.id;
    console.log("test2")
    const data1=req.body;
    console.log("test3")
    const result=await parcel.updateOne({parcelid:id},{$set:data1})
    res.json(result)
})

app.delete("/cancel-parcel/:id",async(req,res)=>{
    const id=req.params.id;
    const result=await parcel.deleteOne({parcelid:id})
    res.json(result)

})

app.get("/date/:id",async(req,res)=>{
   //const {deliverydate}=req.body
   const id=req.params.id;
    const result=await parcel.find({deliverydate:id})
    console.log(result)
    res.json(result)

})







mongoose.connect('mongodb://localhost:27017/parcel-management')
const database=mongoose.connection;
database.on("error",(error)=>{
    console.log(error)
})
database.once("connected",()=>{
    console.log("database connected")
})