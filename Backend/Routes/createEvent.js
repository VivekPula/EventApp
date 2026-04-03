import express from "express";
import Event2 from "../Models/Event2.js";
import cors from "cors";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "./uploads/"); // folder
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
   }
});

const upload = multer({ storage });
try{
    router.post('/', upload.single('coverImage'), async (req, res) => {
      // console.log(req.body);
      // const { title, category,language, price } = req.body
      const { title, category, language, state, city, date, time, duration, price, totaltickets, description } = req.body;
      const coverImagePath = req.file.path;
      const newEvent = new Event2({ title, category, language, state, city, date, time, duration, price, totaltickets, description, coverImagePath })
      await newEvent.save()
      res.json({ "msg": "done" })
   });



}catch(e){console.log(e)}



export default router;