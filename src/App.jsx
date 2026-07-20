import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CarListPage from "./pages/CarListPage";
import CarDetailPage from "./pages/CarDetailPage";
import BookingWizard from "./pages/BookingWizard/BookingWizard";
import { BookingProvider } from "./context/BookingsContext";
import MyBookingsPage from "./pages/MyBookingsPage";

function App() {
  return (
    <BookingProvider>
      <div className="mb-5">
        <Header />
        <Routes>
          <Route path="/" element={<CarListPage />} />
          <Route path="/cars/:id" element={<CarDetailPage />} />
          <Route path="/cars/:id/book" element={<BookingWizard />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
        </Routes>
      </div>
    </BookingProvider>
  );
}

export default App;
