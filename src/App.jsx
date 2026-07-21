import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CarListPage from "./pages/CarListPage";
import CarDetailPage from "./pages/CarDetailPage";
import BookingWizard from "./pages/BookingWizard/BookingWizard";
import { BookingProvider } from "./context/BookingsContext";
import MyBookingsPage from "./pages/MyBookingsPage";
import { AuthProvider } from "./context/AuthContext";
import SignInPage from "./pages/SignInPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <div className="mb-5">
          <Header />
          <Routes>
            <Route path="/" element={<CarListPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/cars/:id" element={<CarDetailPage />} />
            <Route
              path="/cars/:id/book"
              element={
                <ProtectedRoute>
                  <BookingWizard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookingsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
