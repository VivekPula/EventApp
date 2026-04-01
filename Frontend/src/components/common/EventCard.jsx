import { Link } from "react-router-dom";
import { MapPinned, Tag, Ticket } from "lucide-react";

const EventCard = ({ item, index, imge }) => {
  if (index % 2 == 0)
    return (
      <div
        key={index}
        className="flex-1/4   rounded-3xl m-5 max-w-3/10 gap-2 bg-(--secondaryColor)/70 darkMode:bg-(--primaryColor)/70 "
      >
        <Link to={`/event/${item._id}`}>
          {" "}
          {/* Link to open the eventpage,the index info is sent to that page */}
          <div className="m-2 relative flex h-6/10 rounded-3xl overflow-clip items-center justify-center">
            <div className="flex absolute z-10 top-2 right-1">
              <p className="flex mr-2 font-semibold items-center rounded-xl pl-2 pr-2 bg-(--secondaryColor) darkMode:bg-(--exColor)/90 text-(--accentColor) darkMode:text-(--accentColor) ">
                {item.Category}
              </p>
            </div>
            <img src={imge} alt="image"></img>
          </div>{" "}
          {/* div just for image */}
          <div className="m-2   pl-2">
            <div className="flex w-full justify-start ">
              <p className="font-semibold text-2xl font-serifs mr-auto text-(--accentColor) darkMode:text-(--exColor)">
                {item.title}
              </p>
            </div>{" "}
            {/* div for event Name and tags */}
            <p className="mt-2">{item.About}</p> {/* description */}
            <div className="flex w-full justify-start ">
              <p className="flex items-center line-clamp-3 mt-2 mr-auto">
                <MapPinned className="mr-2" size={28} />
                {item.Location}{" "}
              </p>
              <p className="flex mr-2 font-semibold items-center gap-2">
                <Ticket
                  className="text-(--accentColor) darkMode:text-(--exColor)"
                  size={30}
                />{" "}
                1/{item.Slots} left
              </p>
            </div>{" "}
            {/* div for location and ticket info */}
          </div>
        </Link>
      </div>
    ); //same as the above, just to add extra "filling fast!" tag
  else
    return (
      <div
        key={index}
        className="flex-1/4   rounded-3xl m-5 max-w-3/10 gap-2 bg-(--secondaryColor)/70 darkMode:bg-(--primaryColor)/70 "
      >
        <Link to={`/event/${item._id}`}>
          <div className="m-2 relative flex h-6/10 rounded-3xl overflow-clip items-center justify-center">
            <div className="flex absolute z-10 top-2 right-1">
              <p className="flex mr-2 font-semibold items-center rounded-xl pl-2 pr-2 bg-(--secondaryColor)/90 darkMode:bg-(--secondaryColor) text-(--accentColor) darkMode:text-(--accentColor)">
                {" filling fast! "}
              </p>
              <p className="flex mr-2 font-semibold items-center rounded-xl pl-2 pr-2 bg-(--secondaryColor)/90 darkMode:bg-(--exColor)/90 text-(--accentColor) darkMode:text-(--accentColor) ">
                {item.Category}
              </p>
            </div>
            <img src={imge} alt="image"></img>
          </div>
          <div className="m-2 mb-0  pl-2">
            <div className="flex w-full justify-start ">
              <p className="font-semibold text-2xl font-serifs mr-auto text-(--accentColor) darkMode:text-(--exColor)">
                {item.title}
              </p>
            </div>
            <p className="mt-2">{item.About}</p>

            <div className="flex w-full justify-start ">
              <p className="flex items-center line-clamp-3 mt-2 mr-auto">
                <MapPinned className="mr-2" size={28} />
                {item.Location}{" "}
              </p>
              <p className="flex mr-2 font-semibold items-center gap-2">
                <Ticket
                  className="text-(--accentColor) darkMode:text-(--exColor)"
                  size={30}
                />{" "}
                1/{item.Slots} left
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
};
export default EventCard;
