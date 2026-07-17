import { db } from "./db";
import { simulateNetwork } from "./simulateNetwork";
import filterCars from "../utils/filterCars";
import sortCars from "../utils/sortCars";
import paginate from "../utils/paginate";

const PAGE_SIZE = 6;

export async function getCars(query = {}) {
  await simulateNetwork();

  const filtered = filterCars(db.cars, {
    search: query.search || "",
    transmission: query.transmission || "All",
    types: query.types || [],
    availableOnly: query.availableOnly || false,
    priceMin: query.priceMin || "",
    priceMax: query.priceMax || "",
    seats: query.seats || "All",
    favoritesOnly: false,
    favoriteIds: [],
  });

  const sorted = sortCars(filtered, query.sort || "none");
  const { paginatedItems, totalPages, currentPage } = paginate(
    sorted,
    query.page || 1,
    PAGE_SIZE,
  );
  return {
    items: paginatedItems,
    total: sorted.length,
    totalPages,
    currentPage,
  };
}

export async function getCar(id) {
  await simulateNetwork();
  const car = db.cars.find((c) => c.id === Number(id));
  if (!car) throw new Error("Car not found");
  return car;
}
