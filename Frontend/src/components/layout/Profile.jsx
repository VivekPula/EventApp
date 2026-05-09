import {
  CircleUserIcon,
  Contact2,
  Contact2Icon,
  ContactRound,
  ContactRoundIcon,
  CrossIcon,
  LogOutIcon,
  LucideContactRound,
  LucideCross,
  User2Icon,
  XIcon,
} from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const username = localStorage.name;
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative">
      <CircleUserIcon
        size={35}
        className="text-(--fg) hover:cursor-pointer hover:opacity-75 active:opacity-85"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute right-0 top-10 p-8 w-48 rounded-xl bg-white darkMode:bg-black shadow-2xl flex flex-col justify-center items-center">
          <XIcon
            className="absolute top-3 right-3 hover:opacity-80 active:opacity-90 hover:cursor-pointer"
            onClick={() => setOpen(!open)}
          />
          <CircleUserIcon size={55} className="text-gray-600" />
          <p className="mt-2 text-lg">{username}</p>
          <ul className="w-full">
            <li
              className="flex justify-start items-center border-t border-t-gray-300 pt-3 mt-5 hover:cursor-pointer hover:opacity-80 active:opacity-90"
              onClick={() => navigate(`/u/${username}`)}
            >
              <User2Icon size={20} className="mr-2" />
              Profile
            </li>
            <li
              className="flex justify-start items-center border-t border-t-gray-300 pt-3 mt-2 text-red-500 hover:cursor-pointer hover:opacity-80 active:opacity-90"
              onClick={handleLogout}
            >
              <LogOutIcon size={20} className="mr-2" />
              Log Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
