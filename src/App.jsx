import NavBar from "./components/navbar";
import { theme } from "./components/theme";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import EventPage from "./pages/EventPage"
import Layout from "./Layout";
import ScrollToTop from "./components/ScrollToTop";
const App =()=>{
  return (
    <BrowserRouter>
       <ScrollToTop/>
         <Routes >
          <Route element={<Layout/>}>
            <Route path='/' element={<HomePage/>}/>
            <Route path="/event/:id" element={<EventPage/>}/>
          </Route>
        </Routes>
  </BrowserRouter>
);
}
export default App
