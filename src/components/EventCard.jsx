import { Link } from "react-router-dom";
import { theme } from "./theme";
import { MapPinned, Tag, Ticket } from "lucide-react";

const EventCard =({item,index,imge})=>{
    if(index%2==0)
    return(
        <div
            key={index}
            className="flex-1/4   rounded-3xl m-5 max-w-3/10 gap-2"
            style={{ backgroundColor: theme.secondaryColor(0.7) }}
          >
            <Link to={`/event/${index}`}>                                                                           {/* Link to open the eventpage,the index info is sent to that page */}
              <div className="m-2  flex max-h-6/10 rounded-3xl overflow-clip items-center">
                <img src={imge} alt="image"></img>
              </div>                                                                                                {/* div just for image */}
              <div className="m-2 mb-0  pl-2">
                <div className="flex w-full justify-start ">
                    <p
                    className="font-semibold text-2xl font-serifs mr-auto"
                    style={{ color: theme.accentColor(1) }}
                    >{item}</p>
                    <p className="flex mr-2 font-semibold items-center rounded-xl pl-2 pr-2"  style={{backgroundColor:theme.primaryColor(0.2),color:theme.accentColor(1)}} >{" category "}</p>
                    
                </div>                                                                                              {/* div for event Name and tags */}
                <p>{"some stuff something at some place some activity"}</p>                                         {/* description */}
                
                <div className="flex w-full justify-start ">
                    <p className="flex items-center line-clamp-3 mt-2 mr-auto"><MapPinned className="mr-2"size={28}/>{item+index} </p>
                    <p className="flex mr-2 font-semibold items-center gap-2"   ><Ticket style={{color:theme.accentColor(1)}} size={30}/> 1/{index} left</p>
                    
                </div>                                                                                              {/* div for location and ticket info */}
                
              </div>
            </Link>
          </div>
        );
        else //same as the above, just to add extra "filling fast!" tag 
            return(
        <div
            key={index}
            className="flex-1/4   rounded-3xl m-5 max-w-3/10 gap-2"
            style={{ backgroundColor: theme.secondaryColor(0.7) }}
          >
            <Link to={`/event/${index}`}>
              <div className="m-2  flex max-h-6/10 rounded-3xl overflow-clip items-center">
                <img src={imge} alt="image"></img>
              </div>
              <div className="m-2 mb-0  pl-2">
                <div className="flex w-full justify-start ">
                    <p
                    className="font-semibold text-2xl font-serifs mr-auto"
                    style={{ color: theme.accentColor(1) }}
                    >{item}</p>
                    <p className="flex mr-2 font-semibold items-center rounded-xl pl-2 pr-2"  style={{backgroundColor:theme.exColor(0.4),color:theme.accentColor(1)}} >{" filling fast! "}</p>
                    <p className="flex mr-2 font-semibold items-center rounded-xl pl-2 pr-2"  style={{backgroundColor:theme.primaryColor(0.2),color:theme.accentColor(1)}} >{" category "}</p>
                    
                </div>
                <p>{"some stuff something at some place some activity"}</p>
                
                <div className="flex w-full justify-start ">
                    <p className="flex items-center line-clamp-3 mt-2 mr-auto"><MapPinned className="mr-2"size={28}/>{item+index} </p>
                    <p className="flex mr-2 font-semibold items-center gap-2"   ><Ticket style={{color:theme.accentColor(1)}} size={30}/> 1/{index} left</p>
                    
                </div>
                
              </div>
            </Link>
          </div>
        );
      
    
}
export default EventCard;