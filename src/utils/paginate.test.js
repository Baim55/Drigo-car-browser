import { describe, it, expect } from "vitest";
import paginate from "./paginate";

const items = Array.from({ length: 12 }, (_, i) => ({ id: i + 1 }));

describe("paginate", () => {
  it("returns the correct slice for the first page", () => {
    const { paginatedItems, totalPages } = paginate(items, 1, 6);
    expect(paginatedItems.length).toBe(6);
    expect(paginatedItems[0].id).toBe(1);
    expect(totalPages).toBe(2);
  });

  it("returns the correct slice for the second page", () => {
    const { paginatedItems } = paginate(items, 2, 6);
    expect(paginatedItems.length).toBe(6);
    expect(paginatedItems[0].id).toBe(7);
  });

  it("clamps an out-of-range page to the last valid page", () => {
    const { paginatedItems, currentPage } = paginate(items, 999, 6);
    expect(currentPage).toBe(2);
    expect(paginatedItems.length).toBe(6);
  });

  it("handles invalid (NaN) page values safely", () => {
    const { currentPage } = paginate(items, NaN, 6);
    expect(currentPage).toBe(1);
  });
});