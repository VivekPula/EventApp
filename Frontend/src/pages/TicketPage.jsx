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
} from "lucide-react";
import { Oval } from "react-loader-spinner";

const TicketPage = () => {
  const { ticketId } = useParams();

  const [ticketData, setTicketData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTicket = async () => {
      try {
        const res = await fetch(`/api/data/ticket/${ticketId}`);
        const data = await res.json();

        setTicketData(data.ticket);
        setEventData(data.eventData);
        setUserData(data.userData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getTicket();
  }, [ticketId]);

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
  }

  if (!ticketData || !eventData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-2xl font-semibold text-red-500">
          Ticket not found
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center p-6 bg-gray-50">
      <div className="w-2/3 bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
        <div className="border-b pb-4 mb-6">
          <p className="text-4xl font-bold text-(--primaryColor)">
            {eventData.title}
          </p>

          <p className="text-gray-500 mt-2">Your Event Ticket</p>
        </div>

        <div className="flex gap-10">
          <div className="w-2/3 grid grid-cols-2 gap-5 text-lg">
            <p className="flex gap-2 items-center">
              <User className="text-(--accentColor)" /> :{" "}
              {userData?.name || ticketData.name}
            </p>

            <p className="flex gap-2 items-center">
              <TicketCheck className="text-(--accentColor)" /> :{" "}
              {ticketData.Tid}
            </p>

            <p className="flex gap-2 items-center">
              <Calendar className="text-(--accentColor)" /> : {eventData.date}
            </p>

            <p className="flex gap-2 items-center">
              <Clock className="text-(--accentColor)" /> : {eventData.time} pm
            </p>

            <p className="flex gap-2 items-center">
              <Hourglass className="text-(--accentColor)" /> :{" "}
              {eventData.duration}
            </p>

            <p className="flex gap-2 items-center">
              <Languages className="text-(--accentColor)" /> :{" "}
              {eventData.language}
            </p>

            <p className="flex gap-2 items-center">
              <Grid3x2 className="text-(--accentColor)" /> :{" "}
              {eventData.category}
            </p>

            <p className="flex gap-2 items-center">
              <IndianRupee className="text-(--accentColor)" /> :{" "}
              {eventData.price}
            </p>

            <p className="flex gap-2 items-center col-span-2">
              <MapPin className="text-(--accentColor)" /> :{" "}
              {eventData.city + ", " + eventData.state}
            </p>

            <p className="col-span-2">
              Status :{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  ticketData.status === "participated"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {ticketData.status}
              </span>
            </p>

            <p className="col-span-2 text-sm text-gray-500">
              Booked At :{" "}
              {ticketData.createdAt
                ? ticketData.createdAt.slice(0, 10) +
                  ", " +
                  ticketData.createdAt.slice(11, 19)
                : "NA"}
            </p>

            {ticketData.scannedAt && (
              <p className="col-span-2 text-sm text-gray-500">
                Scanned At :{" "}
                {ticketData.scannedAt.slice(0, 10) +
                  ", " +
                  ticketData.scannedAt.slice(11, 19)}
              </p>
            )}
          </div>

          <div className="w-1/3 flex flex-col items-center justify-center border rounded-2xl p-5">
            <QRCodeCanvas value={ticketData.Tid} size={220} />

            <p className="mt-4 text-sm text-gray-500 text-center">
              Show this QR at event entry
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;