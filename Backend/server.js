// Importing dependencies
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
//import dotenv from "dotenv";
import cors from "cors";
//dotenv.config();

// Importing utils
import logInfo from "./utils/logInfo.js";

// Importing Routes
import userRoute from "./Routes/user.js";
import eventRoute from "./Routes/event.js";
import createEventRoute from "./Routes/createEvent.js";
import userInfoRoute from "./Routes/userInfo.js";
import userEventRoute from "./Routes/userEvent.js";
import paymentRoute from "./Routes/payment.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err));

//middleware that logs info
app.use(logInfo);
//Routes to the matching route-prefix
app.use("/user", userRoute); // Requests starting with /auth are redirected to userRoute
app.use("/api/data", eventRoute); // Requests starting with /api/data are redirected to eventRoute
app.use("/api/createevent", createEventRoute);
app.use("/userinfo", userInfoRoute);
app.use("/userevent", userEventRoute);
app.use("/payment",paymentRoute);

app.listen(port, () => {
  console.log(`listening in ${port}`);
});
