import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";
import Footer from "./components/footer";

const Layout=()=>{
    return(
        <main className=" overflow-y-auto overflow-x-auto no-scrollbar block">
            <NavBar/>
            <Outlet/>
            <Footer/>
        </main>
    );
}
export default Layout;