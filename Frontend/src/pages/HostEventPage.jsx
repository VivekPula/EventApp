import React from "react";
import {
  IndianRupee,
  ScanQrCode,
  Ticket,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import BookingDetails from "../components/common/BookingDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";

function HostEventPage() {
  const params = useParams();
  const event_id = params.id;

  const scannerRef = useRef(null);
  const isScanningRef = useRef(false);

  const [title, settitle] = useState("title");
  const [totaltickets, settotaltickets] = useState(0);
  const [bookedtickets, setbookedtickets] = useState(0);
  const [ticketprice, setticketprice] = useState(0);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [userdetails, setuserdetails] = useState([]);

  const [scannerOpen, setScannerOpen] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  const showPopup = (type, title, message) => {
    setPopup({
      show: true,
      type,
      title,
      message,
    });
  };

  const closePopup = () => {
    setPopup({
      show: false,
      type: "",
      title: "",
      message: "",
    });
  };

  const getPopupIcon = () => {
    if (popup.type === "success") {
      return <CheckCircle size={70} className="text-green-600" />;
    }

    if (popup.type === "already") {
      return <AlertCircle size={70} className="text-yellow-500" />;
    }

    return <XCircle size={70} className="text-red-600" />;
  };

  const getPopupButtonStyle = () => {
    if (popup.type === "success") {
      return "bg-green-600 hover:bg-green-700";
    }

    if (popup.type === "already") {
      return "bg-yellow-500 hover:bg-yellow-600";
    }

    return "bg-red-600 hover:bg-red-700";
  };

  const getData = async () => {
    try {
      const res = await fetch(`/api/data/event/bookingdetails/${event_id}`);
      const data = await res.json();

      const { eventdetails, userdetails } = data;

      setbookedtickets(eventdetails.saledtickets);
      settitle(eventdetails.title);
      setticketprice(eventdetails.price);
      settotaltickets(eventdetails.totaltickets);
      setParticipantsCount(eventdetails.participantsCount || 0);
      setuserdetails(userdetails);

      // console.log("Data received:", userdetails);
    } catch (err) {
      console.log(err);
    }
  };

  const scanTicket = async (ticketId) => {
    try {
      const res = await fetch("/api/data/ticket/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Tid: ticketId,
          Eid: event_id,
        }),
      });

      const data = await res.json();

      if (data.status === "OK") {
        showPopup(
          "success",
          "Scan Successful",
          "Ticket marked as participated."
        );
      } else if (data.status === "ALREADY_SCANNED") {
        showPopup(
          "already",
          "Already Scanned",
          "This ticket was already scanned."
        );
      } else {
        showPopup(
          "invalid",
          "Invalid Ticket",
          data.message || "Invalid ticket."
        );
      }

      await getData();
    } catch (err) {
      console.log(err);
      showPopup("invalid", "Scan Failed", "Invalid scan or scanner error.");
    }
  };

  const openScanner = () => {
    isScanningRef.current = false;
    setScannerOpen(true);
  };

  const closeScanner = async () => {
    try {
      isScanningRef.current = false;

      if (scannerRef.current) {
        await scannerRef.current.clear();
        scannerRef.current = null;
      }

      setScannerOpen(false);
    } catch (err) {
      console.log(err);
      setScannerOpen(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!scannerOpen) return;

    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      false
    );

    scannerRef.current.render(
      async (decodedText) => {
        if (isScanningRef.current) return;

        isScanningRef.current = true;

        try {
          if (scannerRef.current) {
            await scannerRef.current.clear();
            scannerRef.current = null;
          }

          setScannerOpen(false);

          await scanTicket(decodedText);
        } catch (err) {
          console.log(err);
          showPopup("invalid", "Scan Failed", "Invalid scan or scanner error.");
        }
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((err) => console.log(err));
        scannerRef.current = null;
      }
    };
  }, [scannerOpen]);

  return (
    <div className="w-full p-6 bg-gray-50">
      {popup.show && (
        <div className="fixed inset-0 z-[99999] bg-black/50 flex items-center justify-center">
          <div className="bg-white w-[420px] rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center">
            {getPopupIcon()}

            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              {popup.title}
            </h2>

            <p className="text-gray-600 mt-2">{popup.message}</p>

            <button
              onClick={closePopup}
              className={`mt-6 px-8 py-2 text-white rounded-lg ${getPopupButtonStyle()}`}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className=" text-gray-500">Host Event Page</h1>

        <p className=" text-2xl text-gray-800 font-bold mt-1">
          Booking dashboard of {title} event
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-row gap-x-[30px] mb-[15px]">
        <BookingDetails
          Icon={Ticket}
          name={`Total Bookings/ ${totaltickets}`}
          count={bookedtickets}
        />

        <BookingDetails
          Icon={IndianRupee}
          name="Total Revenue"
          count={ticketprice * bookedtickets}
        />

        <BookingDetails
          Icon={Users}
          name="Participants"
          count={participantsCount}
        />
      </div>

      <div className="my-6 p-4 border border-gray-200 rounded-lg bg-gray-50 ">
        <p className="mb-3 text-gray-700 font-medium">
          See your live event page
        </p>

        <div className="flex gap-4">
          <Link to={`/events/event/${event_id}`}>
            <button className="px-4 py-2 bg-[var(--primaryColor)]/80 text-white rounded-md hover:bg-[var(--primaryColor)]/100">
              Myevent Page
            </button>
          </Link>

          <button
            onClick={openScanner}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex gap-2 items-center"
          >
            <ScanQrCode size={20} />
            Scan QR Ticket
          </button>
        </div>

        {scannerOpen && (
          <div className="mt-5 bg-white p-4 rounded-xl border border-gray-200 w-[350px]">
            <div id="qr-reader"></div>

            <button
              onClick={closeScanner}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close Scanner
            </button>
          </div>
        )}
      </div>

      {/* Booking Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Booking Details
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[var(--primaryColor)]/10 text-gray-700">
                <th className="px-4 py-3 text-left font-semibold">
                  Ticket ID
                </th>

                <th className="px-4 py-3 text-left font-semibold">Name</th>

                <th className="px-4 py-3 text-left font-semibold">Email</th>

                <th className="px-4 py-3 text-left font-semibold">Mobile</th>

                <th className="px-4 py-3 text-left font-semibold">
                  Booking Time
                </th>

                <th className="px-4 py-3 text-left font-semibold">Status</th>

                <th className="px-4 py-3 text-left font-semibold">
                  Scanned Time
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {userdetails.map((item, index) => {
                return (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800 ">
                      {item.Tid}
                    </td>

                    <td className="px-4 py-3 font-medium text-gray-800 ">
                      {item.name}
                    </td>

                    <td className="px-4 py-3 font-medium text-gray-800 ">
                      {item.email}
                    </td>

                    <td className="px-4 py-3 text-gray-600">9999999999</td>

                    <td className="px-4 py-3 text-gray-600">
                      {item.bookingTime
                        ? item.bookingTime.slice(0, 10) +
                          ", " +
                          item.bookingTime.slice(11, 19)
                        : "NA"}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "participated"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {item.scannedAt
                        ? item.scannedAt.slice(0, 10) +
                          ", " +
                          item.scannedAt.slice(11, 19)
                        : "Not scanned"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HostEventPage;