import express from "express";
import mongoose from "mongoose";
import Event from "./Models/Event.js";
const app = express();
const port = 5000;
mongoose.connect("mongodb+srv://admin_db_user:eventApp123@eventapp.gg29yzr.mongodb.net/?appName=EventApp")
.then(()=>console.log("Db connected"))
.catch(err=>console.log(err));
try{
 app.get('/api/data',async (req,res)=>{
    const events= await Event.find();
    console.log(events);
    res.json(events);
 });
 app.get('/api/data/:id',async (req,res)=>{
    const id=req.params.id;
    const eventdata = await Event.findById(id);
    console.log(eventdata);
    res.json(eventdata);
 });
}catch(e){console.log(e)};

 app.listen(port,()=>{
     console.log(`listening in ${port}`);
 })
