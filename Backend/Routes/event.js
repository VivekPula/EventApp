import express from "express";
import Event2 from "../Models/Event2.js";
import Ticket from "../Models/Ticket.js";
import User from "../Models/User.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { language, category, prices, type, queryString, user_id } =
      req.body || {};

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
      query.type = { $in: type };
    }

    if (prices && prices.length > 0) {
      prices.sort();
      query.price = {
        $gte: Number(prices[0].slice(3)),
        $lte: Number(prices[prices.length - 1].slice(3)),
      };
    }

    if (user_id) {
      query.user_id = new mongoose.Types.ObjectId(user_id);
    }

    const events = await Event2.find(query);
    res.json(events);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some server error: " + e.message });
  }
});

router.post("/usertickets", async (req, res) => {
  try {
    const { language, category, prices, type, queryString, user } =
      req.body || {};

    const tickets = await Ticket.find({ name: user });
    const eventIds = tickets.map((ticket) => ticket.Eid);

    let query = {};

    if (queryString != null && queryString !== "") {
      query.title = { $regex: queryString, $options: "i" };
    }

    if (eventIds != null && eventIds.length > 0) {
      query._id = { $in: eventIds };
    } else {
      query._id = null;
    }

    if (language && language.length > 0) {
      query.language = { $in: language };
    }

    if (category && category.length > 0) {
      query.category = { $in: category };
    }

    if (type && type.length > 0) {
      query.type = { $in: type };
    }

    if (prices && prices.length > 0) {
      prices.sort();
      query.price = {
        $gte: Number(prices[0].slice(3)),
        $lte: Number(prices[prices.length - 1].slice(3)),
      };
    }

    const events = await Event2.find(query);

    const eventsWithTicket = events.map((event) => {
      const ticket = tickets.find(
        (t) => t.Eid.toString() === event._id.toString()
      );

      return {
        ...event.toObject(),
        ticketId: ticket?.Tid,
        ticketStatus: ticket?.status || "booked",
      };
    });

    res.json(eventsWithTicket);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some server error: " + e.message });
  }
});

router.get("/ticket", async (req, res) => {
  try {
    const event = req.query.event;
    const user_id = req.query.user_id;

    const find = await Ticket.findOne({ title: event, user_id: user_id });

    if (find) {
      const ticketData = await Event2.findOne({ _id: find.Eid });

      res.json({
        ...ticketData.toObject(),
        ticketId: find.Tid,
        ticketStatus: find.status || "booked",
        ticketBookedAt: find.createdAt,
      });
    } else {
      res.json({ NA: "true" });
    }
  } catch (e) {
    console.log("Error : " + e);
    res.status(500).json({ message: "Some server error: " + e.message });
  }
});

router.post("/ticket", async (req, res) => {
  try {
    const { name, user_id, title, Eid } = req.body || {};

    const existingTicket = await Ticket.findOne({ user_id, Eid });

    if (existingTicket) {
      return res.json({
        status: "OK",
        message: "Ticket already booked",
        ticketId: existingTicket.Tid,
      });
    }

    const Tid = `TKT-${Date.now()}-${user_id.slice(-5)}-${Eid.slice(-5)}`;
    const qrData = Tid;

    const newTicket = new Ticket({
      name,
      user_id,
      title,
      Status: true,
      status: "booked",
      Tid,
      Eid,
      qrData,
    });

    const saved = await newTicket.save();

    await Event2.updateOne({ _id: Eid }, { $inc: { tickets: 1 } });

    res.json({
      status: "OK",
      ticketId: saved.Tid,
    });
  } catch (e) {
    console.log("Error : " + e);
    res.status(500).json({ message: "Some server error: " + e.message });
  }
});

router.get("/ticket/:ticketId", async (req, res) => {
  try {
    const ticketId = req.params.ticketId;

    const ticket = await Ticket.findOne({ Tid: ticketId });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const eventData = await Event2.findById(ticket.Eid);
    const userData = await User.findById(ticket.user_id);

    res.json({
      ticket,
      eventData,
      userData,
    });
  } catch (e) {
    console.log("Error : " + e);
    res.status(500).json({ message: "Some server error: " + e.message });
  }
});

router.post("/ticket/scan", async (req, res) => {
  try {
    const { Tid, Eid } = req.body || {};

    const ticket = await Ticket.findOne({ Tid });

    if (!ticket) {
      return res.status(404).json({
        status: "ERROR",
        message: "Invalid ticket",
      });
    }

    if (ticket.Eid.toString() !== Eid.toString()) {
      return res.status(400).json({
        status: "ERROR",
        message: "This ticket does not belong to this event",
      });
    }

    if (ticket.status === "participated") {
      return res.json({
        status: "ALREADY_SCANNED",
        message: "Ticket already scanned",
        ticket,
      });
    }

    ticket.status = "participated";
    ticket.scannedAt = new Date();

    await ticket.save();

    res.json({
      status: "OK",
      message: "Ticket scanned successfully",
      ticket,
    });
  } catch (e) {
    console.log("Error : " + e);
    res.status(500).json({ message: "Some server error: " + e.message });
  }
});

router.get("/event/bookingdetails/:id", async (req, res) => {
  try {
    const event_id = req.params.id;

    const eventdata = await Event2.findById(event_id);

    const { title, price, totaltickets, tickets } = eventdata;

    const ticketsdata = await Ticket.find({ Eid: event_id });

    const participantsCount = ticketsdata.filter(
      (ticket) => ticket.status === "participated"
    ).length;

    const eventdetails = {
      title: title,
      price: price,
      totaltickets: totaltickets,
      saledtickets: tickets,
      participantsCount: participantsCount,
    };

    const userdetails = await Promise.all(
      ticketsdata.map(async (item) => {
        const userd = await User.findById(item.user_id);

        const details = {
          Tid: item.Tid,
          name: userd?.name,
          email: userd?.email,
          status: item.status || "booked",
          bookingTime: item.createdAt,
          scannedAt: item.scannedAt,
        };

        return details;
      })
    );

    const data = {
      eventdetails: eventdetails,
      userdetails: userdetails,
    };

    console.log(data);
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some server error: " + e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const eventData = await Event2.findById(id);
    const eventCreator = await User.findOne({ _id: eventData.user_id });

    res.json({ eventData: eventData, eventCreator: eventCreator });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some server error: " + e.message });
  }
});

export default router;