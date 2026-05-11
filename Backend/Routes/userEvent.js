// routes/userEvent.js

import express from "express";
import jwt from "jsonwebtoken";

import User from "../Models/User.js";
import Event2 from "../Models/Event2.js";
import UserInfo from "../Models/UserInfo.js";
import UserEvent from "../Models/UserEvent.js";

const router = express.Router();

/* ================= AUTH MIDDLEWARE ================= */

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;

    next();
  } catch (e) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

/* =========================================================
   REGISTER USER TO EVENT
========================================================= */

router.post("/register", authMiddleware, async (req, res) => {
  try {
    const { eventId, role } = req.body;

    /* ---------------- VALIDATE ROLE ---------------- */

    if (!["Participant", "Organizer", "Volunteer"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    /* ---------------- FIND USER ---------------- */

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    /* ---------------- FIND EVENT ---------------- */

    const event = await Event2.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    /* ---------------- CHECK TICKET AVAILABILITY ---------------- */

    if (role === "Participant") {
      if (event.tickets >= event.totaltickets) {
        return res.status(400).json({
          message: "Event is sold out",
        });
      }
    }

    /* ---------------- CHECK EXISTING ---------------- */

    const existingRegistration = await UserEvent.findOne({
      user: user._id,

      event: eventId,

      role,
    });

    if (existingRegistration) {
      return res.status(400).json({
        message: "Already registered for this event",
      });
    }

    /* ---------------- GENERATE QR DATA ---------------- */

    const qrData = JSON.stringify({
      userId: user._id,

      eventId: event._id,

      role,

      timestamp: Date.now(),
    });

    /* ---------------- CREATE USER EVENT ---------------- */

    const userEvent = await UserEvent.create({
      user: user._id,

      event: eventId,

      role,

      qrData,

      status: role === "Volunteer" ? "pending" : "registered",
    });

    /* ---------------- UPDATE EVENT TICKET COUNT ---------------- */

    if (role === "Participant") {
      event.tickets += 1;

      await event.save();
    }

    /* ---------------- UPDATE USER STATS ---------------- */

    const userInfo = await UserInfo.findOne({
      user: user._id,
    });

    if (role === "Participant") {
      userInfo.stats.participated += 1;
    }

    if (role === "Organizer") {
      userInfo.stats.organized += 1;
    }

    // volunteer count only after approval

    await userInfo.save();

    /* ---------------- RESPONSE ---------------- */

    res.status(201).json({
      message:
        role === "Volunteer"
          ? "Volunteer application submitted"
          : "Registered successfully",

      userEvent,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: e.message,
    });
  }
});

// GET USER REGISTRATION FOR EVENT

router.get("/check/:eventId", authMiddleware, async (req, res) => {
  try {
    const { eventId } = req.params;

    const userEvent = await UserEvent.findOne({
      user: req.userId,
      event: eventId,
    });
    if (!userEvent) {
      return res.status(404).json({
        message: "Not registered",
      });
    }

    res.status(200).json({
      userEvent,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: e.message,
    });
  }
});

//Get registered event data

router.get("/registration/:registrationId", async (req, res) => {
  try {
    const { registrationId } = req.params;

    const userEvent = await UserEvent.findById(registrationId)
      .populate("user")
      .populate("event");

    if (!userEvent) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.status(200).json({
      userEvent,

      eventData: userEvent.event,

      userData: {
        name: userEvent.user.username,
        email: userEvent.user.email,
      },
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: e.message,
    });
  }
});

/* =========================================================
   APPLY AS VOLUNTEER
========================================================= */

router.post("/volunteer/apply", authMiddleware, async (req, res) => {
  try {
    const { eventId } = req.body;

    /* ---------------- CHECK EXISTING ---------------- */

    const existingApplication = await UserEvent.findOne({
      user: req.userId,
      event: eventId,
      role: "Volunteer",
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied as volunteer",
      });
    }

    /* ---------------- CREATE APPLICATION ---------------- */

    const volunteerApplication = await UserEvent.create({
      user: req.userId,
      event: eventId,
      role: "Volunteer",
      status: "pending",
    });

    res.status(201).json({
      message: "Volunteer application submitted",

      volunteerApplication,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: e.message,
    });
  }
});

/* =========================================================
   APPROVE VOLUNTEER
========================================================= */

router.put(
  "/volunteer/approve/:userEventId",
  authMiddleware,
  async (req, res) => {
    try {
      const { userEventId } = req.params;

      /* ---------------- FIND APPLICATION ---------------- */

      const application = await UserEvent.findById(userEventId);

      if (!application) {
        return res.status(404).json({
          message: "Application not found",
        });
      }

      /* ---------------- UPDATE STATUS ---------------- */

      application.status = "approved";

      await application.save();

      /* ---------------- UPDATE USER STATS ---------------- */

      const userInfo = await UserInfo.findOne({
        user: application.user,
      });

      userInfo.stats.volunteered += 1;

      await userInfo.save();

      const event = await Event2.findOne(application.event);
      event.volunteers.acceptedCount += 1;
      await event.save();

      res.status(200).json({
        message: "Volunteer approved successfully",
      });
    } catch (e) {
      console.log(e);

      return res.status(500).json({
        message: e.message,
      });
    }
  },
);

/* =========================================================
   REJECT VOLUNTEER
========================================================= */

router.put(
  "/volunteer/reject/:userEventId",
  authMiddleware,
  async (req, res) => {
    try {
      const { userEventId } = req.params;

      const application = await UserEvent.findById(userEventId);

      if (!application) {
        return res.status(404).json({
          message: "Application not found",
        });
      }

      application.status = "rejected";

      await application.save();

      res.status(200).json({
        message: "Volunteer application rejected",
      });
    } catch (e) {
      console.log(e);

      return res.status(500).json({
        message: e.message,
      });
    }
  },
);

router.delete("/withdraw/:registrationId", authMiddleware, async (req, res) => {
  try {
    const { registrationId } = req.params;

    const registration = await UserEvent.findById(registrationId);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    if (registration.user.toString() !== req.userId) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    /* ---------------- DECREMENT TICKETS ---------------- */

    if (registration.role === "Participant") {
      const event = await Event2.findById(registration.event);

      if (event && event.tickets > 0) {
        event.tickets -= 1;

        await event.save();
      }
    }

    /* ---------------- REMOVE VOLUNTEER COUNT ---------------- */

    if (
      registration.role === "Volunteer" &&
      registration.status === "approved"
    ) {
      const event = await Event2.findById(registration.event);

      if (event?.volunteers?.acceptedCount > 0) {
        event.volunteers.acceptedCount -= 1;

        await event.save();
      }
    }

    await UserEvent.findByIdAndDelete(registrationId);

    res.json({
      message: "Registration withdrawn successfully",
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({
      message: e.message,
    });
  }
});

/* =========================================================
   GIVE VOLUNTEER RATING
========================================================= */

router.put(
  "/volunteer/rating/:userEventId",
  authMiddleware,
  async (req, res) => {
    try {
      const { userEventId } = req.params;

      const { rating } = req.body;

      if (rating < 0 || rating > 5) {
        return res.status(400).json({
          message: "Rating must be between 0 and 5",
        });
      }

      const volunteer = await UserEvent.findById(userEventId);

      if (!volunteer) {
        return res.status(404).json({
          message: "Volunteer record not found",
        });
      }

      volunteer.rating = rating;

      await volunteer.save();

      res.status(200).json({
        message: "Rating submitted",
        volunteer,
      });
    } catch (e) {
      console.log(e);

      return res.status(500).json({
        message: e.message,
      });
    }
  },
);

/* =========================================================
   GET EVENT PARTICIPANTS
========================================================= */

router.get("/event/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;

    const users = await UserEvent.find({
      event: eventId,
    })
      .populate("user", "username email")
      .populate("event");

    res.status(200).json(users);
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: e.message,
    });
  }
});

/* =========================================================
   GET USER EVENTS
========================================================= */

router.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userEvents = await UserEvent.find({
      user: user._id,
    }).populate("event");

    res.status(200).json(userEvents);
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: e.message,
    });
  }
});

/* =========================================================
   REMOVE USER FROM EVENT
========================================================= */

router.delete("/remove/:userEventId", authMiddleware, async (req, res) => {
  try {
    const { userEventId } = req.params;

    const userEvent = await UserEvent.findById(userEventId);

    if (!userEvent) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    /* ---------------- UPDATE STATS ---------------- */

    const userInfo = await UserInfo.findOne({
      user: userEvent.user,
    });

    if (userEvent.role === "Participant" && userInfo.stats.participated > 0) {
      userInfo.stats.participated -= 1;
    }

    if (userEvent.role === "Organizer" && userInfo.stats.organized > 0) {
      userInfo.stats.organized -= 1;
    }

    if (userEvent.role === "Volunteer" && userInfo.stats.volunteered > 0) {
      userInfo.stats.volunteered -= 1;
    }

    await userInfo.save();

    /* ---------------- DELETE ---------------- */

    await userEvent.deleteOne();

    res.status(200).json({
      message: "Removed from event successfully",
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: e.message,
    });
  }
});

router.post("/scan", async (req, res) => {
  try {
    const { qrData, eventId } = req.body;

    /* ---------------- VALIDATE INPUT ---------------- */

    if (!qrData || !eventId) {
      return res.status(400).json({
        status: "ERROR",

        message: "QR data and event ID required",
      });
    }

    /* ---------------- FIND REGISTRATION ---------------- */

    const registration = await UserEvent.findOne({
      qrData,
    });

    if (!registration) {
      return res.status(404).json({
        status: "ERROR",

        message: "Invalid QR code",
      });
    }

    /* ---------------- VERIFY EVENT ---------------- */

    if (registration.event.toString() !== eventId) {
      return res.status(400).json({
        status: "ERROR",

        message: "QR does not belong to this event",
      });
    }

    /* ---------------- VERIFY ROLE ---------------- */

    if (
      registration.role !== "Participant" &&
      registration.role !== "Volunteer"
    ) {
      return res.status(400).json({
        status: "ERROR",

        message: "Invalid registration type",
      });
    }

    /* ---------------- VOLUNTEER APPROVAL CHECK ---------------- */

    if (
      registration.role === "Volunteer" &&
      registration.status !== "approved"
    ) {
      return res.status(400).json({
        status: "ERROR",

        message: "Volunteer not approved yet",
      });
    }

    /* ---------------- ALREADY CHECKED IN ---------------- */

    if (registration.checkedIn) {
      return res.json({
        status: "ALREADY_SCANNED",

        message: "Already checked in",

        registration,
      });
    }

    /* ---------------- CHECK IN ---------------- */

    registration.checkedIn = true;

    registration.checkedInAt = new Date();

    await registration.save();

    /* ---------------- RESPONSE ---------------- */

    res.json({
      status: "OK",

      message: "Check-in successful",

      registration,
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({
      status: "ERROR",

      message: e.message,
    });
  }
});
router.post('/getevents',async (req,res)=>{
  try{
    const { language, category, prices, type, queryString, userId } = req.body || {};
    const userID = await User.findOne({_id : userId});
    if (!userID) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    
    const eventEIds = await UserEvent.find({ user: userID, role : {$ne : "Organizer"} }, { event: 1 });
    const eventIds = eventEIds.map(id => id.event);
    let query = {};
    if (queryString != null && queryString !== "") {
      query.title = { $regex: queryString, $options: 'i' };
    }
    if (eventIds != null && eventIds.length > 0) {
      query._id = { $in: eventIds }
    }
    else {
      query._id = null;
    }
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

    const events = await Event2.find(query);
    res.json(events);
  }catch(e){
    res.status(500).json({ message: "Some server error: " + e.message });
  }
})

export default router;
