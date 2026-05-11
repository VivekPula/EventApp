import express from "express";
import Event2 from "../Models/Event2.js";
import Ticket from "../Models/Ticket.js";
import User from "../Models/User.js";
import mongoose from "mongoose";
import UserEvent from "../Models/UserEvent.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { language, category, prices, type, queryString, user_id } =
      req.body || {};
    const Type = type.map((x) => x.toLowerCase());
    let query = {};
    if (queryString != null && queryString !== "") {
      query.title = { $regex: queryString, $options: "i" };
      console.log(queryString);
    }

    if (language && language.length > 0) {
      query.language = { $in: language };
    }

    if (category && category.length > 0) {
      query.category = { $in: category };
    }

    if (type && type.length > 0) {
      query.eventType = { $in: Type };
    }

    if (prices && prices.length > 0) {
      prices.sort();
      if(prices.length==1){
        query.price = {
        $lte: Number(prices[0].slice(3)),
        }
      }
      else
        query.price = {
          $gte: Number(prices[0].slice(3)),
          $lte: Number(prices[prices.length - 1].slice(3)),
        };
    }

    if (user_id) {
      query.user_id = user_id;
    }

    const events = await Event2.find(query);
    res.json(events);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some server error: " + e.message });
  }
});

router.get("/event/bookingdetails/:id", async (req, res) => {
  try {
    const event_id = req.params.id;

    const eventdata = await Event2.findById(event_id);

    if (!eventdata) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const registrations = await UserEvent.find({
      event: event_id,
    }).populate("user");

    const participants = registrations.filter((r) => r.role === "Participant");

    const checkedInCount = participants.filter((r) => r.checkedIn).length;

    const volunteers = registrations.filter((r) => r.role === "Volunteer");

    const eventdetails = {
      title: eventdata.title,

      price: eventdata.price,

      totaltickets: eventdata.totaltickets,

      saledtickets: participants.length,

      participantsCount: checkedInCount,

      volunteersRequired: eventdata.volunteers?.requiredCount || 0,

      volunteersAccepted: eventdata.volunteers?.acceptedCount || 0,
    };

    const userdetails = registrations.map((item) => ({
      registrationId: item._id,

      username: item.user?.username,

      email: item.user?.email,

      role: item.role,

      status: item.status,

      checkedIn: item.checkedIn,

      checkedInAt: item.checkedInAt,

      registeredAt: item.createdAt,
    }));

    res.json({
      eventdetails,
      userdetails,
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({
      message: "Some server error: " + e.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    
    const eventData = await Event2.findById(id);
    console.log(eventData.user_id);
    const eventCreator = await User.findOne({ _id: eventData.user_id });

    res.json({ eventData: eventData, eventCreator: eventCreator });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some server error: " + e.message });
  }
});


export default router;
// import express from "express";

// import Event2 from "../Models/Event2.js";
// import Ticket from "../Models/Ticket.js";
// import User from '../Models/User.js';
// import mongoose from "mongoose";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { language, category, prices, type, queryString, user_id } = req.body || {};
//     let query = {};
//     if (queryString != null && queryString !== "") {
//       query.title = { $regex: queryString, $options: 'i' };

//       console.log(queryString);
//     }
//     if (language && language.length > 0) {
//       query.language = { $in: language };
//     }
//     if (category && category.length > 0) {
//       query.category = { $in: category };
//     }
//     if (type && type.length > 0) {
//       query.type = { $in: type }
//     }
//     if (prices && prices.length > 0) {
//       prices.sort();
//       query.price = {
//         $gte: Number(prices[0].slice(3)),
//         $lte: Number(prices[prices.length - 1].slice(3))
//       }
//     }
//     if (user_id) {
//       query.user_id = new mongoose.Types.ObjectId(user_id);
//     }

//     const events = await Event2.find(query);
//     res.json(events);
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ message: "Some server error: " + e.message });
//   }
// });
// router.post("/usertickets", async (req, res) => {
//   try {
//     const { language, category, prices, type, queryString, user } = req.body || {};
//     const eventEIds = await Ticket.find({ name: user }, { Eid: 1 });
//     const eventIds = eventEIds.map(id => id.Eid);
//     let query = {};
//     if (queryString != null && queryString !== "") {
//       query.title = { $regex: queryString, $options: 'i' };
//     }
//     if (eventIds != null && eventIds.length > 0) {
//       query._id = { $in: eventIds }
//     }
//     else {
//       query._id = null;
//     }
//     if (language && language.length > 0) {
//       query.language = { $in: language };
//     }
//     if (category && category.length > 0) {
//       query.category = { $in: category };
//     }
//     if (type && type.length > 0) {
//       query.type = { $in: type }
//     }
//     if (prices && prices.length > 0) {
//       prices.sort();
//       query.price = {
//         $gte: Number(prices[0].slice(3)),
//         $lte: Number(prices[prices.length - 1].slice(3))
//       }
//     }

//     const events = await Event2.find(query);
//     res.json(events);
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ message: "Some server error: " + e.message });
//   }
// });

// router.get("/ticket", async (req, res) => {
//   try {
//     const event = req.query.event;

//     const user_id = req.query.user_id;
//     const find = await Ticket.findOne({title : event, user_id : user_id});

//     if(find){
//       const ticketData = await Event2.findOne({_id:find.Eid});
//       res.json(ticketData);
//     }
//     else {
//       res.json({ NA: "true" });
//     }
//   } catch (e) { console.log("Error : " + e); }
// });

// router.post("/ticket",async (req,res) => {
//   try{
//   const {name,user_id,title,Eid} = req.body || {};
//   const Tid = user_id+title;
//   const tickedBooked = true;
//   const newTicket = new Ticket({name,user_id,title,tickedBooked,Tid,Eid});
//   const saved = await newTicket.save();
//   await Event2.updateOne(
//     {_id : Eid},
//     {
//       $inc : { tickets : 1 }
//     }
//   );
//   res.json({status : "OK"});
//   }catch(e){console.log("Error : "+e)}

// });
// router.get("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const eventData = await Event2.findById(id);
//     const eventCreator = await User.findOne({_id:eventData.user_id});
//     res.json({eventData:eventData,eventCreator:eventCreator});
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ message: "Some server error: " + e.message });
//   }
// });

// router.get("/event/bookingdetails/:id", async (req, res) => {
//   try {
//     const event_id = req.params.id;
//     const eventdata = await Event2.findById(event_id);
//     const { title, price, totaltickets,tickets } = eventdata
//     // console.log(title,price,totaltickets);
//     const eventdetails = { "title": title, "price": price, "totaltickets": totaltickets,"saledtickets":tickets }
//     // console.log(eventdetails);

//     const ticketsdata = await Ticket.find({ Eid: event_id })
//     // console.log(ticketsdata);

//     const userdetails = await Promise.all(
//       ticketsdata.map(async (item) => {
//         const userd = await User.findById(item.user_id);
//         const details = {
//           "Tid": item.Tid,
//           "name": userd.name,
//           "email": userd.email,
//         }
//         return details;
//       })
//     );

//     const data = {
//       "eventdetails": eventdetails,
//       "userdetails": userdetails
//     }
//     console.log(data);
//     res.json(data);
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ message: "Some server error: " + e.message });
//   }
// });

// export default router;
