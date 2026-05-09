import express from "express";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserInfo from "../Models/UserInfo.js";
import UserEvent from "../Models/UserEvent.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists!" });
  }
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return res.status(400).json({ message: "Username already exists!" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = new User({ username, email, password: hashedPassword });

    const savedUser = await user.save();

    const userInfo = await UserInfo.create({
      user: savedUser._id,
    });

    savedUser.userInfo = userInfo._id;

    await savedUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log("Token: ", token);
    res.status(201).json({ token, name: username });
  } catch (e) {
    console.log("Error in inserting user to database");
    return res.status(500).json({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Pass not matched!");
      return res.status(400).json({ message: "Invalid password" });
    }
    console.log("Pass matched!");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log("Sending token");
    res.status(201).json({ token, name: user.username, id: user._id });
    console.log("Token sent!");
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

router.get("/u/:username", async (req, res) => {
  try {
    const { username } = req.params;

    /* ---------------- FIND USER ---------------- */

    const user = await User.findOne({ username }).populate("userInfo");

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    /* ---------------- FETCH EVENTS ---------------- */

    const participated = await UserEvent.find({
      user: user._id,
      role: "participated",
    }).populate("event");

    const organized = await UserEvent.find({
      user: user._id,
      role: "organized",
    }).populate("event");

    const volunteered = await UserEvent.find({
      user: user._id,
      role: "volunteered",
    }).populate("event");

    /* ---------------- RESPONSE ---------------- */

    res.status(200).json({
      username: user.username,
      email: user.email,

      bio: user.userInfo?.bio || "",

      skills: user.userInfo?.skills || [],

      education: user.userInfo?.education || "",

      avatar: user.userInfo?.avatar || "",

      stats: user.userInfo?.stats || {
        participated: 0,
        organized: 0,
        volunteered: 0,
      },

      history: {
        participated: participated.map((item) => ({
          id: item.event?._id,
          title: item.event?.title,
          date: item.event?.date,
        })),

        organized: organized.map((item) => ({
          id: item.event?._id,
          title: item.event?.title,
          date: item.event?.date,
        })),

        volunteered: volunteered.map((item) => ({
          id: item.event?._id,
          title: item.event?.title,
          rating: item.rating,
        })),
      },
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: e.message,
    });
  }
});

export default router;
