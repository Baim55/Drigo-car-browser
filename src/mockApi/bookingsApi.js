import { invalidateCache } from "./cache";
import { db } from "./db";
import { simulateNetwork } from "./simulateNetwork";

function generateId() {
  return `b${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

export async function getBookings() {
  await simulateNetwork();
  return db.getBookings();
}

export async function createBooking(data) {
  await simulateNetwork();

  const bookings = db.getBookings();

  const overlaps = bookings.some(
    (b) =>
      b.carId === data.carId &&
      data.startDate < b.endDate &&
      data.endDate > b.startDate,
  );

  if (overlaps) {
    throw new Error("This car is already booked for the selected dates.");
  }

  const newBooking = {
    id: generateId(),
    carId: data.carId,
    startDate: data.startDate,
    endDate: data.endDate,
    driver: data.driver,
  };
  const updated = [...bookings, newBooking];
  db.saveBookings(updated);
  invalidateCache((key) => key.startsWith("cars:"));
  return newBooking;
}

export async function cancelBooking(id) {
  await simulateNetwork();

  const bookings = db.getBookings();
  const updated = bookings.filter((b) => b.id !== id);

  if (updated.length === bookings.length) {
    throw new Error("Booking not found");
  }

  db.saveBookings(updated);
  invalidateCache((key) => key.startsWith("cars:"));
  return { success: true };
}
