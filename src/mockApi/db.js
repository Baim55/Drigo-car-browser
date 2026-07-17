import seedBookings from "./seedBookings.json";
import carsData from "../data/cars.json";

const BOOKING_KEY = "bookings";

function loadBookings() {
  try {
    const stored = localStorage.getItem(BOOKING_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(BOOKING_KEY, JSON.stringify(seedBookings));
    return seedBookings;
  } catch {
    return seedBookings;
  }
}

function saveBookings(bookings) {
  localStorage.setItem(BOOKING_KEY, JSON.stringify(bookings));
}

export const db = {
  cars: carsData,
  getBookings: () => loadBookings(),
  saveBookings: (bookings) => saveBookings(bookings),
};
