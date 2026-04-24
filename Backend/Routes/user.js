import express from "express";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists!" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = new User({ name, email, password: hashedPassword });
    const savedUser = await user.save();
    console.log("User registered successfully!");

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log("Token: ", token);
    // console.log(savedUser._id);
    res.status(201).json({ token, name,id: savedUser._id });
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
    res.status(201).json({ token, name: user.name , id: user._id });
    console.log("Token sent!");
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

export default router;
