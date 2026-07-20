import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  getBookings,
  cancelBooking as apiCancelBooking,
} from "../mockApi/bookingsApi";

const BookingsContext = createContext(null);

function bookingsReducer(state, action) {
  switch (action.type) {
    case "SET_BOOKINGS":
      return {
        ...state,
        bookings: action.payload,
        loading: false,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "REMOVE_BOOKING_OPTIMISTIC":
      return {
        ...state,
        bookings: state.bookings.filter((b) => b.id !== action.payload),
      };
    case "RESTORE_BOOKING":
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };

    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingsReducer, {
    bookings: [],
    loading: true,
    error: null,
  });

  const loadBookings = useCallback(() => {
    dispatch({ type: "SET_LOADING" });
    getBookings()
      .then((data) => dispatch({ type: "SET_BOOKINGS", payload: data }))
      .catch((err) => dispatch({ type: "SET_ERROR", payload: err.message }));
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  async function cancelBooking(id) {
    const bookingToRemove = state.bookings.find((b) => b.id === id);
    dispatch({ type: "REMOVE_BOOKING_OPTIMISTIC", payload: id });
    try {
      await apiCancelBooking(id);
    } catch (err) {
      dispatch({ type: "RESTORE_BOOKING", payload: bookingToRemove });
      throw err;
    }
  }
  return (
    <BookingsContext.Provider
      value={{ ...state, cancelBooking, retry: loadBookings }}
    >
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error("useBookings must be used within a BookingsProvider");
  }
  return context;
}
