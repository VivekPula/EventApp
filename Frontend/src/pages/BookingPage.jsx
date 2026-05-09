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

const getData = async (id, setData, setRegistered, setLoading) => {
  try {
    const token = localStorage.getItem("token");

    /* ---------------- EVENT DATA ---------------- */

    const res = await fetch(`/api/data/${id}`);

    const eventData = (await res.json()).eventData;

    /* ---------------- CHECK REGISTRATION ---------------- */

    const registrationRes = await fetch(`/userevent/check/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const registrationData = await registrationRes.json();
    console.log(registrationData.userEvent);

    if (!registrationRes.ok) {
      setRegistered(false);
      setData(eventData);
    } else {
      setRegistered(true);

      setData({
        ...eventData,

        registrationId: registrationData.userEvent._id,

        role: registrationData.userEvent.role,

        qrData: registrationData.userEvent.qrData,

        checkedIn: registrationData.userEvent.checkedIn,

        checkedInAt: registrationData.userEvent.checkedInAt,

        registeredAt: registrationData.userEvent.createdAt,
      });
    }

    setLoading(false);
  } catch (e) {
    console.log(e);
  }
};

const registerForEvent = async (eventId, navigate) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("/userevent/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        eventId,
        role: "Participant",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    navigate(0);
  } catch (e) {
    console.log(e);
  }
};

const BookingPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id;
  const user = localStorage.name;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    getData(id, setData, setRegistered, setLoading);
  }, [id]);

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
  } else if (!registered)
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
              onClick={() => registerForEvent(id, navigate)}
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
              {data.registeredAt
                ? data.registeredAt.slice(0, 10) +
                  ", " +
                  data.registeredAt.slice(11, 19)
                : "NA"}
            </p>
          </div>

          {data.qrData && (
            <button
              className="px-5 py-2 bg-(--primaryColor) text-white rounded-xl"
              onClick={() => navigate(`/qr/${data.registrationId}`)}
            >
              View QR
            </button>
          )}
        </div>
      </div>
    );
};

export default BookingPage;
