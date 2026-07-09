import { Link, useParams } from "react-router-dom";

import {
  Calendar,
  Clock,
  Grid3x2,
  Hourglass,
  IndianRupee,
  Languages,
  MapPin,
  Ticket,
  User,
} from "lucide-react";

import ImgScroll from "../components/utils/ImgScroll";

import { useEffect, useState } from "react";

import { Oval } from "react-loader-spinner";

const EventPage = () => {
  const params = useParams();

  const id = params.id;

  /* =========================================================
     STATES
  ========================================================= */

  const [data, setData] = useState({});

  const [eventCreator, setEventCreator] = useState({});

  const [img, setImg] = useState(null);

  const [loading, setLoading] = useState(true);

  const [userRegistration, setUserRegistration] = useState(null);

  const [registrationLoading, setRegistrationLoading] = useState(true);

  /* =========================================================
     FETCH USER REGISTRATION
  ========================================================= */

  const fetchRegistration = async () => {
    try {
      const token = localStorage.getItem("token");

      /* ---------------- NO LOGIN ---------------- */

      if (!token) {
        setUserRegistration(null);

        setRegistrationLoading(false);

        return;
      }

      const res = await fetch(`/userevent/check/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      /* ---------------- NOT REGISTERED ---------------- */

      if (res.status === 404) {
        setUserRegistration(null);

        setRegistrationLoading(false);

        return;
      }

      const data = await res.json();

      /* ---------------- ERROR ---------------- */

      if (!res.ok) {
        setUserRegistration(null);

        setRegistrationLoading(false);

        return;
      }

      /* ---------------- SUCCESS ---------------- */

      setUserRegistration(data.userEvent);

      setRegistrationLoading(false);
    } catch (e) {
      console.log(e);

      /* ---------------- VERY IMPORTANT ---------------- */

      setUserRegistration(null);

      setRegistrationLoading(false);
    }
  };

  /* =========================================================
     APPLY VOLUNTEER
  ========================================================= */

  const applyVolunteer = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/userevent/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          eventId: id,

          role: "Volunteer",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);

        return;
      }

      alert("Volunteer application submitted");

      fetchRegistration();
    } catch (e) {
      console.log(e);

      alert("Error applying as volunteer");
    }
  };

  /* =========================================================
     WITHDRAW APPLICATION
  ========================================================= */

  const withdrawApplication = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/userevent/withdraw/${userRegistration._id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);

        return;
      }

      alert("Application withdrawn");

      setUserRegistration(null);

      fetchRegistration();
    } catch (e) {
      console.log(e);

      alert("Failed to withdraw");
    }
  };

  /* =========================================================
     FETCH EVENT DATA
  ========================================================= */

  useEffect(() => {
    fetch(`/api/data/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.eventData);

        if (data.eventCreator == null) {
          let x = {
            username: "None",
            email: "None",
          };

          setEventCreator(x);
        } else {
          setEventCreator(data.eventCreator);
        }

        let path = data.eventData.coverImagePath;

        setImg(path);

        setLoading(false);
      })
      .catch((err) => console.log(err));

    fetchRegistration();
  }, []);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading)
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

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="w-full h-full flex gap-8 mx-6 px-2 pt-6 pb-10 bg-gray-50 darkMode:bg-transparent">
      {/* =========================================================
          LEFT SECTION
      ========================================================= */}

      <div className="flex-3 flex flex-col gap-16">
        {/* IMAGE */}

        <div className="ml-auto mr-auto h-[65vh] w-full max-w-[60vw] flex rounded-3xl overflow-clip justify-center shadow-md border border-gray-200 darkMode:border-(--primaryColor)/40">
          <ImgScroll imgs={[img]} />
        </div>

        {/* DETAILS */}

        <div className="ml-auto mr-auto w-15/16 bg-white darkMode:bg-(--primaryColor)/30 rounded-3xl shadow-sm border border-gray-100 darkMode:border-(--primaryColor)/40 p-8">
          <p className="text-4xl font-medium border-b pb-3 border-b-gray-200 darkMode:border-b-(--primaryColor)/40 text-(--primaryColor)/80 darkMode:text-(--secondaryColor)">
            Details
          </p>

          <div className="flex flex-wrap gap-y-6 pt-5 darkMode:text-(--secondaryColor)">
            <p className="text-xl mt-2 flex-1/2 pr-4">
              <span className="font-semibold text-(--primaryColor) darkMode:text-(--secondaryColor)">
                Conducted by :
              </span>{" "}
              {eventCreator.username}
            </p>

            <p className="text-xl mt-2 flex-1/2 pr-4">
              <span className="font-semibold text-(--primaryColor) darkMode:text-(--secondaryColor)">
                Type :
              </span>{" "}
              {data.price > 0 ? "Paid" : "Free"}
            </p>

            <p className="text-xl mt-2 flex-1/2 pr-4">
              <span className="font-semibold text-(--primaryColor) darkMode:text-(--secondaryColor)">
                Contributors :
              </span>{" "}
              {data.tickets || 0} people
            </p>

            <p className="text-xl mt-2 flex-1/2 pr-4">
              <span className="font-semibold text-(--primaryColor) darkMode:text-(--secondaryColor)">
                Volunteer Slots :
              </span>{" "}
              {data.volunteers?.requiredCount -
                data.volunteers?.acceptedCount || 0}
            </p>

            <p className="text-xl mt-2 flex-1/2 pr-4">
              <span className="font-semibold text-(--primaryColor) darkMode:text-(--secondaryColor)">
                Available slots :
              </span>{" "}
              {data.totaltickets - data.tickets}
            </p>

            <p className="text-xl mt-2 flex-1/2 pr-4">
              <span className="font-semibold text-(--primaryColor) darkMode:text-(--secondaryColor)">
                Location :
              </span>{" "}
              {data.city + ", " + data.state}
            </p>
          </div>
        </div>

        {/* DESCRIPTION */}

        <div className="ml-auto mr-auto w-15/16 bg-white darkMode:bg-(--primaryColor)/30 rounded-3xl shadow-sm border border-gray-100 darkMode:border-(--primaryColor)/40 p-8">
          <p className="text-4xl font-medium border-b pb-3 border-b-gray-300 darkMode:border-b-(--primaryColor)/40 text-(--primaryColor)/80 darkMode:text-(--secondaryColor)">
            Description
          </p>

          <p className="text-xl pt-5 leading-relaxed darkMode:text-(--secondaryColor)">{data.description}</p>
        </div>

        {/* TERMS */}

        <div className="ml-auto mr-auto w-15/16 bg-white darkMode:bg-(--primaryColor)/30 rounded-3xl shadow-sm border border-gray-100 darkMode:border-(--primaryColor)/40 p-8">
          <p className="text-4xl font-medium border-b pb-3 border-b-gray-300 darkMode:border-b-(--primaryColor)/40 text-(--primaryColor)/80 darkMode:text-(--secondaryColor)">
            Terms and Conditions
          </p>

          <div className="text-xl pt-5 darkMode:text-(--secondaryColor)">
            <ul className="list-disc pl-6 space-y-2">
              <li>Dont do that</li>

              <li>Dont bring that</li>

              <li>Dont throw that</li>

              <li>Dont something that</li>
            </ul>
          </div>
        </div>

        {/* ORGANIZER */}

        <div className="ml-auto mr-auto w-15/16 bg-white darkMode:bg-(--primaryColor)/30 rounded-3xl shadow-sm border border-gray-100 darkMode:border-(--primaryColor)/40 p-8">
          <p className="text-4xl font-medium border-b pb-3 border-b-gray-300 darkMode:border-b-(--primaryColor)/40 mb-1 text-(--primaryColor)/80 darkMode:text-(--secondaryColor)">
            Organised by
          </p>

          <div className="flex flex-col gap-4 w-full text-xl">
            <div className="flex mt-4 gap-6 items-center">
              <div className="h-[20vh] w-[10vw] bg-gray-50 darkMode:bg-(--primaryColor)/20 rounded-2xl shadow-sm border border-gray-200 darkMode:border-(--primaryColor)/40 flex items-center justify-center">
                <User className="h-10 w-10 text-gray-500 darkMode:text-(--secondaryColor)" />
              </div>

              <div className="mt-2 space-y-1.5 darkMode:text-(--secondaryColor)">
                <p>Name :{" " + eventCreator.username}</p>

                <p>Email :{" " + eventCreator.email}</p>

                <p>Other info about this person</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          RIGHT SECTION
      ========================================================= */}

      <div className="flex-1 relative">
        <div className="sticky top-24 pb-8 p-6 rounded-2xl bg-(--primaryColor)/10 darkMode:bg-(--accentColor)/60 shadow-lg border-2 border-(--primaryColor)/10">
          {/* TITLE */}

          <p className="text-4xl font-medium border-b pb-3 border-b-gray-200 text-center text-(--primaryColor)/80 darkMode:text-(--secondaryColor)">
            {data.title}
          </p>

          {/* INFO */}

          <div className="flex flex-col gap-5 mt-6 text-xl">
            <p className="flex gap-3 items-center">
              <span className="bg-white p-2 rounded-full shadow-sm flex items-center justify-center">
                <Calendar className="text-(--accentColor) darkMode:text-(--exColor)/80 h-5 w-5" />
              </span>
              {"   "+data.date}
            </p>

            <p className="flex gap-3 items-center">
              <span className="bg-white p-2 rounded-full shadow-sm flex items-center justify-center">
                <Clock className="text-(--accentColor) darkMode:text-(--exColor)/80 h-5 w-5" />
              </span>
              {"   "+data.time}
            </p>

            <p className="flex gap-3 items-center">
              <span className="bg-white p-2 rounded-full shadow-sm flex items-center justify-center">
                <Hourglass className="text-(--accentColor) darkMode:text-(--exColor)/80 h-5 w-5" />
              </span>
              {"   "+data.duration}
            </p>

            <p className="flex gap-3 items-center">
              <span className="bg-white p-2 rounded-full shadow-sm flex items-center justify-center">
                <Languages className="text-(--accentColor) darkMode:text-(--exColor)/80 h-5 w-5" />
              </span>
              {"   "+data.language}
            </p>

            <p className="flex gap-3 items-center">
              <span className="bg-white p-2 rounded-full shadow-sm flex items-center justify-center">
                <Grid3x2 className="text-(--accentColor) darkMode:text-(--exColor)/80 h-5 w-5" />
              </span>
              {"   "+data.category}
            </p>

            <p className="flex gap-3 items-center flex-wrap">
              <span className="bg-white p-2 rounded-full shadow-sm flex items-center justify-center">
                <MapPin className="text-(--accentColor) darkMode:text-(--exColor)/80 h-5 w-5" />
              </span>
              {"   "+data.city + ", " + data.state}
            </p>

            <p className="flex gap-3 items-center">
              <span className="bg-white p-2 rounded-full shadow-sm flex items-center justify-center">
                <Ticket className="text-(--accentColor) darkMode:text-(--exColor)/80 h-5 w-5" />
              </span>
              {"   "+(data.totaltickets - data.tickets)}
            </p>
          </div>

          {/* ACTIONS */}

          <div className="flex flex-col gap-4 mt-8 px-2 pt-5 border-t border-gray-200">
            {/* PRICE */}

            <p className="flex gap-3 items-center text-2xl">
              <span className="bg-white p-2 rounded-full shadow-sm flex items-center justify-center">
                <IndianRupee className="text-(--accentColor) darkMode:text-(--exColor)/80 h-5 w-5" />
              </span>
              {"   "+data.price}
            </p>

            {/* =====================================================
                USER HAS VOLUNTEER APPLICATION
            ===================================================== */}

            {userRegistration?.role === "Volunteer" && (
              <>
                {/* PENDING */}

                {userRegistration.status === "pending" && (
                  <div className="flex flex-col gap-3">
                    <div className="w-full text-center text-yellow-700 bg-yellow-100 rounded-2xl p-3 font-medium">
                      Waiting for approval
                    </div>

                    <button
                      onClick={withdrawApplication}
                      className="w-full text-xl bg-red-100 text-red-600 rounded-2xl py-2.5 hover:opacity-80"
                    >
                      Withdraw Application
                    </button>
                  </div>
                )}

                {/* APPROVED */}

                {userRegistration.status === "approved" && (
                  <Link to={`/qr/${userRegistration._id}`}>
                    <button className="w-full text-xl bg-green-100 text-green-700 rounded-2xl py-2.5 hover:opacity-80">
                      View Volunteer Pass
                    </button>
                  </Link>
                )}

                {/* REJECTED */}

                {userRegistration.status === "rejected" && (
                  <>
                    <div className="w-full text-center text-red-700 bg-red-100 rounded-2xl p-3 font-medium">
                      Volunteer application rejected
                    </div>
                  </>
                )}
              </>
            )}

            {/* =====================================================
                USER IS PARTICIPANT
            ===================================================== */}

            {userRegistration?.role === "Participant" && (
              <Link to={`/qr/${userRegistration._id}`}>
                <button className="w-full text-xl bg-green-100 text-green-700 rounded-2xl py-2.5 hover:opacity-80">
                  View Ticket
                </button>
              </Link>
            )}

            {/* =====================================================
                NO REGISTRATION
            ===================================================== */}

            {!userRegistration && (
              <>
                {/* VOLUNTEER BUTTON */}

                {data.volunteers?.enabled &&
                  data.volunteers?.acceptedCount <
                    data.volunteers?.requiredCount && (
                    <button
                      onClick={applyVolunteer}
                      className="w-full text-xl bg-(--secondaryColor) text-(--primaryColor) rounded-2xl py-2.5 hover:opacity-80 transform ease-in-out duration-300 hover:scale-105 cursor-pointer"
                    >
                      Apply as Volunteer
                    </button>
                  )}

                {/* BOOKING BUTTON */}

                {data.totaltickets - data.tickets > 0 ? (
                  <Link to={`/bookEvent/${id}`}>
                    <input
                      type="button"
                      className="w-full text-2xl bg-(--primaryColor) text-purple-50 rounded-2xl py-2.5 hover:opacity-80 transform ease-in-out duration-300 hover:scale-105 cursor-pointer"
                      value="Book now!"
                    />
                  </Link>
                ) : (
                  <input
                    type="button"
                    className="w-full text-2xl bg-(--secondaryColor) text-red-500 rounded-2xl py-2.5 cursor-not-allowed"
                    value="Filled!"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;