import { Schema,model } from "mongoose";


const eventSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  language: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: String, required: true },      
  time: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  totaltickets: { type: Number, required: true },
  description: { type: String, required: true },
  coverImagePath: { type: String, required: true },
  user_id: { type: String, required: true }
}, { timestamps: true });


const Event2 =model('Event2',eventSchema);
export default Event2;

// const eventSchema =new Schema({
//     title : String,
//     category : String,
//     language:String,
//     state:String,
//     city:String,
//     area:String,
//     street:String,
    

//     price : Number,
//     tickets : Number,
//     description : String,
// },{
//     timestamps:true
// });

