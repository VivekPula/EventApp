import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: ["free", "paid"],
      required: true,
      default: "paid",
    },

  
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    totaltickets: {
      type: Number,
      required: true,
    },

    tickets: {
      type: Number,
      default: 0,
    },

    /* ================= VOLUNTEERS ================= */

    volunteers: {
      enabled: {
        type: Boolean,
        default: false,
      },

      requiredCount: {
        type: Number,
        default: 0,
      },

      acceptedCount: {
        type: Number,
        default: 0,
      },
    },

    description: {
      type: String,
      required: true,
    },

    coverImagePath: {
      type: String,
      required: true,
    },

    coverImagepublicId: {
      type: String,
      required: true,
    },

    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Event2 = model("Event2", eventSchema);

export default Event2;
