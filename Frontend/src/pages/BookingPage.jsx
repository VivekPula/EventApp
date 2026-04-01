import { Calendar, Clock, Grid3x2, Hourglass, IndianRupee, Languages, MapPin, Ticket } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const BookingPage = () =>{
    const params=useParams();
    const id=params.id;
    const [data,setData]=useState({});
    useEffect(()=>{
        fetch(`/api/data/${id}`)
        .then(response => response.json())
        .then(data =>setData(data))
        .catch(err=>console.log(err));
    },[])
    return (
        <div className="w-full h-full flex justify-center"> 
        <div className="w-1/2 h-11/12 m-2 p-2  rounded-2xl bg-(--primaryColor)/10 darkMode:bg-(--accentColor)/60" >
                    <p className="text-5xl font-medium border-b pb-2 border-b-gray-200 text-center text-(--primaryColor)/80 darkMode:text-(--secondaryColor)">{data.title}</p>
                    <div className="flex flex-wrap gap-5 mt-4 ml-4 text-xl">
                        <p className="flex gap-2 items-center min-w-1/4"> <Calendar className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : Date</p>
                        <p className="flex gap-2 items-center min-w-1/4"> <Clock className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : {data.Slots} pm</p>
                        <p className="flex gap-2 items-center min-w-1/4"> <Hourglass className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : Duration</p>
                        <p className="flex gap-2 items-center min-w-1/4"> <Languages className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : Languages</p>
                        <p className="flex gap-2 items-center min-w-1/4"> <Grid3x2 className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : {data.Category}</p>
                        <p className="flex gap-2 items-center min-w-1/4"> <MapPin className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : {data.Location}</p>
                        <p className="flex gap-2 items-center min-w-1/4"> <Ticket className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : {data.Slots}</p>
                    </div>
                    <div className="flex items-center pl-5 pr-5 justify-between mt-5">
                        <p className="flex gap-2 items-center text-2xl"> <IndianRupee className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : {data.price}</p>
                        <input type="button" className=" text-2xl bg-(--primaryColor) text-purple-50 rounded-2xl p-2" value="Join now!"/>
                    </div>
                    
                </div>
            </div>
    )
}
export default BookingPage;