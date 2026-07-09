import Select from "react-dropdown-select";
import Mbody from "../components/home/Mbody";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useLocation } from "react-router-dom";
const HomePage = ()=>{
    const location = useLocation();
    const refresh = location.state?.refresh;
    useEffect(()=>{
    },[refresh]);
    return (
        <div className="w-full">
        <Mbody refresh={refresh}/>
        </div>
    );
}
export default HomePage;
