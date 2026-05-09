import {
  Calendar,
  Clock,
  Grid3x2,
  Hourglass,
  IndianRupee,
  Languages,
  MapPin,
  Star,
  Ticket,
  TicketCheck,
  User,
} from "lucide-react";

import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Navigate } from "react-router-dom";

const getData = async (id, setData, setBooked, setLoading) => {
  try {
    const res = await fetch(`/api/data/${id}`);
    const data = (await res.json()).eventData;

    const user_id = localStorage.id;

    const ticketRes = await fetch(
      `/api/data/ticket?event=${data.title}&user_id=${user_id}`
    );

    const ticketData = await ticketRes.json();

    if (ticketData.NA != null && ticketData.NA === "true") {
      setBooked(false);
      setData(data);
    } else if (ticketData != null) {
      setData(ticketData);
      setBooked(true);
    }

    setLoading(false);
    console.log(data);
  } catch (e) {
    console.log("Error : " + e);
  }
};

const book = async (data, id, navigate,setLoading) => {
  setLoading(true);
  const name = localStorage.name;
  const user_id = localStorage.id;

  const query = {
    name: name,
    user_id: user_id,
    title: data.title,
    Eid: id,
  };

  const res = await fetch("/api/data/ticket", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(query),
  }).catch((err) => console.log(err));

//   const result = await res.json();

//   if (result.ticketId) {
//     navigate(`/ticket/${result.ticketId}`);
//   }
  setLoading(false);
};

const BookingPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id;
  const user = localStorage.name;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [booked, setBooked] = useState(false);
  const [payment,setPayment] = useState('UPI');

  useEffect(() => {
    getData(id, setData, setBooked, setLoading);
  }, [booked, loading]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Oval
          width="150"
          height="150"
          color="violet"
          secondaryColor="pink"
          visible={true}
        />
      </div>
    );
  } else if (!booked)
        return (
        <div className="w-full h-full flex justify-center"> 
        <div className="flex flex-col  w-2/5  m-2 p-2  rounded-2xl border-4 border-(--primaryColor)/10 darkMode:bg-(--accentColor)/60 shadow-2xl " >
                    <p className="text-5xl font-medium border-b pb-2 border-b-gray-200 text-center text-transparent bg-linear-to-t from-blue-500  to-fuchsia-500 bg-clip-text ">{data.title}</p>
                    <div className="flex gap-5  text-l justify-center w-11/12 items-center mx-auto my-auto">
                        <div className="flex flex-col gap-5 w-1/2 h-full">
                        <p className="flex gap-2 items-center min-w-1/3 rounded-xl p-2 shadow-sm"> <Calendar className="text-(--accentColor) darkMode:text-(--exColor)/80"/><span className="text-(--accentColor) font-semibold">Date :</span>  {data.date}</p>
                        <p className="flex gap-2 items-center min-w-1/3 rounded-xl p-2 shadow-sm"> <Clock className="text-(--accentColor) darkMode:text-(--exColor)/80"/><span className="text-(--accentColor) font-semibold">Time :</span>   {data.time} pm</p>
                        <p className="flex gap-2 items-center min-w-1/3 rounded-xl p-2 shadow-sm"> <Hourglass className="text-(--accentColor) darkMode:text-(--exColor)/80"/><span className="text-(--accentColor) font-semibold">Duration :</span>  {data.duration}</p>
                        <p className="flex gap-2 items-center min-w-1/3 rounded-xl p-2 shadow-sm"> <Languages className="text-(--accentColor) darkMode:text-(--exColor)/80"/><span className="text-(--accentColor) font-semibold">Language :</span>  {data.language}</p>
                        </div>
                        <div className="flex flex-col gap-5 w-1/2 h-full">
                        <p className="flex gap-2 items-center min-w-1/3 rounded-xl p-2 shadow-sm"> <Grid3x2 className="text-(--accentColor) darkMode:text-(--exColor)/80"/><span className="text-(--accentColor) font-semibold">Category :</span>   {data.category}</p>
                        <p className="flex gap-2 items-center min-w-1/3 rounded-xl p-2 shadow-sm"> <Ticket className="text-(--accentColor) darkMode:text-(--exColor)/80"/><span className="text-(--accentColor) font-semibold">Tickets left :</span>  {data.totaltickets}</p>
                        {/*     <p className="flex flex-wrap gap-2 items-center min-w-1/3 rounded-xl p-2 shadow-sm"> <Star className="text-(--accentColor) darkMode:text-(--exColor)/80"/><span className="text-(--accentColor) font-semibold">Stars :</span>  {data.totaltickets}</p> */}
                        <p className="flex flex-wrap gap-2 items-center min-w-1/3 rounded-xl p-2 shadow-sm"> <MapPin className="text-(--accentColor) darkMode:text-(--exColor)/80"/><span className="text-(--accentColor) font-semibold">Location :</span>  {data.city+", "+data.state}</p>
                        </div>
                    </div>
                    <p className=" mx-4 text-l">Select Payment Method :</p>
                    <div className="flex text-xl mt-3 gap-2 mx-4">
                        {['UPI','Card'].map((item)=>{
                            return <button key={item} className={`w-1/2 p-2 ${ payment===item?"bg-linear-to-br from-blue-400 to-fuchsia-400 text-gray-100":"border-gray-100 border"} rounded-xl shadow-md`} onClick={()=>setPayment(item)}>{item}</button>;
                        })}
                    </div>
                    <div className=" flex items-center px-5 py-2 justify-between mb-4 mt-auto rounded-xl">
                        <p className="flex gap-2 items-center text-2xl"> <IndianRupee className="text-(--accentColor) darkMode:text-(--exColor)/80"/> : {data.price}</p>
                        <input type="button" className=" text-2xl bg-linear-to-r from-violet-500 to-pink-500 pin text-purple-50 rounded-2xl p-2 hover:opacity-80 hover:scale-105 duration-200" value="Confirm" onClick={()=>book(data,id,setBooked,setLoading)}/>
                    </div>
                    
                </div>
            </div>
    );
  else
    return <Navigate to={`/ticket/${data.ticketId}`} replace />;
    
};

export default BookingPage;