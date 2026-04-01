import NavBar from "./components/layout/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import HistoryPage from "./pages/HistoryPage";
import HostNewPage from "./pages/HostNewPage";
import Layout from "./Layout";
import ScrollToTop from "./components/utils/ScrollToTop";
import { PageProvider } from "./contexts/PageContext";
import MyEvents from "./pages/MyEvents";
import { ThemeProvider } from "./contexts/ThemeContext";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import BookingPage from "./pages/BookingPage";

const App = () => {
  return (
    <PageProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/event/:id" element={<EventPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/hostnew" element={<HostNewPage />} />
             <Route path="/myevents" element={<MyEvents />} />
            <Route path="/bookEvent/:id" element={<BookingPage/>}/>
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </PageProvider>
  );
};
export default App;
