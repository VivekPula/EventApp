import { useParams } from "react-router-dom";
import { theme } from "../components/theme";
import itemImage from "../assets/icon3.jpg"
import itemImage2 from "../assets/icon.avif"
import { Calendar, Clock, Grid3x2, Hourglass, IndianRupee, Languages, MapPin, User } from "lucide-react";

const EventPage = ()=>{
    const params=useParams();
    let id=params.id;
    let item=(id%2==0)?itemImage:itemImage2;
    let x=(id%2==0)?'voluntary':'Paid';
    return (
        <div className="w-full h-full flex flex-col gap-15 justify-center pt-4" >
            <div className="ml-auto mr-auto h-[65vh] w-38/40 flex justify-between" >
                <div className="w-2/3">
                <img className="rounded-3xl object-cover overflow-clip h-full w-20/21"src={item} alt="image"/>
                </div>
                <div className="w-1/3 p-2  relative  rounded-2xl bg-purple-50" style={{color:"black"}}>
                    <p className="text-5xl font-medium border-b pb-2 border-b-gray-200 text-center" style={{color:theme.primaryColor(0.8)}}>EventTitle {id}</p>
                    <div className="flex flex-col gap-5 mt-4 ml-4 text-xl">
                        <p className="flex gap-2 items-center"> <Calendar style={{color:theme.accentColor(1)}}/> : Date</p>
                        <p className="flex gap-2 items-center"> <Clock style={{color:theme.accentColor(1)}}/> : {id} pm</p>
                        <p className="flex gap-2 items-center"> <Hourglass style={{color:theme.accentColor(1)}}/> : Duration</p>
                        <p className="flex gap-2 items-center"> <Languages style={{color:theme.accentColor(1)}}/> : Languages</p>
                        <p className="flex gap-2 items-center"> <Grid3x2 style={{color:theme.accentColor(1)}}/> : Category</p>
                        <p className="flex gap-2 items-center"> <MapPin style={{color:theme.accentColor(1)}}/> : Location</p>
                    </div>
                    <div className="flex items-center pl-5 pr-5 justify-between mt-5">
                        <p className="flex gap-2 items-center text-2xl"> <IndianRupee style={{color:theme.accentColor(1)}}/> : Price</p>
                        <input type="button" className=" text-2xl bg-purple-500 text-purple-50 rounded-2xl p-2" value="Join now!"/>
                    </div>
                    
                </div>

            </div>
            <div className="ml-auto mr-auto w-15/16 ">
                <p className="text-4xl font-medium border-b pb-2 border-b-gray-200" style={{color:theme.primaryColor(0.8)}}>Details</p>
                <div className="flex flex-wrap">
                    <p className="text-xl mt-2 flex-1/2"><span className="font-semibold" style={{color:theme.primaryColor(0.7)}}>Conducted by :</span> by person {id} </p>
                    <p className="text-xl mt-2 flex-1/2"><span className="font-semibold" style={{color:theme.primaryColor(0.7)}}>Type :</span> {x}</p>
                    <p className="text-xl mt-2 flex-1/2"><span className="font-semibold" style={{color:theme.primaryColor(0.7)}}>Contributors :</span> {id} people</p>
                    <p className="text-xl mt-2 flex-1/2"><span className="font-semibold" style={{color:theme.primaryColor(0.7)}}>Volunteers :</span> {id} people</p>
                    <p className="text-xl mt-2 flex-1/2"><span className="font-semibold" style={{color:theme.primaryColor(0.7)}}>Availabe slots :</span> {id} </p>
                    <p className="text-xl mt-2 flex-1/2"><span className="font-semibold" style={{color:theme.primaryColor(0.7)}}>Location :</span> {id} at that location</p>
                    <p className="text-xl mt-2 flex-1/2"><span className="font-semibold" style={{color:theme.primaryColor(0.7)}}>About :</span> about doing that thing that they are doing </p>
                </div>
            </div>
                    
            <div className="ml-auto mr-auto w-15/16  ">
                <p className="text-4xl font-medium border-b pb-2 border-b-gray-300" style={{color:theme.primaryColor(0.8)}}>Description</p>
                <p className="text-xl" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore architecto nemo nulla magni hic pariatur illo, quidem veritatis. Nihil aut repellat est, nostrum magni unde aperiam ducimus reprehenderit a expedita? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam non atque voluptatum aliquam officia, itaque, error dolor aliquid ratione laudantium ducimus ullam porro consequatur? Laboriosam culpa optio doloremque amet. Inventore?</p>
            </div>
            <div className="ml-auto mr-auto w-15/16  ">
                <p className="text-4xl font-medium border-b pb-2 border-b-gray-300" style={{color:theme.primaryColor(0.8)}}>Terms and Conditions</p>
                <p className="text-xl" >
                    <ul className="list-disc pl-6">
                        <li>
                            Dont do that
                        </li>
                        <li>
                            Dont bring that
                        </li>
                        <li>
                            Dont throw that
                        </li>
                        <li>
                            Dont something that
                        </li>
                    </ul>
                </p>
            </div>
            <div className="ml-auto mr-auto w-15/16">
                <p className="text-4xl font-medium border-b pb-2 border-b-gray-300 mb-1" style={{color:theme.primaryColor(0.8)}}>Organised by</p>
                <div className="flex flex-col gap-4 w-full text-xl">
                    <div className="flex   gap-6">
                        <User className="h-[20vh] w-[20vh] bg-gray-300 rounded-2xl text-gray-600"/>
                        <div className="mt-2">
                            <p>Name</p>
                            <p>Info</p>
                            <p>Other info</p>
                        </div>
                        
                    </div>
                    <div className="flex   gap-6">
                        <User className="h-[20vh] w-[20vh] bg-gray-300 rounded-2xl text-gray-600"/>
                        <div className="mt-2">
                            <p>Name</p>
                            <p>Info</p>
                            <p>Other info</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
export default EventPage;