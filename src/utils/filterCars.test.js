import { describe, it, expect } from "vitest";
import filterCars from "./filterCars";

const sampleCars = [
  { id: 1, name: "Toyota Corolla", type: "Sedan", transmission: "Automatic", seats: 5, pricePerDay: 35, available: true },
  { id: 2, name: "Hyundai Accent", type: "Economy", transmission: "Manual", seats: 5, pricePerDay: 28, available: true },
  { id: 3, name: "Kia Sportage", type: "SUV", transmission: "Automatic", seats: 5, pricePerDay: 55, available: false },
];

const noFilters = {
  search: "",
  transmission: "All",
  types: [],
  availableOnly: false,
  priceMin: "",
  priceMax: "",
  seats: "All",
  favoritesOnly: false,
  favoriteIds: [],
};

describe("filterCars", () => {
  it("returns all cars when no filters are applied", () => {
    const result = filterCars(sampleCars, noFilters);
    expect(result.length).toBe(3);
  });

  it("filters by search term, case-insensitive", () => {
    const result = filterCars(sampleCars, { ...noFilters, search: "toyota" });
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Toyota Corolla");
  });

  it("combines multiple filters with AND logic", () => {
    const result = filterCars(sampleCars, {
      ...noFilters,
      transmission: "Automatic",
      availableOnly: true,
    });
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Toyota Corolla");
  });

  it("returns an empty array when no car matches", () => {
    const result = filterCars(sampleCars, { ...noFilters, search: "zzz" });
    expect(result.length).toBe(0);
  });

  it("filters by price range", () => {
    const result = filterCars(sampleCars, { ...noFilters, priceMin: "30", priceMax: "50" });
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Toyota Corolla");
  });
});