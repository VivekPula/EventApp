import { theme } from "./theme";
import itemImage from "../assets/icon3.jpg";
import itemImage2 from "../assets/icon.avif";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
const Mbody = () => {
  const data = [
    "Event 1",
    "Event 2",
    "Event 3",
    "Event 4",
    "Event 5",
    "Event 6",
    "Event 7",
    "Event 8",
    "Event 9",
    "Event 10",
    "Event 11",
    "Event 12",
    "Event 13",
  ];
  return (
    <div className="h-20/21 w-20/21 flex flex-wrap m-5">
      {data.map((item, index) => {
        let imge = itemImage;
        if (index % 2 == 0) imge = itemImage;
        else imge = itemImage2;
        return (
          <EventCard item={item} index={index} imge={imge} />
        );
      })}
    </div>
  );
};
export default Mbody;
