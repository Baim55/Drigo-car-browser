import { describe, it, expect } from "vitest";
import sortCars from "./sortCars";

const sampleCars = [
  { id: 1, name: "Toyota Corolla", pricePerDay: 35 },
  { id: 2, name: "Hyundai Accent", pricePerDay: 28 },
  { id: 3, name: "Kia Sportage", pricePerDay: 55 },
];

describe("sortCars", () => {
  it("sorts by price low to high", () => {
    const result = sortCars(sampleCars, "low-high");
    expect(result.map((c) => c.name)).toEqual([
      "Hyundai Accent",
      "Toyota Corolla",
      "Kia Sportage",
    ]);
  });

  it("sorts by price high to low", () => {
    const result = sortCars(sampleCars, "high-low");
    expect(result.map((c) => c.name)).toEqual([
      "Kia Sportage",
      "Toyota Corolla",
      "Hyundai Accent",
    ]);
  });

  it("sorts by name A to Z", () => {
    const result = sortCars(sampleCars, "name-az");
    expect(result.map((c) => c.name)).toEqual([
      "Hyundai Accent",
      "Kia Sportage",
      "Toyota Corolla",
    ]);
  });

  it("does not mutate the original array", () => {
    const original = [...sampleCars];
    sortCars(sampleCars, "low-high");
    expect(sampleCars).toEqual(original);
  });
});
