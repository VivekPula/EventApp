import express from "express";
import mongoose from "mongoose";

import Event from "../Models/Event.js";
import Event2 from "../Models/Event2.js";


//get event details routes
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    console.log("what");
    console.log(req.body);
    const { language, category, prices, type, user_id } = req.body || {};
    let query = {};
    if (language && language.length > 0) {
      query.language = { $in: language };
    }
    if (category && category.length > 0) {
      query.category = { $in: category };
    }
    if (type && type.length > 0) {
      query.type = { $in: type }
    }
    if (prices && prices.length > 0) {
      prices.sort();
      query.price = {
        $gte: Number(prices[0].slice(3)),
        $lte: Number(prices[prices.length - 1].slice(3))
      }
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
