import express from "express";
import Event2 from "../Models/Event2.js";
import multer from "multer";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "./uploads/");
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
   }
});

const upload = multer({ storage });

router.post("/", upload.single("coverImage"), async (req, res) => {
   try {
      if (!req.file) {
         return res.status(400).json({
            msg: "Cover image is required"
         });
      }

      console.log("bef cloud");
      // console.log(req.file.path);
      

      const result = await cloudinary.uploader.upload(req.file.path, {
         folder: "student_applications",
         resource_type: "image",
      });

       console.log("af cloud");
      fs.unlinkSync(req.file.path);

      const coverImagePath = result.secure_url;
      const coverImagepublicId = result.public_id;

      const {
         title,
         category,
         language,
         state,
         city,
         date,
         time,
         duration,
         price,
         totaltickets,
         description,
         user_id
      } = req.body;

      const newEvent = new Event2({
         title,
         category,
         language,
         state,
         city,
         date,
         time,
         duration,
         price,
         totaltickets,
         description,
         coverImagePath,
         coverImagepublicId,
         user_id
      });

      await newEvent.save();

      res.status(201).json({
         msg: "Event created successfully",
      });

   }catch (e) { console.log(e)
      res.json({msg:"error occured"})
    }
});

export default router;