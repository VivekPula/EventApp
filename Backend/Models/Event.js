import { Schema,model } from "mongoose";

const eventSchema =new Schema({
    title : String,
    price : Number,
    Slots : Number,
    Location : String,
    Category : String,
    About : String,
},{
    timestamps:true
});
const Event =model('Event',eventSchema);
export default Event;