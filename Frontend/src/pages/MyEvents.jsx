// import React, { useEffect, useState } from "react";

// import Myeventbody from "../components/home/Myeventbody";

// import { useAuth } from "../contexts/AuthContext";

// const MyEvents = () => {
//   //need to use this to fetch the user events

//   const [user_id, setUserId] = useState("");

//   useEffect(() => {
//     const id = localStorage.getItem("id");
//     setUserId(id);
//     console.log("ID: " + id); // correct value
//   }, []);

//   return (
//     <div className="myevents w-[100%] h-[100%]">
//       <div className="title bg-slate-200 h-[80px] m-2.5 ">
//         <h1> MyEvents </h1>
//       </div>
//       <div className="mainbody bg-slate-200   m-2.5">
//         <div className="filter-bar flex flex-row justify-between py-[20px] px-[50px] ">
//           <div className="events-bytime   flex flex-row gap-x-[10px]">
//             <div className="active inline bg-white py-[5px] px-[30px] ">
//               active
//             </div>
//             <div className="draft inline bg-white py-[5px] px-[30px]">
//               draft
//             </div>
//             <div className="past inline bg-white py-[5px] px-[30px] ">past</div>
//           </div>

//           <div className="events-filters  flex flex-row  gap-x-[10px] ">
//             <select className="time-based bg-white  py-[5px] px-[20px] ">
//               <option value={"allmonths"}>month</option>
//               <option value={"jan"}>jan</option>
//               <option value={"feb"}>feb</option>
//             </select>
//           </div>
//         </div>
//         <div className="events-list">
//           <Myeventbody user_id={user_id} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyEvents;

import React, { useEffect, useState } from "react";
import Myeventbody from "../components/home/Myeventbody";

const MyEvents = () => {
  const [user_id, setUserId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("id");
    setUserId(id);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm px-6 py-5 mb-5">
        <h1 className="text-2xl font-semibold text-gray-800">My Events</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your created events
        </p>
      </div>

      {/* Main Body */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium">
              Active
            </button>

            <button className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
              Draft
            </button>

            <button className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
              Past
            </button>
          </div>

          <select className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 outline-none">
            <option value="allmonths">Month</option>
            <option value="jan">Jan</option>
            <option value="feb">Feb</option>
          </select>
        </div>

        {/* Events List */}
        <div className="events-list">
          <Myeventbody user_id={user_id} />
        </div>
      </div>
    </div>
  );
};

export default MyEvents;