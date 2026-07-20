import { daysBetween, IsBeforeToday } from "./dateHelpers";

const MIN_RENTAL_DAYS = 1;

export function validateDatesStep({ startDate, endDate }) {
  const errors = {};

  if (!startDate) {
    errors.startDate = "Start date is required.";
  } else if (IsBeforeToday(startDate)) {
    errors.startDate = "Start date cannot be in past.";
  }
  if (!endDate) {
    errors.endDate = "End date is required.";
  } else if (startDate && endDate <= startDate) {
    errors.endDate = "End date must be after start date.";
  } else if (
    startDate &&
    endDate &&
    daysBetween(startDate, endDate) < MIN_RENTAL_DAYS
  ) {
    errors.endDate = `Minimum rental length is ${MIN_RENTAL_DAYS} days(s).`;
  }
  return errors;
}

export function validateDriverStep({ driverName, driverEmail, driverPhone }) {
  const errors = {};

  if (!driverName.trim()) {
    errors.driverName = "Name is required.";
  }
  if (!driverEmail.trim()) {
    errors.driverEmail = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(driverEmail)) {
    errors.driverEmail = "Enter a valid email address.";
  }
  if (!driverPhone.trim()) {
    errors.driverName = "Phone is required.";
  }
  return errors;
}
