import { Schema,model } from "mongoose";

const ticketSchema =new Schema({
    name : String,
    title : String,
    date : String,
    language : String,
    price : Number,
    time : String,
    location : String,
    category : String,
    duration : String,
    description : String,
    Tid : String,
    Eid : String
},{
    timestamps:true
});
const Ticket =model('Ticket',ticketSchema);
export default Ticket;