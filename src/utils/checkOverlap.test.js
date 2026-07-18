import { describe, it, expect } from "vitest";
import { dateRangesOverlap, hasOverlappingBooking } from "./checkOverlap";

describe("dateRangesOverlap", () => {
  it("returns true when ranges overlap", () => {
    expect(dateRangesOverlap("2026-07-20", "2026-07-24", "2026-07-22", "2026-07-26")).toBe(true);
  });

  it("returns false when ranges don't overlap", () => {
    expect(dateRangesOverlap("2026-07-20", "2026-07-24", "2026-07-25", "2026-07-28")).toBe(false);
  });

  it("returns false when one range ends exactly when the other starts", () => {
    expect(dateRangesOverlap("2026-07-20", "2026-07-24", "2026-07-24", "2026-07-28")).toBe(false);
  });
});

describe("hasOverlappingBooking", () => {
  const bookings = [
    { carId: 1, startDate: "2026-07-20", endDate: "2026-07-24" },
  ];

  it("detects an overlap for the same car", () => {
    const result = hasOverlappingBooking(bookings, 1, "2026-07-22", "2026-07-26");
    expect(result).toBe(true);
  });

  it("returns false for non-overlapping dates on the same car", () => {
    const result = hasOverlappingBooking(bookings, 1, "2026-07-25", "2026-07-28");
    expect(result).toBe(false);
  });

  it("returns false when dates overlap but the car is different", () => {
    const result = hasOverlappingBooking(bookings, 2, "2026-07-22", "2026-07-26");
    expect(result).toBe(false);
  });
});