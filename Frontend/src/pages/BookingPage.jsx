import { Calendar, Clock, Grid3x2, Hourglass, IndianRupee, Languages, MapPin, Star, Ticket } from "lucide-react";
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
        <div className="flex flex-col  w-1/3 h-11/12 m-2 p-2  rounded-2xl border-4 border-(--primaryColor)/10 darkMode:bg-(--accentColor)/60" >
                    <p className="text-5xl font-medium border-b pb-2 border-b-gray-200 text-center text-(--primaryColor)/80 darkMode:text-(--secondaryColor)">{data.title}</p>
                    <div className="flex gap-10 mt-5 text-l justify-center w-full">
                        <div className="flex flex-col gap-5 w-1/3 ml-auto">
                        <p className="flex gap-2 items-center min-w-1/3 "> <Calendar className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : {data.date}</p>
                        <p className="flex gap-2 items-center min-w-1/3 "> <Clock className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : {data.totaltickets} pm</p>
                        <p className="flex gap-2 items-center min-w-1/3 "> <Hourglass className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : {data.duration}</p>
                        <p className="flex gap-2 items-center min-w-1/3 "> <Languages className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : {data.language}</p>
                        </div>
                        <div className="flex flex-col gap-5 w-1/2">
                        <p className="flex gap-2 items-center min-w-1/3 "> <Grid3x2 className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : {data.category}</p>
                        <p className="flex gap-2 items-center min-w-1/3 "> <Ticket className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : {data.price}</p>
                        <p className="flex gap-2 items-center min-w-1/3 "> <Star className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : {data.totaltickets}</p>
                        <p className="flex gap-2 items-center min-w-1/3 "> <MapPin className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : {data.city+", "+data.state}</p>
                        </div>
                    </div>
                    <p className="mt-10 mx-4 text-l">Select Payment Method :</p>
                    <div className="flex flex-col text-xl mt-3  gap-2 mx-4">
                        <input type="button" value={"UPI"} className="border-2 border-(--primaryColor)/50 rounded-xl darkMode:border-(--secondaryColor) hover:bg-(--primaryColor)/20 darkMode:hover:bg-(--exColor)/40"/>
                        <input type="button" value={"Card"} className="border-2 border-(--primaryColor)/50 rounded-xl darkMode:border-(--secondaryColor) hover:bg-(--primaryColor)/20 darkMode:hover:bg-(--exColor)/40"/>
                    </div>
                    <div className=" flex items-center px-5 py-2 justify-between mb-4 mt-auto rounded-xl">
                        <p className="flex gap-2 items-center text-2xl"> <IndianRupee className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : {data.price}</p>
                        <input type="button" className=" text-2xl bg-(--primaryColor) text-purple-50 rounded-2xl p-2 hover:opacity-80" value="Join now!"/>
                    </div>
                    
                </div>
            </div>
    )
}
export default BookingPage;