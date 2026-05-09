import express from "express";
import User from "../Models/User.js";
import UserInfo from "../Models/UserInfo.js";
import jwt from "jsonwebtoken";

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

/* ================= UPDATE USER INFO ================= */

router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { bio, skills, education, avatar, username, email } = req.body;

    /* ---------------- FIND USER ---------------- */

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    /* ---------------- UPDATE USER ---------------- */

    if (username) {
      user.username = username;
    }

    if (email) {
      user.email = email;
    }

    await user.save();

    /* ---------------- UPDATE USERINFO ---------------- */

    const updatedUserInfo = await UserInfo.findOneAndUpdate(
      { user: user._id },
      {
        bio,
        skills,
        education,
        avatar,
      },
      {
        new: true,
      },
    );

    /* ---------------- RESPONSE ---------------- */

    res.status(200).json({
      message: "Profile updated successfully",

      profile: {
        username: user.username,
        email: user.email,

        bio: updatedUserInfo.bio,

        skills: updatedUserInfo.skills,

        education: updatedUserInfo.education,

        avatar: updatedUserInfo.avatar,
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
