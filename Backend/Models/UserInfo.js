// models/UserInfo.js
import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    bio: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: String,
      },
    ],

    education: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    stats: {
      participated: { type: Number, default: 0 },
      organized: { type: Number, default: 0 },
      volunteered: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
);

export default mongoose.model("UserInfo", userInfoSchema);
