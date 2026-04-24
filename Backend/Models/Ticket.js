import { Schema,model } from "mongoose";

const ticketSchema =new Schema({
    name : String,
    user_id : String,
    title : String,
    Status : Boolean,
    Tid : String,
    Eid : String
},{
    timestamps:true
});
const Ticket =model('Ticket',ticketSchema);
export default Ticket;