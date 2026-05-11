import express from "express";
import Event2 from "../Models/Event2.js";

import multer from "multer";
import fs from "fs";

import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/* =========================================================
   MULTER STORAGE
========================================================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* =========================================================
   CREATE EVENT
========================================================= */

router.post("/", upload.single("coverImage"), async (req, res) => {
  try {
    /* ---------------- VALIDATE IMAGE ---------------- */

    if (!req.file) {
      return res.status(400).json({
        msg: "Cover image is required",
      });
    }

    /* ---------------- UPLOAD TO CLOUDINARY ---------------- */

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "student_applications",
      resource_type: "image",
    });

    /* ---------------- DELETE LOCAL FILE ---------------- */

    fs.unlinkSync(req.file.path);

    const coverImagePath = result.secure_url;

    const coverImagepublicId = result.public_id;

    /* ---------------- GET BODY DATA ---------------- */

    const {
      title,
      category,
      language,
      state,
      city,
      date,
      time,
      duration,
      eventType,
      price,
      totaltickets,
      volunteersEnabled,
      volunteersRequiredCount,

      description,
      user_id,
    } = req.body;

    /* ---------------- CREATE EVENT ---------------- */

    const newEvent = new Event2({
      title,

      category,

      language,

      state,

      city,

      date,

      time,

      duration,

      eventType,
      price: eventType === "free" ? 0 : Number(price),

      totaltickets,

      description,

      coverImagePath,

      coverImagepublicId,

      user_id,

      volunteers: {
        enabled: volunteersEnabled === "true",

        requiredCount: Number(volunteersRequiredCount) || 0,

        acceptedCount: 0,
      },
    });

    const savedEvent = await newEvent.save();

    /* ---------------- RESPONSE ---------------- */

    res.status(201).json({
      msg: "Event created successfully",

      event: savedEvent,
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({
      msg: "error occurred",

      error: e.message,
    });
  }
});

export default router;
