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

const getData = async (id, setData, setBooked, setLoading) => {
  try {
    const res = await fetch(`/api/data/${id}`);
    const data = (await res.json()).eventData;

    const user_id = localStorage.id;

    const ticketRes = await fetch(
      `/api/data/ticket?event=${data.title}&user_id=${user_id}`,
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

const book = async (data, id, navigate) => {
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

  const result = await res.json();

  if (result.ticketId) {
    navigate(`/ticket/${result.ticketId}`);
  }
};

const BookingPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id;
  const user = localStorage.name;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [booked, setBooked] = useState(false);

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
        <div className="flex flex-col w-1/3 h-11/12 m-2 p-2 rounded-2xl border-4 border-(--primaryColor)/10 darkMode:bg-(--accentColor)/60">
          <p className="text-5xl font-medium border-b pb-2 border-b-gray-200 text-center text-(--primaryColor)/80 darkMode:text-(--secondaryColor)">
            {data.title}
          </p>

          <div className="flex gap-10 mt-5 text-l justify-center w-full">
            <div className="flex flex-col gap-5 w-1/3 ml-auto">
              <p className="flex gap-2 items-center min-w-1/3 ">
                <Calendar className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {data.date}
              </p>

              <p className="flex gap-2 items-center min-w-1/3 ">
                <Clock className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {data.time} pm
              </p>

              <p className="flex gap-2 items-center min-w-1/3 ">
                <Hourglass className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {data.duration}
              </p>

              <p className="flex gap-2 items-center min-w-1/3 ">
                <Languages className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {data.language}
              </p>
            </div>

            <div className="flex flex-col gap-5 w-1/2">
              <p className="flex gap-2 items-center min-w-1/3 ">
                <Grid3x2 className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {data.category}
              </p>

              <p className="flex gap-2 items-center min-w-1/3 ">
                <Ticket className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {data.totaltickets}
              </p>

              <p className="flex gap-2 items-center min-w-1/3 ">
                <Star className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {data.totaltickets}
              </p>

              <p className="flex gap-2 items-center min-w-1/3 ">
                <MapPin className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {data.city + ", " + data.state}
              </p>
            </div>
          </div>

          <p className="mt-10 mx-4 text-l">Select Payment Method :</p>

          <div className="flex flex-col text-xl mt-3 gap-2 mx-4">
            <input
              type="button"
              value={"UPI"}
              className="border-2 border-(--primaryColor)/50 rounded-xl darkMode:border-(--secondaryColor) hover:bg-(--primaryColor)/20 darkMode:hover:bg-(--exColor)/40"
            />

            <input
              type="button"
              value={"Card"}
              className="border-2 border-(--primaryColor)/50 rounded-xl darkMode:border-(--secondaryColor) hover:bg-(--primaryColor)/20 darkMode:hover:bg-(--exColor)/40"
            />
          </div>

          <div className=" flex items-center px-5 py-2 justify-between mb-4 mt-auto rounded-xl">
            <p className="flex gap-2 items-center text-2xl">
              <IndianRupee className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
              : {data.price}
            </p>

            <input
              type="button"
              className=" text-2xl bg-(--primaryColor) text-purple-50 rounded-2xl p-2 hover:opacity-80"
              value="Join now!"
              onClick={() => book(data, id, navigate)}
            />
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="w-full h-full flex justify-center">
        <div className="flex flex-col items-center w-2/3 h-8/11 m-2 p-2 my-auto rounded-2xl border-4 border-(--primaryColor)/10 darkMode:bg-(--accentColor)/60 shadow-2xl">
          <p className="w-9/10 text-5xl font-medium border-b pb-2 border-b-gray-200 text-center text-(--primaryColor)/80 darkMode:text-(--secondaryColor)">
            {data.title}
          </p>

          <div className="flex gap-10 mt-10 text-xl justify-center w-8/10">
            <div className="flex flex-col gap-5 w-1/2 ml-15 ">
              <p className="flex gap-2 items-center min-w-1/3 ">
                <User className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {user}
              </p>

              <p className="flex gap-2 items-center min-w-1/3 ">
                <Calendar className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {data.date}
              </p>

              <p className="flex gap-2 items-center min-w-1/3 ">
                <Clock className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {data.time} pm
              </p>

              <p className="flex gap-2 items-center min-w-1/3 ">
                <Hourglass className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {data.duration}
              </p>
            </div>

            <div className="flex flex-col gap-5 w-1/2">
              <p className="flex gap-2 items-center min-w-1/3 ">
                <Languages className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {data.language}
              </p>

              <p className="flex gap-2 items-center min-w-1/3 ">
                <Grid3x2 className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {data.category}
              </p>

              <p className="flex gap-2 items-center min-w-1/3 ">
                <IndianRupee className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {data.price}
              </p>

              <p className="flex gap-2 items-center min-w-1/3 ">
                <MapPin className="text-(--accentColor) darkMode:text-(--exColor)/80" />{" "}
                : {data.city + ", " + data.state}
              </p>
            </div>
          </div>

          <div className=" flex gap-4 items-center px-5 mb-2 mt-auto rounded-xl text-green-500 border">
            <TicketCheck size={60} />

            <p className="text-5xl font-bold">Ticket Booked</p>
          </div>

          <div className="mb-4">
            <p>
              Booked At :{" "}
              {data.ticketBookedAt
                ? data.ticketBookedAt.slice(0, 10) +
                  ", " +
                  data.ticketBookedAt.slice(11, 19)
                : "NA"}
            </p>
          </div>

          {data.ticketId && (
            <Link to={`/ticket/${data.ticketId}`}>
              <button className="px-5 py-2 bg-(--primaryColor) text-white rounded-xl hover:opacity-80">
                View Ticket
              </button>
            </Link>
          )}
        </div>
      </div>
    );
};

export default BookingPage;
