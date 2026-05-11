import { CircleUserRound, MapPin, Moon, Search, Sun } from "lucide-react";
import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Profile from "./Profile";

const NavBar = ({ className = "" }) => {
  const redirectPath = useLocation().pathname; // To redirect back to this location after signup/login
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const { toggleTheme } = useContext(ThemeContext);
  const [themeName, changeThemeName] = useState("light");
  const [iconName, changeIconName] = useState(<Sun />);
  const navigate = useNavigate();
  const changeTheme = () => {
    toggleTheme();
    changeThemeName(themeName === "light" ? "dark" : "light");
    changeIconName(themeName === "light" ? <Moon /> : <Sun />);
  };
  return (
    <div
      id="bar"
      className={`fixed top-0 left-0 w-full z-999 ${className} bg-(--bg)`}
    >
      <div
        id="MainBar"
        className="flex  items-center w-19/20 h-20 ml-auto mr-auto  border-b-gray-300 border-b"
      >
        <div className="flex items-center">
          <img
            src="/eventlogo.png"
            alt="EventFind logo"
            className="h-12 w-auto object-contain"
          />
        </div>
        <div
          id="searchBox"
          className="flex pl-4 items-center w-6/10  rounded-xl h-10 ml-8 justify-between bg-(--secondaryColor)/50"
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full border-0 bg-transparent focus:ring-0 text-(--fg) placeholder-(--fg)"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (redirectPath !== "/history")
                  navigate("/", { state: { refresh: query } });
                else navigate("/history", { state: { refresh: query } });
              }
            }}
          />
          <Search
            className="mr-8 cursor-pointer"
            size={25}
            onClick={() => {
              if (redirectPath !== "/history")
                navigate("/", { state: { refresh: query } });
              else navigate("/history", { state: { refresh: query } });
            }}
          />
        </div>
        <div className="flex justify-around items-center gap-3 ml-auto">
          <div className="ml-auto  flex items-center justify-between text-xl ">
            <MapPin size={30} className="text-(--accentColor)" />
            <p className="ml-1 ">Location</p>
          </div>
          <div className="m-5">
            <button
              className="rounded-xl flex hover:bg-gray-300 hover:text-black p-2 gap-1"
              onClick={() => changeTheme()}
            >
              {iconName}
              {themeName}
            </button>
          </div>
          <div className="ml-auto ">
            {user ? (
              <Profile />
            ) : (
              <Link to={"login"} state={{ redirectPath }}>
                <span className="bg-(--primaryColor) p-2 px-3 text-white rounded-md hover:opacity-75 active:opacity-85">
                  Log In
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
