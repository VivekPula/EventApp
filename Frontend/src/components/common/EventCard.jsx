import { Link } from "react-router-dom";
import { MapPinned, Tag, Ticket, Tickets } from "lucide-react";

const EventCard = ({page, item, index, imge }) => {
    return (
      <div
        key={index}
        className="flex-1/4 rounded-3xl m-5 max-w-3/10 h-[55vh] gap-2 bg-(--secondaryColor)/70 darkMode:bg-(--primaryColor)/70 transition duration-300 delay-100 ease-in-out hover:scale-102 hover:shadow-xl"
      >
        <Link to={`/${page}/event/${item._id}`}>
          {" "}
          {/* Link to open the eventpage,the index info is sent to that page */}
          <div className="m-2 relative flex h-6/10 rounded-3xl overflow-clip items-center justify-center">
            <div className="flex absolute z-10 top-2 right-1">
              <p className="flex mr-2 font-semibold items-center rounded-xl pl-2 pr-2 bg-(--secondaryColor) darkMode:bg-(--exColor)/90 text-(--accentColor) darkMode:text-(--accentColor) ">
                {item.category}
              </p>
            </div>
            <img src={`/api/img/${imge.slice(8)}`} alt="image" className="rounded-xl object-cover w-full h-full"></img>
          </div>{" "}
          {/* div just for image */}
          <div className="m-2   pl-2">
            <div className="flex w-full justify-start ">
              <p className="font-semibold text-2xl font-serifs mr-auto text-(--accentColor) darkMode:text-(--exColor) line-clamp-2">
                {item.title}
              </p>
              <p className="mr-2 text-center mt-1">
                {item.date}
              </p>
            </div>{" "}
            {/* div for event Name and tags */}
            <p className="mt-2">{item.description}</p> {/* description */}
            <div className="flex w-full justify-start">
              <p className="flex items-center line-clamp-3 mt-2 mr-auto">
                <MapPinned className="mr-2" size={28} />
                {item.city+", "+item.state}{" "}
              </p>
              <p className="flex mr-2 mt-2 font-semibold items-center gap-2">
                <Ticket
                  className=" text-(--accentColor) darkMode:text-(--exColor)"
                  size={30}
                />{" "}
                {item.totaltickets+" left"}
              </p>
            </div>{" "}
            {/* div for location and ticket info */}
          </div>
        </Link>
      </div>
    ); //same as the above, just to add extra "filling fast!" tag
  
};
export default EventCard;
