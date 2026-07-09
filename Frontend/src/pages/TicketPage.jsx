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
    <div className="w-full flex justify-center p-10 bg-gray-50">
      <div className=" bg-white rounded-3xl shadow-lg border border-gray-100 p-12">
        <div className="border-b border-gray-100 pb-6 mb-8 flex justify-between">
            <div >
            <p className="text-4xl font-bold text-(--primaryColor)">
                {eventData.title}
            </p>

            <p className="text-gray-500 mt-2">Your Event Ticket</p>
            </div>
            <div className=" text-2xl mr-5 flex flex-col justify-center items-end gap-2 ">
            <p className="font-semibold flex items-center gap-2">
              Status :{" "}
                <span
                    className={`px-4 py-1.5 rounded-full text-xl font-medium ${
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
            </div>
        </div>

        <div className="flex gap-10">
          <div className=" text-lg flex flex-col gap-4 ">
                
            <p className="flex gap-3 items-center flex-wrap p-4 rounded-2xl border border-gray-200 bg-gray-50">
              <TicketCheck className="text-(--accentColor) bg-white rounded-full p-1.5 shadow-sm" size={32} />  <span className="text-(--accentColor) font-semibold">Ticket-Id : </span>
              {ticketData.Tid}
            </p>
            <div className="flex z-10 rounded-2xl p-5 gap-6 border border-gray-200 bg-gray-50">
            <div className="w-1/2 flex flex-col h-full gap-5">
            <p className="flex gap-3 items-center ">
              <User className="text-(--accentColor) bg-white rounded-full p-1.5 shadow-sm" size={32} /> <span className="text-(--accentColor) font-semibold">Name :</span>{" "}
              {userData?.name || ticketData.name}
            </p>
            <p className="flex gap-3 items-center">
              <Hourglass className="text-(--accentColor) bg-white rounded-full p-1.5 shadow-sm" size={32} /> <span className="text-(--accentColor) font-semibold">Duration :</span>{" "}
              {eventData.duration}
            </p>
            

            <p className="flex gap-3 items-center">
              <Calendar className="text-(--accentColor) bg-white rounded-full p-1.5 shadow-sm" size={32} /> <span className="text-(--accentColor) font-semibold">Date :</span> {eventData.date}
            </p>

            <p className="flex gap-3 items-center">
              <Clock className="text-(--accentColor) bg-white rounded-full p-1.5 shadow-sm" size={32} /> <span className="text-(--accentColor) font-semibold">Time :</span> {eventData.time} pm
            </p>
            </div>
            <div className="w-1/2 flex flex-col h-full gap-5">
            
            

            <p className="flex gap-3 items-center">
              <Languages className="text-(--accentColor) bg-white rounded-full p-1.5 shadow-sm" size={32} /> <span className="text-(--accentColor) font-semibold">Language :</span>{" "}
              {eventData.language}
            </p>

            <p className="flex gap-3 items-center">
              <Grid3x2 className="text-(--accentColor) bg-white rounded-full p-1.5 shadow-sm" size={32} /> <span className="text-(--accentColor) font-semibold">Category :</span>{" "}
              {eventData.category}
            </p>

            <p className="flex gap-3 items-center">
              <IndianRupee className="text-(--accentColor) bg-white rounded-full p-1.5 shadow-sm" size={32} /> <span className="text-(--accentColor) font-semibold">Price :</span>{" "}
              {eventData.price}
            </p>
            </div>
            </div>
            <div className="rounded-2xl p-4 border border-gray-200 bg-gray-50 flex flex-col gap-2">
            <p className="flex gap-3 items-center col-span-2">
              <MapPin className="text-(--accentColor) bg-white rounded-full p-1.5 shadow-sm" size={32} /> <span className="text-(--accentColor) font-semibold">Location :</span>{" "}
              {eventData.city + ", " + eventData.state}
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
          </div>

          <div className="w-1/3 flex flex-col items-center justify-center border border-gray-200 bg-gray-50 rounded-2xl p-6 gap-3">
           
            
            <QRCodeCanvas value={ticketData.Tid} size={220} />

            <p className="mt-3 text-sm text-gray-500 text-center">
              Show this QR at  entry
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;