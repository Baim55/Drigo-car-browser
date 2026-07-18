export function dateRangesOverlap(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

export function hasOverlappingBooking(booking, carId, startDate, endDate) {
  return booking.some(
    (booking) =>
      booking.carId === carId &&
      dateRangesOverlap(startDate, endDate, booking.startDate, booking.endDate),
  );
}
