import React, { useEffect, useState } from "react";


import Myeventbody from "../components/home/Myeventbody";

import { useAuth } from "../contexts/AuthContext"

const MyEvents = () => {

  //need to use this to fetch the user events 

  const [user_id, setUserId] = useState('')

  useEffect(() => {
    const id = localStorage.getItem("id");
    setUserId(id);
    console.log(id); // correct value
  }, []);





  return (
    <div className="myevents w-[100%] h-[100%]">
      <div className="title bg-slate-200 h-[80px] m-2.5 ">
        <h1> MyEvents </h1>
      </div>
      <div className="mainbody bg-slate-200   m-2.5">
        <div className="filter-bar flex flex-row justify-between py-[20px] px-[50px] ">
          <div className="events-bytime   flex flex-row gap-x-[10px]">
            <div className="active inline bg-white py-[5px] px-[30px] ">
              active
            </div>
            <div className="draft inline bg-white py-[5px] px-[30px]">
              draft
            </div>
            <div className="past inline bg-white py-[5px] px-[30px] ">past</div>
          </div>

          <div className="events-filters  flex flex-row  gap-x-[10px] ">
            {/* <div className='search-bar    flex flex-row justify-between bg-white '>
                            <input className='search-input   py-[5px] pl-[10px] pr-[30px]  ' type='text' placeholder='Search event location'></input>
                            <div className='py-[10px] px-[20px] '><FaSearch /></div>
                        </div> */}
            {/* <div className="fliter text-white bg-blue-600  py-[10px] px-[20px]  "></div> */}
{/* 
            <select
              className="category  bg-white py-[5px] px-[20px]"
              name="catgories"
            >
              <option value={"allcategory"}>all category</option>
              <option value={"tech"}>tech</option>
              <option value={"business"}>business</option>
            </select> */}

            <select className="time-based bg-white  py-[5px] px-[20px] ">
              <option value={"allmonths"}>month</option>
              <option value={"jan"}>jan</option>
              <option value={"feb"}>feb</option>
            </select>
          </div>
        </div>
        <div className="events-list">
          <Myeventbody user_id={user_id} />
        </div>
        
      </div>
    </div>
  );
};

export default MyEvents;
