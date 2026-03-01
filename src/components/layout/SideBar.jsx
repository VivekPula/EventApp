import * as Icons from "lucide-react";
import React from "react";
import { usePage } from "../../context/PageContext";
import { Link } from "react-router-dom";
import { theme } from "../theme";

function SideBar() {
  const { currentPage } = usePage();
  const options = [
    { name: "Home", icon: "HomeIcon", path: "/" },
    { name: "Host Event", icon: "CirclePlus", path: "/hostnew" },
    { name: "History", icon: "HistoryIcon", path: "/history" },
  ];
  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-50 p-5`}
      style={{ backgroundColor: theme.primaryColor(0.2) }}
    >
      <ul className="list-none">
        {options.map((option) => {
          const IconComponent = Icons[option.icon];
          const isActive = currentPage === option.name;
          return (
            <li key={option.name} className="my-5">
              <Link
                className={`p-2 px-4 flex items-center rounded-xl hover:opacity-75`}
                style={{
                  backgroundColor: isActive
                    ? theme.primaryColor(1)
                    : theme.primaryColor(0),
                  color: isActive ? "white" : "black",
                }}
                to={option.path}
              >
                {IconComponent ? <IconComponent className="mr-2" /> : null}
                {option.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
