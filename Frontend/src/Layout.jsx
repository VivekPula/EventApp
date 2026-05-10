import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import SideBar from "./components/layout/SideBar";
import { useContext, useEffect } from "react";
import { usePage } from "./contexts/PageContext";
import { ThemeContext } from "./contexts/ThemeContext";

const Layout = () => {
  const location = useLocation();
  const { setCurrentPage } = usePage();
  const { Mtheme } = useContext(ThemeContext);
  useEffect(() => {
    const path = location.pathname;
    let name = "";
    if (path === "/") name = "Home";
    else if (path.startsWith("/event")) name = "Event";
    else if (path === "/history") name = "History";
    else if (path === "/hostnew") name = "Host Event";
    else if (path === "/myevents") name = "MyEvents";
    setCurrentPage(name);
  }, [location.pathname, setCurrentPage]);

  return (
    <main className=" pt-16  w-full bg-(--bg) text-(--fg)">
      <NavBar />
      <div className="flex justify-between">
        <SideBar />
        <div className="flex ml-50 min-h-[calc(100vh-4rem)] w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </main>
  );
};
export default Layout;
