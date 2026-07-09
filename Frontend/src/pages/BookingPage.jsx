import {
  Calendar,
  Clock,
  Grid3x2,
  Hourglass,
  IndianRupee,
  Languages,
  MapPin,
  Ticket,
  TicketCheck,
  User,
} from "lucide-react";

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Oval } from "react-loader-spinner";

const getData = async (id, setData, setRegistered, setLoading) => {
  try {
    const token = localStorage.getItem("token");

    /* =====================================================
       EVENT DATA
    ===================================================== */

    const res = await fetch(`/api/data/${id}`);

    const eventData = (await res.json()).eventData;

    /* =====================================================
       CHECK REGISTRATION
    ===================================================== */

    const registrationRes = await fetch(`/userevent/check/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (registrationRes.status === 404) {
      setRegistered(false);

      setData(eventData);

      setLoading(false);

      return;
    }

    const registrationData = await registrationRes.json();

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

        status: registrationData.userEvent.status,
      });
    }

    setLoading(false);
  } catch (e) {
    console.log(e);

    setLoading(false);
  }
};

/* =====================================================
   REGISTER EVENT
===================================================== */

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

  /* =====================================================
     STATES
  ===================================================== */

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);

  const [registered, setRegistered] = useState(false);

  const [payment, setPayment] = useState("UPI");

  /* =====================================================
     FETCH
  ===================================================== */

  useEffect(() => {
    getData(id, setData, setRegistered, setLoading);
  }, [id]);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Oval
          width="150"
          height="150"
          color="violet"
          secondaryColor="pink"
          visible={true}
        />
      </div>
    );
  }

  /* =====================================================
     NOT REGISTERED
  ===================================================== */

  if (!registered)
    return (
      <div className="w-full min-h-screen flex justify-center bg-gray-50 darkMode:bg-transparent p-10">
        <div className="flex flex-col w-3/5 bg-white darkMode:bg-(--primaryColor)/30 rounded-3xl border border-gray-100 darkMode:border-(--primaryColor)/40 shadow-lg p-10">
          {/* =====================================================
              TITLE
          ===================================================== */}

          <div className="border-b border-gray-100 darkMode:border-(--primaryColor)/40 pb-6">
            <p className="text-5xl font-bold text-transparent bg-linear-to-r from-blue-500 to-fuchsia-500 bg-clip-text text-center">
              {data.title}
            </p>

            <p className="text-center text-gray-500 darkMode:text-(--secondaryColor)/70 mt-3 text-lg">
              Confirm Your Registration
            </p>
          </div>

          {/* =====================================================
              INFO
          ===================================================== */}

          <div className="flex gap-8 mt-8 text-lg darkMode:text-(--secondaryColor) ">
            {/* LEFT */}

            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex gap-3 items-center rounded-xl border border-gray-200 darkMode:border-(--primaryColor)/40 bg-gray-50 darkMode:bg-(--primaryColor)/20 p-4 flex-wrap">
                <Calendar className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={30} />

                <span className="font-semibold text-(--accentColor)">
                  Date :
                </span>

                {data.date}
              </div>

              <div className="flex gap-3 items-center rounded-xl border border-gray-200 darkMode:border-(--primaryColor)/40 bg-gray-50 darkMode:bg-(--primaryColor)/20 p-4 flex-wrap">
                <Clock className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={30} />

                <span className="font-semibold text-(--accentColor)">
                  Time :
                </span>

                {data.time}
              </div>

              <div className="flex gap-3 items-center rounded-xl border border-gray-200 darkMode:border-(--primaryColor)/40 bg-gray-50 darkMode:bg-(--primaryColor)/20 p-4 flex-wrap">
                <Hourglass className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={30} />

                <span className="font-semibold text-(--accentColor)">
                  Duration :
                </span>

                {data.duration}
              </div>

              <div className="flex gap-3 items-center rounded-xl border border-gray-200 darkMode:border-(--primaryColor)/40 bg-gray-50 darkMode:bg-(--primaryColor)/20 p-4 flex-wrap">
                <Languages className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={30} />

                <span className="font-semibold text-(--accentColor)">
                  Language :
                </span>

                {data.language}
              </div>
            </div>

            {/* RIGHT */}

            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex gap-3 items-center rounded-xl border border-gray-200 darkMode:border-(--primaryColor)/40 bg-gray-50 darkMode:bg-(--primaryColor)/20 p-4 flex-wrap">
                <Grid3x2 className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={30} />

                <span className="font-semibold text-(--accentColor)">
                  Category :
                </span>

                {data.category}
              </div>

              <div className="flex gap-3 items-center rounded-xl border border-gray-200 darkMode:border-(--primaryColor)/40 bg-gray-50 darkMode:bg-(--primaryColor)/20 p-4 flex-wrap">
                <Ticket className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={30} />

                <span className="font-semibold text-(--accentColor)">
                  Slots :
                </span>

                {data.totaltickets - data.tickets}
              </div>
              <div className="flex gap-3 items-center rounded-xl border border-gray-200 darkMode:border-(--primaryColor)/40 bg-gray-50 darkMode:bg-(--primaryColor)/20 p-4 flex-wrap">
                <IndianRupee className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={30} />

                <span className="font-semibold text-(--accentColor)">
                  Price :
                </span>

                {data.price}
              </div>
              <div className="flex gap-3 items-center rounded-xl border border-gray-200 darkMode:border-(--primaryColor)/40 bg-gray-50 darkMode:bg-(--primaryColor)/20 p-4 flex-wrap">
                <MapPin className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={30} />

                <span className="font-semibold text-(--accentColor)">
                  Location :
                </span>

                {data.city + ", " + data.state}
              </div>

              
            </div>
          </div>

          {/* =====================================================
              PAYMENT
          ===================================================== */}

          <div className="mt-9">
            <p className="text-lg font-medium mb-3 darkMode:text-(--secondaryColor)">Select Payment Method</p>

            <div className="flex gap-3">
              {["UPI", "Card"].map((item) => {
                return (
                  <button
                    key={item}
                    className={`w-1/2 p-3 rounded-xl border transition-all duration-200 ${
                      payment === item
                        ? "bg-linear-to-r from-blue-500 to-fuchsia-500 text-white border-none"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => setPayment(item)}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              ACTIONS
          ===================================================== */}

          <div className="flex items-center justify-between mt-10 px-2">
            <p className="flex gap-2 items-center text-3xl font-semibold darkMode:text-(--secondaryColor)">
              <IndianRupee className="text-(--accentColor)" />

              {data.price}
            </p>

            <button
              className="text-2xl bg-linear-to-r from-violet-500 to-pink-500 text-white rounded-2xl px-6 py-3 hover:opacity-80 hover:scale-105 duration-200"
              onClick={() => registerForEvent(id, navigate)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );

  /* =====================================================
     REGISTERED
  ===================================================== */

  return (
    <div className="w-full  flex justify-center bg-gray-50 darkMode:bg-transparent p-10">
      <div className="flex flex-col w-4/5 items-center  bg-white darkMode:bg-(--primaryColor)/30 rounded-3xl border border-gray-100 darkMode:border-(--primaryColor)/40 shadow-lg p-12 ">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="w-full border-b border-gray-100 darkMode:border-(--primaryColor)/40 pb-6 flex justify-between items-start">
          <div> 
            <p className="text-5xl font-bold text-(--primaryColor) darkMode:text-(--secondaryColor)">
              {data.title}
            </p>

            <p className="text-gray-500 darkMode:text-(--secondaryColor)/70 mt-2 text-lg">
              Registration Successful
            </p>
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold darkMode:text-(--secondaryColor)">
              Status :
              <span
                className={`ml-2 px-4 py-1.5 rounded-full text-sm font-medium ${
                  data.checkedIn
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {data.checkedIn ? "checked-in" : data.status}
              </span>
            </p>

            <p className="text-sm text-gray-500 darkMode:text-(--secondaryColor)/70 mt-2">
              Registered :{" "}
              {data.registeredAt
                ? data.registeredAt.slice(0, 10) +
                  ", " +
                  data.registeredAt.slice(11, 19)
                : "NA"}
            </p>
          </div>
        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="flex gap-10 mt-8 w-full">
          {/* LEFT */}

          <div className="w-2/3 flex flex-col gap-5 text-lg darkMode:text-(--secondaryColor)">
            {/* REG ID */}

            <div className="rounded-2xl border border-gray-200 darkMode:border-(--primaryColor)/40 bg-gray-50 darkMode:bg-(--primaryColor)/20 p-5">
              <p className="flex gap-3 items-center break-all">
                <TicketCheck className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                <span className="font-semibold text-(--accentColor)">
                  Registration ID :
                </span>

                {data.registrationId}
              </p>
            </div>

            {/* GRID */}

            <div className="flex gap-6 rounded-2xl border border-gray-200 darkMode:border-(--primaryColor)/40 bg-gray-50 darkMode:bg-(--primaryColor)/20 p-6">
              <div className="w-1/2 flex flex-col gap-6">
                <p className="flex gap-3 items-center">
                  <User className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Name :</span>

                  {user}
                </p>

                <p className="flex gap-3 items-center">
                  <Calendar className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Date :</span>

                  {data.date}
                </p>

                <p className="flex gap-3 items-center">
                  <Clock className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Time :</span>

                  {data.time}
                </p>

                <p className="flex gap-3 items-center">
                  <Hourglass className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Duration :</span>

                  {data.duration}
                </p>
              </div>

              <div className="w-1/2 flex flex-col gap-6">
                <p className="flex gap-3 items-center">
                  <Languages className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Language :</span>

                  {data.language}
                </p>

                <p className="flex gap-3 items-center">
                  <Grid3x2 className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Category :</span>

                  {data.category}
                </p>

                <p className="flex gap-3 items-center">
                  <IndianRupee className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Price :</span>

                  {data.price}
                </p>

                <p className="flex gap-3 items-center">
                  <MapPin className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Location :</span>

                  {data.city + ", " + data.state}
                </p>
              </div>
            </div>

            {/* CHECKED IN */}

            {data.checkedInAt && (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
                <p className="text-green-700 font-medium">
                  Checked In At :{" "}
                  {data.checkedInAt.slice(0, 10) +
                    ", " +
                    data.checkedInAt.slice(11, 19)}
                </p>
              </div>
            )}
          </div>

          {/* QR */}

          <div className="w-1/3 flex flex-col items-center justify-center rounded-3xl border border-gray-200 darkMode:border-(--primaryColor)/40 bg-gray-50 darkMode:bg-(--primaryColor)/20 p-8">
            <div className="flex gap-4 items-center text-green-600 mb-6">
              <TicketCheck size={45} />

              <p className="text-3xl font-bold">Confirmed</p>
            </div>

            <button
              className="px-6 py-3 bg-(--primaryColor) text-white rounded-2xl hover:opacity-80"
              onClick={() => navigate(`/qr/${data.registrationId}`)}
            >
              View QR Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;