export function toDateOnly(dateString) {
  return new Date(dateString + "T00:00:00");
}

export function IsBeforeToday(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return toDateOnly(dateString) < today;
}

export function daysBetween(startDate, endDate) {
  const start = toDateOnly(startDate);
  const end = toDateOnly(endDate);
  const diffMs = end - start;
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function todayAsString() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}
