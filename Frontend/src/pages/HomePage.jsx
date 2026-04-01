import Select from "react-dropdown-select";
import Mbody from "../components/Mbody";
import DropDownList from "../components/DropDownList";
import { theme } from "../components/theme";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
const HomePage = ()=>{
    
    return (
        <div className="w-full">
        <Mbody />
        </div>
    );
}
export default HomePage;