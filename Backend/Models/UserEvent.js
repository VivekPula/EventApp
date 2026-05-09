// models/UserEvent.js
import mongoose from "mongoose";

const userEventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    role: {
      type: String,
      enum: ["participant", "organizer", "volunteer"],
      required: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: null, // only for volunteered
    },

    status: {
      type: String,
      enum: ["registered", "completed", "cancelled"],
      default: "registered",
    },
  },
  { timestamps: true },
);

export default mongoose.model("UserEvent", userEventSchema);
