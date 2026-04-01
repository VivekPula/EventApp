import express from "express";
import Event from "../Models/Event.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some server error: " + e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const eventdata = await Event.findById(id);
    res.json(eventdata);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some server error: " + e.message });
  }
});

export default router;
