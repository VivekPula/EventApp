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
      ref: "Event2",
      required: true,
    },

    role: {
      type: String,

      enum: ["Participant", "Organizer", "Volunteer"],

      required: true,
    },

    status: {
      type: String,

      enum: [
        "pending",
        "approved",
        "registered",
        "completed",
        "cancelled",
        "rejected",
      ],

      default: "registered",
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: null,
    },

    /* ================= QR ================= */

    qrData: {
      type: String,
      default: null,
    },

    /* ================= CHECK-IN ================= */

    checkedIn: {
      type: Boolean,
      default: false,
    },

    checkedInAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("UserEvent", userEventSchema);
