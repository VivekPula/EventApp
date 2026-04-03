// Importing dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

// Importing utils
import logInfo from "./utils/logInfo.js";

// Importing Routes
import userRoute from "./Routes/user.js";
import eventRoute from "./Routes/event.js";
import createEventRoute from "./Routes/createEvent.js";

const app = express();
app.use(express.json());
const port = 5000;
mongoose
  .connect(
    "mongodb+srv://admin_db_user:eventApp123@eventapp.gg29yzr.mongodb.net/?appName=EventApp",
  )
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err));

//middleware that logs info
app.use(logInfo);
//Routes to the matching route-prefix
app.use("/auth", userRoute); // Requests starting with /auth are redirected to userRoute
app.use("/api/data", eventRoute); // Requests starting with /api/data are redirected to eventRoute
app.use("/api/createevent",createEventRoute);
app.use("/api/img",express.static(`${import.meta.dirname}/uploads`));
app.listen(port, () => {
  console.log(`listening in ${port}`);
});
