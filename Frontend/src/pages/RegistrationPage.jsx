import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { QRCodeCanvas } from "qrcode.react";

import {
  Calendar,
  Clock,
  Grid3x2,
  Hourglass,
  IndianRupee,
  Languages,
  MapPin,
  TicketCheck,
  User,
  ShieldCheck,
} from "lucide-react";

import { Oval } from "react-loader-spinner";

const RegistrationPage = () => {
  const { registrationId } = useParams();

  const [registrationData, setRegistrationData] = useState(null);

  const [eventData, setEventData] = useState(null);

  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(true);

  /* =====================================================
     FETCH REGISTRATION
  ===================================================== */

  useEffect(() => {
    const getRegistration = async () => {
      try {
        const res = await fetch(`/userevent/registration/${registrationId}`);

        const data = await res.json();

        setRegistrationData(data.userEvent);

        setEventData(data.eventData);

        setUserData(data.userData);

        setLoading(false);
      } catch (err) {
        console.log(err);

        setLoading(false);
      }
    };

    getRegistration();
  }, [registrationId]);

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
     INVALID
  ===================================================== */

  if (!registrationData || !eventData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold text-red-500">
          Registration not found
        </p>
      </div>
    );
  }

  /* =====================================================
     STATUS UI
  ===================================================== */

  const statusText = registrationData.checkedIn
    ? "checked-in"
    : registrationData.status;

  const statusClass = registrationData.checkedIn
    ? "bg-green-100 text-green-700"
    : registrationData.status === "approved" ||
        registrationData.status === "registered"
      ? "bg-blue-100 text-blue-700"
      : registrationData.status === "pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="w-full h-fit flex justify-center p-8  ">
      <div className="w-2/3  rounded-3xl shadow-2xl  border border-gray-200 p-12 ">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="border-b pb-5 mb-6 flex justify-between items-start">
          <div>
            <p className="text-4xl font-bold text-(--primaryColor)">
              {eventData.title}
            </p>

            <p className="text-gray-500 mt-2 text-lg">Your Event Pass</p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <p className="text-lg font-semibold">
              Status :
              <span
                className={`ml-2 px-4 py-1 rounded-full text-sm font-medium capitalize ${statusClass}`}
              >
                {statusText}
              </span>
            </p>

            <p className="text-sm text-gray-500">
              Registered :{" "}
              {registrationData.createdAt
                ? registrationData.createdAt.slice(0, 10) +
                  ", " +
                  registrationData.createdAt.slice(11, 19)
                : "NA"}
            </p>
          </div>
        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="flex gap-10">
          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <div className="w-2/3 flex flex-col gap-4">
            {/* REGISTRATION ID */}

            <div className="rounded-2xl border-2 border-gray-200 p-4">
              <p className="flex gap-3 items-center text-lg break-all">
                <TicketCheck className="text-(--accentColor)" />

                <span className="font-semibold text-(--accentColor)">
                  Registration ID :
                </span>

                {registrationData._id}
              </p>
            </div>

            {/* INFO GRID */}

            <div className="rounded-2xl border-2 border-gray-200 p-5 flex gap-6">
              {/* LEFT */}

              <div className="w-1/2 flex flex-col gap-5 text-lg">
                <p className="flex gap-3 items-center">
                  <User className="text-(--accentColor)" />

                  {userData?.username || "Unknown User"}
                </p>

                <p className="flex gap-3 items-center">
                  <Calendar className="text-(--accentColor)" />

                  {eventData.date}
                </p>

                <p className="flex gap-3 items-center">
                  <Clock className="text-(--accentColor)" />

                  {eventData.time}
                </p>

                <p className="flex gap-3 items-center">
                  <Hourglass className="text-(--accentColor)" />

                  {eventData.duration}
                </p>
              </div>

              {/* RIGHT */}

              <div className="w-1/2 flex flex-col gap-5 text-lg">
                <p className="flex gap-3 items-center">
                  <Languages className="text-(--accentColor)" />

                  {eventData.language}
                </p>

                <p className="flex gap-3 items-center">
                  <Grid3x2 className="text-(--accentColor)" />

                  {eventData.category}
                </p>

                <p className="flex gap-3 items-center">
                  <IndianRupee className="text-(--accentColor)" />

                  {eventData.price}
                </p>

                <p className="flex gap-3 items-center capitalize">
                  <ShieldCheck className="text-(--accentColor)" />

                  {registrationData.role}
                </p>
              </div>
            </div>

            {/* LOCATION */}

            <div className="rounded-2xl border-2 border-gray-200 p-4">
              <p className="flex gap-3 items-center text-lg">
                <MapPin className="text-(--accentColor)" />

                {eventData.city + ", " + eventData.state}
              </p>
            </div>

            {/* CHECK IN */}

            {registrationData.checkedInAt && (
              <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-4">
                <p className="text-green-700 font-medium">
                  Checked In At :{" "}
                  {registrationData.checkedInAt.slice(0, 10) +
                    ", " +
                    registrationData.checkedInAt.slice(11, 19)}
                </p>
              </div>
            )}
          </div>

          {/* =====================================================
              QR SIDE
          ===================================================== */}

          <div className="w-1/3 flex flex-col items-center justify-center border-2 border-gray-200 rounded-3xl p-6">
            <QRCodeCanvas value={registrationData.qrData} size={220} />

            <p className="mt-5 text-sm text-gray-500 text-center">
              Show this QR at event entry
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
