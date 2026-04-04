import itemImage from "../../assets/icon3.jpg";
import itemImage2 from "../../assets/icon.avif";
import { Link } from "react-router-dom";
import HistoryCard from "../common/HistoryCard";
import { useEffect } from "react";
import { useState } from "react";
import DropDownList from "../common/DropDownList";
const fetchData = async (query,setData) =>{
    console.log(query);
   await fetch("/api/data",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    }).then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error :", error));
}
const Hbody = () => {
    const Loptions=[{value:1,label:'Telugu'},{value:2,label:'Hindi'},{value:3,label:'English'},{value:4,label:'Tamil'}];
    const Goptions=[{value:1,label:'Nature'},{value:2,label:'Games'},{value:3,label:'philanthropy'},{value:4,label:'Dance'},{value:5,label:'Music'},{value:6,label:'Art'},{value:7,label:'Cultural'},{value:8,label:'Other'}];
    const Poptions=[{value:1,label:'Rs 1000'},{value:2,label:'Rs 100'},{value:3,label:'Rs 10000'},{value:4,label:'Rs 100000'}];
    const Ooptions=[{value:1,label:'Paid'},{value:2,label:'Voluntary'},{value:3,label:'Paying'},{value:4,label:'others'}];
    const [lang,setLang]=useState([]);
    const [catg,setCatg]=useState([]);
    const [price,setPrice]=useState([]);
    const [type,setType]=useState([]);
    const [data, setData] = useState([]);
  useEffect(  () => {
    const query ={
      language : lang,
      category : catg,
      prices : price,
      type : type
    };
    fetchData(query,setData);
  }, [lang,catg,price,type]);
  return (
    <>
    <div className="w-full mt-2 flex p-1"> 
            <div className="flex items-center text-xl min-w-1/10 justify-center font-semibold text-(--accentColor) darkMode:text-(--secondaryColor)" >Filters</div>
            <div className="flex p-1 justify-around w-full" >
                <DropDownList options={Loptions} placeHolder={"Language"} ret={setLang}/>
                <DropDownList options={Goptions} placeHolder={"Genre"} ret={setCatg}/>
                <DropDownList options={Poptions} placeHolder={"Prices"} ret={setPrice}/>
                <DropDownList options={Ooptions} placeHolder={"others"} ret={setType}/>
            </div>
            
        </div>
    <div className="h-20/21 w-20/21 m-5">
      {data.map((item, index) => {
        return <HistoryCard item={item} key={index} imge={item.coverImagePath} index={index} />;
      })}
    </div>
    </>
  );
};
export default Hbody;
