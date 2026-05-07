import React from "react";
import { IndianRupee, SendToBack, Ticket } from "lucide-react";
import BookingDetails from "../components/common/BookingDetails";

import { useParams } from "react-router-dom";

import { useEffect, useState } from 'react'

import { Link } from "react-router-dom";



function HostEventPage() {
  const params = useParams()
  const event_id = params.id;

  const [title, settitle] = useState("title") //can remove usestate later
  const [totalbookings, settotalbookings] = useState(0)
  const [totaltickets, settotaltickets] = useState(0)
  const [bookedtickets, setbookedtickets] = useState(0)
  const [ticketprice, setticketprice] = useState(0)

  const [userdetails, setuserdetails] = useState([])

  // console.log(event_id);



  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/data/event/bookingdetails/${event_id}`);
        const data = await res.json();

        // console.log(data);


        const { eventdetails, userdetails } = data
        setbookedtickets(eventdetails.saledtickets)
        settitle(eventdetails.title)
        setticketprice(eventdetails.price)
        settotaltickets(eventdetails.totaltickets)
        setuserdetails(userdetails)
        console.log("Data received:", userdetails);

      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);


  return (
    <div className="w-full  p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="  text-gray-500">
          Host Event Page
        </h1>
        <p className=" text-2xl text-gray-800  font-bold mt-1">
          Booking dashboard of {title} event
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-row gap-x-[30px] mb-[15px]">
        <BookingDetails
          Icon={Ticket}
          name={`Total Bookings/ ${totaltickets}`}
          count={bookedtickets}
        />
        <BookingDetails
          Icon={IndianRupee}
          name="Total Revenue"
          count={ticketprice * bookedtickets}
        />
      </div>

   
      <div className="my-6 p-4 border border-gray-200 rounded-lg bg-gray-50 ">
        <p className="mb-3 text-gray-700 font-medium">
          See your live event page
        </p>

        <Link to={`/events/event/${event_id}`}>
          <button className="px-4 py-2 bg-[var(--primaryColor)]/80 text-white rounded-md hover:bg-[var(--primaryColor)]/100">
            Myevent Page
          </button>
        </Link>
      </div>

      {/* Booking Table */}
      <div className="bg-white rounded-xl  border border-gray-200 p-5 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Booking Details
          </h2>
          {/* <span className="text-sm text-gray-500">
            2 bookings
          </span> */}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[var(--primaryColor)]/10 text-gray-700">
                <th className="px-4 py-3 text-left font-semibold">
                  Ticket ID
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Mobile
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Booking Time
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200" >
              {userdetails.map((item, index) => {
                return (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800 ">{item.Tid}</td>
                    <td className="px-4 py-3 font-medium text-gray-800 " >{item.name}</td>
                    <td className="px-4 py-3 font-medium text-gray-800 " >{item.email}</td>
                    <td className="px-4 py-3 text-gray-600">
                      9999999999
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      10:30 AM
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default HostEventPage;