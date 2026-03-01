import { theme } from "./theme";
import itemImage from "../assets/icon3.jpg";
import itemImage2 from "../assets/icon.avif";
import { Link } from "react-router-dom";
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
    <div className="h-20/21 w-20/21 flex flex-wrap m-5  mr-auto">
      {data.map((x, index) => {
        let imge = itemImage;
        if (index % 2 == 0) imge = itemImage;
        else imge = itemImage2;
        return (
          <div
            key={index}
            className="flex-1/4   rounded-3xl m-5 max-w-3/10"
            style={{ backgroundColor: theme.secondaryColor(0.7) }}
          >
            <Link to={`/event/${index}`}>
              <div className="m-2  flex max-h-7/10 rounded-3xl overflow-clip items-center">
                <img src={imge} alt="image"></img>
              </div>
              <div className="m-2 pl-2">
                <p
                  className="font-semibold text-2xl font-serifs"
                  style={{ color: theme.accentColor(1) }}
                >
                  {x}
                </p>
                <p>Location : {x + index}</p>
                <p>Description :{"some stuff something "}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Mbody;
