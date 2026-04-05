import express from "express";
import Event from "../Models/Event.js";
import Event2 from "../Models/Event2.js";
import Ticket from "../Models/Ticket.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {language,category,prices,type,queryString} = req.body || {};
    let query={};
    if(queryString!=null&&queryString!==""){
      query.title = {$regex : queryString, $options : 'i'};
      console.log(queryString);
    }
    if(language && language.length>0){
        query.language = {$in : language};
       }
    if(category && category.length>0){
      query.category = {$in :category};
    }
    if(type && type.length>0){
      query.type = {$in : type}
    }
    if(prices&&prices.length>0){
      prices.sort();
      query.price={
        $gte :Number(prices[0].slice(3)),
        $lte :Number(prices[prices.length-1].slice(3))
      }
    }
      
    const events = await Event2.find(query);
    res.json(events);
  }catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some server error: " + e.message });
  }
});
router.post("/usertickets", async (req, res) => {
  try {
    const {language,category,prices,type,queryString, user} = req.body || {};
    const eventEIds = await Ticket.find({name : user},{Eid : 1});
    const eventIds = eventEIds.map( id => id.Eid);
    let query={};
    if(queryString!=null&&queryString!==""){
      query.title = {$regex : queryString, $options : 'i'};
    }
    if(eventIds!=null&& eventIds.length>0){
      query._id = {$in : eventIds}
    }
    else{
      query._id = null;
    }
    if(language && language.length>0){
        query.language = {$in : language};
       }
    if(category && category.length>0){
      query.category = {$in :category};
    }
    if(type && type.length>0){
      query.type = {$in : type}
    }
    if(prices&&prices.length>0){
      prices.sort();
      query.price={
        $gte :Number(prices[0].slice(3)),
        $lte :Number(prices[prices.length-1].slice(3))
      }
    }
      
    const events = await Event2.find(query);
    res.json(events);
  }catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some server error: " + e.message });
  }
});

router.get("/ticket", async (req, res) => {
  try{
    const event = req.query.event;
    const user = req.query.user;
    const find = await Ticket.findOne({title : event, name : user});
    if(find){
      res.json(find);
    }
    else{
      res.json({NA : "true"});
    }
  }catch(e){console.log("Error : "+e);}
});
router.post("/ticket",async (req,res) => {
  try{
  const {name,title,date,language,price,time,location,category,duration,description,Eid} = req.body || {}; 
  const Tid = name+title;
  const newTicket = new Ticket({name,title,date,language,price,time,location,category,duration,description,Tid,Eid});
  const saved = await newTicket.save();
  await Event2.updateOne(
    {_id : Eid},
    {
      $inc : { totaltickets : -1 }
    }
  );
  res.json({status : "OK"});
  }catch(e){console.log("Error : "+e)}
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const eventdata = await Event2.findById(id);
    res.json(eventdata);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some server error: " + e.message });
  }
});

export default router;
