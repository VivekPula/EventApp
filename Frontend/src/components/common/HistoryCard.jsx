import { Link } from "react-router-dom";
import { MapPinned } from "lucide-react";


const HistoryCard = ({ item, index, imge }) => {
  const linkPath = item.ticketId
    ? `/ticket/${item.ticketId}`
    : `/events/event/${item._id}`;

  return (
    <div
      key={index}
      className="flex flex-row rounded-3xl m-5 w-full h-[25vh] gap-2 bg-(--secondaryColor)/50 darkMode:bg-(--primaryColor)/70 "
    >
      <Link to={linkPath} className="flex w-full h-full items-center">
        <div className="m-2 relative flex h-9/10 w-1/3 rounded-3xl overflow-clip items-center justify-center border-2 border-purple-200">
          <div className="flex absolute z-10 top-2 right-1">
            <p className="flex mr-2 font-semibold items-center rounded-xl pl-2 pr-2 bg-(--secondaryColor) darkMode:bg-(--exColor)/90 text-(--accentColor) darkMode:text-(--accentColor) ">
              {item.category}
            </p>
          </div>

          <img
            className="rounded-xl object-cover h-full w-full"
            src={imge}
            alt="image"
          ></img>
        </div>

        <div className="m-2 h-full pl-2 px-10 mt-10">
          <div className="flex w-full justify-start ">
            <p className="font-semibold text-3xl font-serifs mr-auto text-(--accentColor) darkMode:text-(--exColor)">
              {item.title}
            </p>
          </div>

          <p className="mt-2 text-xl">{item.description}</p>

          <div className="flex w-full justify-start gap-10 mt-3">
            <p className="flex items-center line-clamp-3 mt-2 mr-auto">
              <MapPinned className="mr-2" size={28} />
              {item.city + ", " + item.state}
            </p>
          </div>

          <p className="mt-2 text-sm font-medium text-green-600">
            Click to view ticket
          </p>
        </div>
      </Link>
    </div>
  );


  
};

export default HistoryCard;
