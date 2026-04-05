import React from "react";
import Hbody from "../components/home/Hbody";
import { useLocation } from "react-router-dom";

function HistoryPage() {
  const location = useLocation();
  const refresh = location.state?.refresh;
  return <div className="w-full"><Hbody refresh={refresh}/></div>;
}

export default HistoryPage;
