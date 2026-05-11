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
  Users,
  ChevronRight,
  Star,
  Shield,
  Zap,
} from "lucide-react";
import ImgScroll from "../components/utils/ImgScroll";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

const InfoRow = ({ icon: Icon, value }) => (
  <div className="flex items-center gap-3 border-b border-zinc-100 py-3 last:border-b-0">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--secondaryColor)]">
      <Icon className="h-4 w-4 text-[var(--primaryColor)]" />
    </div>

    <span className="text-sm text-zinc-700">{value}</span>
  </div>
);

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--secondaryColor)]">
      <Icon className="h-4 w-4 text-[var(--primaryColor)]" />
    </div>

    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p className="text-sm font-medium text-zinc-800">{value}</p>
    </div>
  </div>
);

const initials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "?";

const EventPage = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState({});
  const [eventCreator, setEventCreator] = useState({});
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRegistration, setUserRegistration] = useState(null);

  const fetchRegistration = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUserRegistration(null);
        return;
      }

      const res = await fetch(`/userevent/check/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 404) {
        setUserRegistration(null);
        return;
      }

      const d = await res.json();

      if (!res.ok) {
        setUserRegistration(null);
        return;
      }

      setUserRegistration(d.userEvent);
    } catch (e) {
      console.log(e);
    }
  };

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

      const d = await res.json();

      if (!res.ok) {
        alert(d.message);
        return;
      }

      alert("Volunteer application submitted");

      fetchRegistration();
    } catch (e) {
      console.log(e);
      alert("Error applying as volunteer");
    }
  };

  const withdrawApplication = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/userevent/withdraw/${userRegistration._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const d = await res.json();

      if (!res.ok) {
        alert(d.message);
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

  useEffect(() => {
    fetch(`/api/data/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d.eventData);
        setEventCreator(
          d.eventCreator ?? {
            username: "None",
            email: "None",
          },
        );

        setImg(d.eventData.coverImagePath);

        setLoading(false);
      })
      .catch(console.log);

    fetchRegistration();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Oval
          width="120"
          height="120"
          color="var(--primaryColor)"
          secondaryColor="var(--secondaryColor)"
          visible
        />
      </div>
    );

  const availableSlots = data.totaltickets - data.tickets;

  const volunteerSlots =
    (data.volunteers?.requiredCount ?? 0) -
    (data.volunteers?.acceptedCount ?? 0);

  const isFree = !data.price || data.price === 0;

  return (
    <div className="bg-zinc-50 flex-1 min-h-screen">
      <div className="mx-auto flex flex-col gap-8 px-4 py-6 lg:flex-row">
        {/* LEFT */}
        <div className="flex-1 space-y-8">
          {/* HERO */}
          <div className="relative h-[320px] overflow-hidden rounded-3xl md:h-[500px]">
            {img ? (
              <>
                <ImgScroll imgs={[img]} />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </>
            ) : (
              <div className="h-full w-full bg-[var(--primaryColor)]" />
            )}

            <div className="absolute left-5 top-5 rounded-full bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md">
              {data.category || "Event"}
            </div>
          </div>

          {/* TITLE */}
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[var(--secondaryColor)] px-3 py-1 text-xs font-semibold text-[var(--primaryColor)]">
                {data.eventType || "Paid"}
              </span>

              <span className="rounded-full bg-[var(--secondaryColor)] px-3 py-1 text-xs font-semibold text-[var(--primaryColor)]">
                {data.language}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-zinc-900 md:text-5xl">
              {data.title}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-zinc-600">
              <MapPin className="h-4 w-4" />

              <span>
                {data.city}, {data.state}
              </span>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-3xl font-bold">{data.tickets ?? 0}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Attendees
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-3xl font-bold">{availableSlots}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Seats Left
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-3xl font-bold">{volunteerSlots}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Volunteer Slots
              </p>
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <h2 className="mb-5 text-2xl font-bold text-zinc-900">
              Event Details
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem icon={Calendar} label="Date" value={data.date} />

              <InfoItem icon={Clock} label="Time" value={data.time} />

              <InfoItem
                icon={Hourglass}
                label="Duration"
                value={data.duration}
              />

              <InfoItem
                icon={Languages}
                label="Language"
                value={data.language}
              />

              <InfoItem
                icon={MapPin}
                label="Location"
                value={`${data.city}, ${data.state}`}
              />

              <InfoItem icon={Grid3x2} label="Category" value={data.category} />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900">
              About this Event
            </h2>

            <p className="leading-8 text-zinc-700">{data.description}</p>
          </div>

          {/* TERMS */}
          {data.termsandconditions?.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900">
                Terms & Conditions
              </h2>

              <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                <ul className="space-y-3">
                  {data.termsandconditions.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-zinc-700"
                    >
                      <div className="mt-2 h-2 w-2 rounded-full bg-[var(--primaryColor)]" />

                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ORGANIZER */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-zinc-900">
              Organised By
            </h2>

            <Link to={`/u/${eventCreator.username}`}>
              <div className="flex items-center gap-4 rounded-3xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primaryColor)] text-2xl font-bold text-white">
                    {initials(eventCreator.username)}
                  </div>

                  <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primaryColor)] text-white">
                    <Shield className="h-3 w-3" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-900">
                    {eventCreator.username}
                  </h3>

                  <p className="text-sm text-zinc-500">{eventCreator.email}</p>

                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[var(--secondaryColor)] px-3 py-1 text-xs font-semibold text-[var(--primaryColor)]">
                    <Star className="h-3 w-3" />
                    Verified Organizer
                  </span>
                </div>

                <ChevronRight className="text-zinc-400" />
              </div>
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-[340px]">
          <div className="sticky top-24 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
            {/* HEADER */}
            <div className="p-6 text-white border-b-2 border-b-(--primaryColor)">
              <h2 className="text-2xl font-bold text-(--primaryColor)">
                {data.title}
              </h2>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-black/80">
                <div className="flex items-center gap-1">
                  <Ticket className="h-4 w-4" />
                  {availableSlots} seats left
                </div>

                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {data.tickets ?? 0} joined
                </div>
              </div>
            </div>

            {/* BODY */}
            <div className="px-5 py-2">
              <InfoRow icon={Calendar} value={data.date} />
              <InfoRow icon={Clock} value={data.time} />
              <InfoRow icon={Hourglass} value={data.duration} />
              <InfoRow icon={Languages} value={data.language} />
              <InfoRow icon={MapPin} value={`${data.city}, ${data.state}`} />
              <InfoRow icon={Grid3x2} value={data.category} />
            </div>

            {/* FOOTER */}
            <div className="border-t border-zinc-200 px-5 py-3">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Price
                </p>

                {isFree ? (
                  <p className="mt-1 text-3xl font-bold text-green-600">Free</p>
                ) : (
                  <div className="mt-1 flex items-center gap-1">
                    <IndianRupee className="h-5 w-5 text-zinc-500" />

                    <span className="text-3xl font-bold">{data.price}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {userRegistration?.role === "Volunteer" && (
                  <>
                    {userRegistration.status === "pending" && (
                      <>
                        <div className="rounded-2xl bg-yellow-100 px-4 py-3 text-sm font-semibold text-yellow-700">
                          Waiting for approval
                        </div>

                        <button
                          onClick={withdrawApplication}
                          className="w-full rounded-2xl bg-red-100 py-3 font-semibold text-red-600 transition hover:opacity-90"
                        >
                          Withdraw Application
                        </button>
                      </>
                    )}

                    {userRegistration.status === "approved" && (
                      <Link to={`/qr/${userRegistration._id}`}>
                        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-100 py-3 font-semibold text-green-700 transition hover:opacity-90">
                          <Zap className="h-4 w-4" />
                          View Volunteer Pass
                        </button>
                      </Link>
                    )}

                    {userRegistration.status === "rejected" && (
                      <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-600">
                        Volunteer application rejected
                      </div>
                    )}
                  </>
                )}

                {userRegistration?.role === "Participant" && (
                  <Link to={`/qr/${userRegistration._id}`}>
                    <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-100 py-3 font-semibold text-green-700 transition hover:opacity-90">
                      <Ticket className="h-4 w-4" />
                      View Ticket
                    </button>
                  </Link>
                )}

                {!userRegistration && (
                  <>
                    {data.volunteers?.enabled &&
                      data.volunteers?.acceptedCount <
                        data.volunteers?.requiredCount && (
                        <button
                          onClick={applyVolunteer}
                          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--secondaryColor)] py-3 font-semibold text-[var(--primaryColor)] transition hover:opacity-90"
                        >
                          <Users className="h-4 w-4" />
                          Apply as Volunteer
                        </button>
                      )}

                    {availableSlots > 0 ? (
                      <Link to={`/bookEvent/${id}`}>
                        <button className="w-full rounded-2xl bg-[var(--primaryColor)] py-3 font-semibold text-white transition hover:opacity-90">
                          Book Now
                        </button>
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full cursor-not-allowed rounded-2xl bg-zinc-200 py-3 font-semibold text-zinc-500"
                      >
                        Sold Out
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
