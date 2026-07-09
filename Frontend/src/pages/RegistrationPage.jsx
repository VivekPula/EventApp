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
    <div className="w-full h-fit flex justify-center p-10 bg-gray-50 darkMode:bg-transparent">
      <div className="w-full bg-white darkMode:bg-(--primaryColor)/30 rounded-3xl shadow-lg border border-gray-100 darkMode:border-(--primaryColor)/40 p-14">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="border-b border-gray-100 darkMode:border-(--primaryColor)/40 pb-6 mb-8 flex justify-between items-start">
          <div>
            <p className="text-4xl font-bold text-(--primaryColor) darkMode:text-(--secondaryColor)">
              {eventData.title}
            </p>

            <p className="text-gray-500 darkMode:text-(--secondaryColor)/70 mt-2 text-lg">Your Event Pass</p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <p className="text-lg font-semibold darkMode:text-(--secondaryColor) flex items-center gap-2">
              Status :
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${statusClass}`}
              >
                {statusText}
              </span>
            </p>

            <p className="text-sm text-gray-500 darkMode:text-(--secondaryColor)/70">
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

          <div className="w-full flex flex-col gap-5">
            {/* REGISTRATION ID */}

            <div className="rounded-2xl border border-gray-200 darkMode:border-(--primaryColor)/40 bg-gray-50 darkMode:bg-(--primaryColor)/20 p-5">
              <p className="flex gap-3 items-center text-lg break-all darkMode:text-(--secondaryColor)">
                <TicketCheck className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                <span className="font-semibold text-(--accentColor)">
                  Registration ID :
                </span>

                {registrationData._id}
              </p>
            </div>

            {/* INFO GRID */}

            <div className="rounded-2xl border border-gray-200 darkMode:border-(--primaryColor)/40 bg-gray-50 darkMode:bg-(--primaryColor)/20 p-6 flex gap-8">
              {/* LEFT */}

              <div className="w-1/2 flex flex-col gap-6 text-lg darkMode:text-(--secondaryColor)">
                <p className="flex gap-3 items-center">
                  <User className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Name :</span>

                  {userData?.username || "Unknown User"}
                </p>

                <p className="flex gap-3 items-center">
                  <Calendar className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Date :</span>

                  {eventData.date}
                </p>

                <p className="flex gap-3 items-center">
                  <Clock className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Time :</span>

                  {eventData.time}
                </p>

                <p className="flex gap-3 items-center">
                  <Hourglass className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Duration :</span>

                  {eventData.duration}
                </p>
              </div>

              {/* RIGHT */}

              <div className="w-1/2 flex flex-col gap-6 text-lg darkMode:text-(--secondaryColor)">
                <p className="flex gap-3 items-center">
                  <Languages className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Language :</span>

                  {eventData.language}
                </p>

                <p className="flex gap-3 items-center">
                  <Grid3x2 className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Category :</span>

                  {eventData.category}
                </p>

                <p className="flex gap-3 items-center">
                  <IndianRupee className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Price :</span>

                  {eventData.price}
                </p>

                <p className="flex gap-3 items-center capitalize">
                  <ShieldCheck className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                  <span className="font-semibold text-(--accentColor)">Role :</span>

                  {registrationData.role}
                </p>
              </div>
            </div>

            {/* LOCATION */}

            <div className="rounded-2xl border border-gray-200 darkMode:border-(--primaryColor)/40 bg-gray-50 darkMode:bg-(--primaryColor)/20 p-5">
              <p className="flex gap-3 items-center text-lg darkMode:text-(--secondaryColor)">
                <MapPin className="text-(--accentColor) bg-white darkMode:bg-(--secondaryColor)/90 rounded-full p-1.5 shadow-sm" size={34} />

                <span className="font-semibold text-(--accentColor)">Location :</span>

                {eventData.city + ", " + eventData.state}
              </p>
            </div>

            {/* CHECK IN */}

            {registrationData.checkedInAt && (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
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

          <div className="w-1/3 flex flex-col items-center justify-center border border-gray-200 darkMode:border-(--primaryColor)/40 bg-gray-50 darkMode:bg-(--primaryColor)/20 rounded-3xl p-8 gap-3">
            <QRCodeCanvas value={registrationData.qrData} size={220} />

            <p className="mt-3 text-sm text-gray-500 darkMode:text-(--secondaryColor)/70 text-center">
              Show this QR at event entry
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;  