import { CircleUserRound, MapPin, Search } from "lucide-react";
import { theme } from "../theme";
const NavBar = ({ className = "" }) => {
  return (
    <div
      id="bar"
      className={`bg-white fixed top-0 left-0 w-full z-10 ${className}`}
    >
      <div
        id="MainBar"
        className="flex  items-center w-19/20 h-20 ml-auto mr-auto  border-b-gray-300 border-b"
      >
        <div
          style={{ color: theme.primaryColor(1), fontFamily: "pristina" }}
          className="h-15 text-center pt-2 text-5xl font-serif overflow-clip"
        >
          <p> Event App</p>
        </div>
        <div
          id="searchBox"
          className="flex pl-4 items-center w-6/10  rounded-xl h-10 ml-8 justify-between"
          style={{ backgroundColor: theme.secondaryColor(0.5) }}
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full focus:outline-none"
          />
          <Search className="mr-8" size={25} />
        </div>
        <div className="ml-auto  flex items-center justify-between text-xl ">
          <MapPin size={30} style={{ color: theme.accentColor(1) }} />
          <p className="ml-1 ">Location</p>
        </div>
        <div className="ml-auto ">
          <CircleUserRound
            size={50}
            style={{ color: theme.accentColor(0.9) }}
            className="mr-4"
          />
        </div>
      </div>
    </div>
  );
};
export default NavBar;
