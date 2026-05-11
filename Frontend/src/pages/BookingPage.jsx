import {
  Calendar,
  Clock,
  Currency,
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
const verify = async (response,navigate,eventId) => {
  const token = localStorage.getItem("token");
  const verRes = await fetch('/payment/verify',{
    method : "POST",
    headers : {
      "Content-type" : "application/json",
    },
    body : JSON.stringify(response),
  });
  if(!verRes.ok){
    alert("Error in transaction");
    return;
  }
  else{
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
  }

}
const loadScript = ()=>{
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
const registerForEvent = async (eventId, navigate, eventdata) => {
  const token = localStorage.getItem("token");
  try {
    if(eventdata.eventType&&eventdata.eventType=="free"){
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
    }
    else{
    const loaded = await loadScript();
    if(!loaded){
      alert("Erro with Payment Service");
      return;
    }
    const payRes = await fetch("/payment/createpayment",{
      method : "POST",
      headers : {
        "Content-Type":"application/json",
      },
      body : JSON.stringify({amount : eventdata.price}),
    });
    if(!payRes.ok){
      alert("Payment Failure");
      return;
    }
    
    const obj = await payRes.json();
    const order = obj.order;
    const key = obj.key;
    const options = {
      key : key,
      amount : order.amount,
      currency : "INR",
      name : eventdata.title +" Event",
      description : "Booking for the Event "+eventdata.title,
      order_id : order.id,
      handler : (response) =>verify(response,navigate,eventId),
      prefill : {
        name : localStorage.name,
        email : 'someone@mail.com',
        contact : "9999999998",
      },
      
      theme: {
        color: "#8b5cf6",
      },
      
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    }
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
      <div className="w-full min-h-screen flex justify-center p-6">
        <div className="flex flex-col w-2/5  rounded-3xl border border-gray-200 shadow-2xl p-7">
          {/* =====================================================
              TITLE
          ===================================================== */}

          <div className="border-b border-gray-200 pb-5">
            <p className="text-5xl font-bold text-transparent bg-linear-to-r from-blue-500 to-fuchsia-500 bg-clip-text text-center">
              {data.title}
            </p>

            <p className="text-center text-gray-500 mt-3 text-lg">
              Confirm Your Registration
            </p>
          </div>

          {/* =====================================================
              INFO
          ===================================================== */}

          <div className="flex gap-6 mt-7 text-lg ">
            {/* LEFT */}

            <div className="flex flex-col gap-5 w-1/2">
              <div className="flex gap-3 items-center rounded-xl border border-gray-200 p-3 flex-wrap">
                <Calendar className="text-(--accentColor)" />

                <span className="font-semibold text-(--accentColor)">
                  Date :
                </span>

                {data.date}
              </div>

              <div className="flex gap-3 items-center rounded-xl border border-gray-200 p-3 flex-wrap">
                <Clock className="text-(--accentColor)" />

                <span className="font-semibold text-(--accentColor)">
                  Time :
                </span>

                {data.time}
              </div>

              <div className="flex gap-3 items-center rounded-xl border border-gray-200 p-3 flex-wrap">
                <Hourglass className="text-(--accentColor)" />

                <span className="font-semibold text-(--accentColor)">
                  Duration :
                </span>

                {data.duration}
              </div>

              <div className="flex gap-3 items-center rounded-xl border border-gray-200 p-3 flex-wrap">
                <Languages className="text-(--accentColor)" />

                <span className="font-semibold text-(--accentColor)">
                  Language :
                </span>

                {data.language}
              </div>
            </div>

            {/* RIGHT */}

            <div className="flex flex-col gap-5 w-1/2">
              <div className="flex gap-3 items-center rounded-xl border border-gray-200 p-3 flex-wrap">
                <Grid3x2 className="text-(--accentColor)" />

                <span className="font-semibold text-(--accentColor)">
                  Category :
                </span>

                {data.category}
              </div>

              <div className="flex gap-3 items-center rounded-xl border border-gray-200 p-3 flex-wrap">
                <Ticket className="text-(--accentColor)" />

                <span className="font-semibold text-(--accentColor)">
                  Slots :
                </span>

                {data.totaltickets - data.tickets}
              </div>
              <div className="flex gap-3 items-center rounded-xl border border-gray-200 p-3 flex-wrap">
                <IndianRupee className="text-(--accentColor)" />

                <span className="font-semibold text-(--accentColor)">
                  Price :
                </span>

                {data.price}
              </div>
              <div className="flex gap-3 items-center rounded-xl border border-gray-200 p-3 flex-wrap">
                <MapPin className="text-(--accentColor)" />

                <span className="font-semibold text-(--accentColor)">
                  Location :
                </span>

                {data.city + ", " + data.state}
              </div>

              
            </div>
          </div>

          

          {/* =====================================================
              ACTIONS
          ===================================================== */}

          <div className="flex items-center justify-between mt-10 px-2">
            <p className="flex gap-2 items-center text-3xl font-semibold">
              <IndianRupee className="text-(--accentColor)" />

              {data.price}
            </p>

            <button
              className="text-2xl bg-linear-to-r from-violet-500 to-pink-500 text-white rounded-2xl px-6 py-3 hover:opacity-80 hover:scale-105 duration-200"
              onClick={() => registerForEvent(id, navigate,data)}
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
    <div className="w-full  flex justify-center  p-6">
      <div className="flex flex-col items-center w-2/3  rounded-3xl border border-gray-200 shadow-2xl p-8 ">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="w-full border-b border-gray-200 pb-5 flex justify-between items-start">
          <div> 
            <p className="text-5xl font-bold text-(--primaryColor)">
              {data.title}
            </p>

            <p className="text-gray-500 mt-2 text-lg">
              Registration Successful
            </p>
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold">
              Status :
              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                  data.checkedIn
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {data.checkedIn ? "checked-in" : data.status}
              </span>
            </p>

            <p className="text-sm text-gray-500 mt-2">
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

          <div className="w-2/3 flex flex-col gap-5 text-lg">
            {/* REG ID */}

            <div className="rounded-2xl border border-gray-200 p-4">
              <p className="flex gap-3 items-center break-all">
                <TicketCheck className="text-(--accentColor)" />

                <span className="font-semibold text-(--accentColor)">
                  Registration ID :
                </span>

                {data.registrationId}
              </p>
            </div>

            {/* GRID */}

            <div className="flex gap-5 rounded-2xl border border-gray-200 p-5">
              <div className="w-1/2 flex flex-col gap-5">
                <p className="flex gap-3 items-center">
                  <User className="text-(--accentColor)" />

                  {user}
                </p>

                <p className="flex gap-3 items-center">
                  <Calendar className="text-(--accentColor)" />

                  {data.date}
                </p>

                <p className="flex gap-3 items-center">
                  <Clock className="text-(--accentColor)" />

                  {data.time}
                </p>

                <p className="flex gap-3 items-center">
                  <Hourglass className="text-(--accentColor)" />

                  {data.duration}
                </p>
              </div>

              <div className="w-1/2 flex flex-col gap-5">
                <p className="flex gap-3 items-center">
                  <Languages className="text-(--accentColor)" />

                  {data.language}
                </p>

                <p className="flex gap-3 items-center">
                  <Grid3x2 className="text-(--accentColor)" />

                  {data.category}
                </p>

                <p className="flex gap-3 items-center">
                  <IndianRupee className="text-(--accentColor)" />

                  {data.price}
                </p>

                <p className="flex gap-3 items-center">
                  <MapPin className="text-(--accentColor)" />

                  {data.city + ", " + data.state}
                </p>
              </div>
            </div>

            {/* CHECKED IN */}

            {data.checkedInAt && (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
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

          <div className="w-1/3 flex flex-col items-center justify-center rounded-3xl border border-gray-200 p-6">
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
