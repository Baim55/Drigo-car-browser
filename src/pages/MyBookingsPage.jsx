import { useEffect, useState } from "react";
import { useBookings } from "../context/BookingsContext";
import { getCar } from "../mockApi/carsApi";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

function todayString() {
  return new Date().toISOString().split("T")[0];
}

function MyBookingsPage() {
  const { bookings, loading, error, cancelBooking, retry } = useBookings();
  const [carsById, setCarsById] = useState({});
  const [cancellingId, setCancellingId] = useState(null);
  const [cancelError, setCancelError] = useState(null);

  useEffect(() => {
    bookings.forEach((b) => {
      if (!carsById[b.carId]) {
        getCar(b.carId).then((car) => {
          setCarsById((prev) => ({ ...prev, [b.carId]: car }));
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  const today = todayString();
  const upcoming = bookings.filter((b) => b.endDate >= today);
  const past = bookings.filter((b) => b.endDate < today);

  async function handleCancel(id) {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    setCancellingId(id);
    setCancelError(null);

    try {
      await cancelBooking(id);
    } catch (err) {
      setCancelError(err.message);
    } finally {
      setCancellingId(null);
    }
  }

  function renderBookingCard(booking) {
    const car = carsById[booking.carId];
    return (
      <div
        key={booking.id}
        className="bg-white border rounded-xl p-4 shadow flex justify-between items-center mb-3"
      >
        <div>
          <p className="font-semibold">
            {car ? car.name : `Car #${booking.carId}`}
          </p>
          <p className="text-sm text-gray-600">
            {booking.startDate} → {booking.endDate}
          </p>
        </div>
        <button
          onClick={() => handleCancel(booking.id)}
          disabled={cancellingId === booking.id}
          className="text-red-600 border border-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition disabled:opacity-50"
        >
          {cancellingId === booking.id ? "Cancelling..." : "Cancel"}
        </button>
      </div>
    );
  }

  return (
    <div className="container px-3 md:px-0 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {cancelError && <p className="text-red-600 mb-4">{cancelError}</p>}

      <h2 className="text-lg font-semibold mb-3">Upcoming</h2>
      {upcoming.length === 0 ? (
        <p className="text-gray-500 mb-6">No upcoming bookings.</p>
      ) : (
        <div className="mb-6">{upcoming.map(renderBookingCard)}</div>
      )}

      <h2 className="text-lg font-semibold mb-3">Past</h2>
      {past.length === 0 ? (
        <p className="text-gray-500">No past bookings.</p>
      ) : (
        <div>{past.map(renderBookingCard)}</div>
      )}
    </div>
  );
}

export default MyBookingsPage;
