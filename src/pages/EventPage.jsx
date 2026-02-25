import { useParams } from "react-router-dom";
import { theme } from "../components/theme";
import itemImage from "../assets/icon3.jpg"
import itemImage2 from "../assets/icon.avif"

const EventPage = ()=>{
    const params=useParams();
    let id=params.id;
    let item=(id%2==0)?itemImage:itemImage2;
    let x=(id%2==0)?'voluntary':'Paid';
    return (
        <div className="w-full h-full  justify-center pt-4">
            <div className="ml-auto mr-auto h-5/8 w-37/40 flex justify-between" >
                <div className="w-1/2">
                <img className="rounded-3xl object-cover overflow-clip h-full w-20/21"src={item} alt="image"/>
                </div>
                <div className="w-1/2 p-2 relative ">
                    <p className="text-5xl font-medium border-b pb-2 border-b-gray-300" style={{color:theme.primaryColor(0.8)}}>Event {id}</p>
                    <p className="text-2xl mt-2 "><span className="font-semibold" style={{color:theme.primaryColor(0.7)}}>Conducted by :</span> by person {id} </p>
                    <p className="text-2xl mt-2 "><span className="font-semibold" style={{color:theme.primaryColor(0.7)}}>Type :</span> {x}</p>
                    <p className="text-2xl mt-2 "><span className="font-semibold" style={{color:theme.primaryColor(0.7)}}>Contributors :</span> {id} people</p>
                    <p className="text-2xl mt-2 "><span className="font-semibold" style={{color:theme.primaryColor(0.7)}}>Volunteers :</span> {id} people</p>
                    <p className="text-2xl mt-2 "><span className="font-semibold" style={{color:theme.primaryColor(0.7)}}>Availabe slots :</span> {id} </p>
                    <p className="text-2xl mt-2 "><span className="font-semibold" style={{color:theme.primaryColor(0.7)}}>Location :</span> {id} at that location</p>
                    <p className="text-2xl mt-2 "><span className="font-semibold" style={{color:theme.primaryColor(0.7)}}>About :</span> about doing that thing that they are doing </p>
                    <input type="button" className=" absolute bottom-1 right-1 text-2xl bg-purple-600 text-purple-50 rounded-2xl p-2" value="Join now!"/>
                </div>

            </div>
            <div className="ml-auto mr-auto w-9/10 mt-4 mb-10">
                <p className="text-4xl font-medium border-b pb-2 border-b-gray-300" style={{color:theme.primaryColor(0.8)}}>Description</p>
                <p className="text-xl" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore architecto nemo nulla magni hic pariatur illo, quidem veritatis. Nihil aut repellat est, nostrum magni unde aperiam ducimus reprehenderit a expedita? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam non atque voluptatum aliquam officia, itaque, error dolor aliquid ratione laudantium ducimus ullam porro consequatur? Laboriosam culpa optio doloremque amet. Inventore?</p>
            </div>
            
        </div>
    );
}
export default EventPage;