import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CarListPage from "./pages/CarListPage";
import CarDetailPage from "./pages/CarDetailPage";
import BookingWizard from "./pages/BookingWizard/BookingWizard";

function App() {
  return (
    <div className="mb-5">
      <Header />
      <Routes>
        <Route path="/" element={<CarListPage />} />
        <Route path="/cars/:id" element={<CarDetailPage />} />
        <Route path="/cars/:id/book" element={<BookingWizard />} />
      </Routes>
    </div>
  );
}

export default App;
