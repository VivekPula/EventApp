import { Schema, model } from "mongoose";
const ticketSchema = new Schema(
  {
    name: String,
    user_id: String,
    title: String,

    // Existing field kept to avoid breaking old data
    Status: Boolean,

    // New proper ticket status
    status: {
      type: String,
      enum: ["booked", "participated"],
      default: "booked",
    },

    Tid: {
      type: String,
      unique: true,
    },

    Eid: String,

    qrData: String,

    scannedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Ticket = model("Ticket", ticketSchema);

export default Ticket;


// import { Schema,model } from "mongoose";

// const ticketSchema =new Schema({
//     name : String,
//     user_id : String,
//     title : String,
//     Status : Boolean,
//     Tid : String,
//     Eid : String
// },{
//     timestamps:true
// });
// const Ticket =model('Ticket',ticketSchema);
// export default Ticket;