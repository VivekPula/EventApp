import itemImage from "../../assets/icon3.jpg";
import itemImage2 from "../../assets/icon.avif";
import { Link } from "react-router-dom";
import HistoryCard from "../common/HistoryCard";
import { useEffect } from "react";
import { useState } from "react";
import DropDownList from "../common/DropDownList";
import { Oval } from "react-loader-spinner";
const fetchData = async (query,setData,setShowData,setLoading) =>{
    console.log(query);
   await fetch("/userevent/getevents",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    }).then((response) => response.json())
      .then((data) => {
        setData(data);
        setShowData(data);
      })
      .catch((error) => console.error("Error :", error));
      setLoading(false);
}
const Hbody = ({refresh}) => {
    const Loptions=[{value:1,label:'Telugu'},{value:2,label:'Hindi'},{value:3,label:'English'},{value:4,label:'Tamil'}];
    const Goptions=[{value:1,label:'Nature'},{value:2,label:'Games'},{value:3,label:'philanthropy'},{value:4,label:'Dance'},{value:5,label:'Music'},{value:6,label:'Art'},{value:7,label:'Cultural'},{value:8,label:'Other'}];
    const Poptions=[{value:1,label:'Rs 1000'},{value:2,label:'Rs 100'},{value:3,label:'Rs 10000'},{value:4,label:'Rs 100000'}];
    const Ooptions=[{value:1,label:'Paid'},{value:2,label:'Voluntary'},{value:3,label:'Paying'},{value:4,label:'others'}];
    const userId = localStorage.id;
    const [lang,setLang]=useState([]);
    const [catg,setCatg]=useState([]);
    const [price,setPrice]=useState([]);
    const [type,setType]=useState([]);
    const [data, setData] = useState([]);
    const [showData,setShowData] = useState([]);
    const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const searchData = data.filter((item) => item.title.toLowerCase().includes(refresh.toLowerCase()));
    setShowData(searchData);
  },[refresh]);
  useEffect(  () => {
    const query ={
      //queryString: refresh,
      userId : userId,
      language : lang,
      category : catg,
      prices : price,
      type : type
    };
    fetchData(query,setData,setShowData,setLoading);
  }, [lang,catg,price,type]);
  return (
    <>

    <div className="w-full mt-4 flex p-1"> 
            <div className="flex items-center text-xl min-w-1/10 justify-center font-semibold text-(--accentColor) darkMode:text-(--secondaryColor)" >Filters</div>
            <div className="flex p-1 justify-around w-full" >
                <DropDownList options={Loptions} placeHolder={"Language"} ret={setLang}/>
                <DropDownList options={Goptions} placeHolder={"Genre"} ret={setCatg}/>
                <DropDownList options={Poptions} placeHolder={"Prices"} ret={setPrice}/>
                <DropDownList options={Ooptions} placeHolder={"others"} ret={setType}/>
            </div>
            
        </div>
    {!loading?<div className="h-20/21 w-20/21 m-5">
      {showData.length>0?showData.map((item, index) => {
        return <HistoryCard item={item} key={index} imge={item.coverImagePath} index={index} />;
      }):<div className="h-full w-full flex justify-center"> <p className="mt-10 text-2xl text-gray-300">No Participated Events</p> </div>}
    </div>:
    <div className="w-full h-full flex items-center justify-center">
      <Oval width="150" height = "150" color="violet" secondaryColor="pink"  visible= {true}/>
    </div>}
    </>
  );
};
export default Hbody;
