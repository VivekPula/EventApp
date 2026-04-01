import { theme } from "./theme";
import itemImage from "../assets/icon3.jpg";
import itemImage2 from "../assets/icon.avif";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { useEffect } from "react";
import { useState } from "react";
import DropDownList from "./DropDownList";
const Mbody = () => {
    const Loptions=[{value:1,label:'Telugu'},{value:2,label:'Hindi'},{value:3,label:'English'},{value:4,label:'Tamil'}];
    const Goptions=[{value:1,label:'Comedy'},{value:2,label:'Technological'},{value:3,label:'History'},{value:4,label:'Charity'}];
    const Poptions=[{value:1,label:'Rs 1000'},{value:2,label:'Rs 100'},{value:3,label:'Rs 10000'},{value:4,label:'Rs 100000'}];
    const Ooptions=[{value:1,label:'Paid'},{value:2,label:'Voluntary'},{value:3,label:'Paying'},{value:4,label:'others'}];
  // const data = [
  //   "Event 1",
  //   "Event 2",
  //   "Event 3",
  //   "Event 4",
  //   "Event 5",
  //   "Event 6",
  //   "Event 7",
  //   "Event 8",
  //   "Event 9",
  //   "Event 10",
  //   "Event 11",
  //   "Event 12",
  //   "Event 13",
  // ];
  const [data,setData]=useState([]);
  useEffect(()=>{
    fetch("/api/data")
    .then(response => response.json())
    .then(data =>{ console.log(data); setData(data);})
    .catch(error => console.error("Error :",error));
  },[]);
  return (
    <>
    <div className="w-full mt-2 flex p-1"> 
            <div className="flex items-center text-xl min-w-1/10 justify-center font-semibold text-(--accentColor) darkMode:text-(--secondaryColor)" >Filters</div>
            <div className="flex p-1 justify-around w-full" >
                <DropDownList options={Loptions} placeHolder={"Language"}/>
                <DropDownList options={Goptions} placeHolder={"Genre"}/>
                <DropDownList options={Poptions} placeHolder={"Prices"}/>
                <DropDownList options={Ooptions} placeHolder={"others"}/>
            </div>
            
        </div>
    <div className="h-20/21 w-20/21 flex flex-wrap m-5">
      {data.map((item, index) => {
        let imge = itemImage;
        if (index % 2 == 0) imge = itemImage;
        else imge = itemImage2;
        return (
          <EventCard item={item} key={index} imge={imge} index={index} />
        );
      })}
    </div>
    </>
  );
};
export default Mbody;
