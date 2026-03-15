import Select from "react-dropdown-select";
import Mbody from "../components/Mbody";
import DropDownList from "../components/DropDownList";
import { theme } from "../components/theme";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
const HomePage = ()=>{
    const Loptions=[{value:1,label:'Telugu'},{value:2,label:'Hindi'},{value:3,label:'English'},{value:4,label:'Tamil'}];
    const Goptions=[{value:1,label:'Comedy'},{value:2,label:'Technological'},{value:3,label:'History'},{value:4,label:'Charity'}];
    const Poptions=[{value:1,label:'Rs 1000'},{value:2,label:'Rs 100'},{value:3,label:'Rs 10000'},{value:4,label:'Rs 100000'}];
    const Ooptions=[{value:1,label:'Paid'},{value:2,label:'Voluntary'},{value:3,label:'Paying'},{value:4,label:'others'}];
    return (
        <div className="w-full">
        <div className="w-full mt-2 flex p-1"> 
            <div className="flex items-center text-xl min-w-1/10 justify-center font-semibold text-(--accentColor) darkMode:text-(--secondaryColor)" >Filters</div>
            <div className="flex p-1 justify-around w-full" >
                <DropDownList options={Loptions} placeHolder={"Language"}/>
                <DropDownList options={Goptions} placeHolder={"Genre"}/>
                <DropDownList options={Poptions} placeHolder={"Prices"}/>
                <DropDownList options={Ooptions} placeHolder={"others"}/>
            </div>
            
        </div>
        <Mbody/>
        </div>
    );
}
export default HomePage;