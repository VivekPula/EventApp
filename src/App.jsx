import NavBar from "./components/layout/NavBar";
import { theme } from "./components/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import HistoryPage from "./pages/HistoryPage";
import HostNewPage from "./pages/HostNewPage";
import Layout from "./Layout";
import ScrollToTop from "./components/ScrollToTop";
import { PageProvider } from "./context/PageContext";
import MyEvents from './pages/MyEvents';

const App = () => {
  return (
    <PageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/hostnew" element={<HostNewPage />} />
             <Route path="/myevents" element={<MyEvents/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PageProvider>
  );
};
export default App;
