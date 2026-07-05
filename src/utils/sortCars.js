function sortCars(cars, sort) {
  if (sort === "low-high") {
    return [...cars].sort((a, b) => a.pricePerDay - b.pricePerDay);
  }
  if (sort === "high-low") {
    return [...cars].sort((a, b) => b.pricePerDay - a.pricePerDay);
  }
  return cars;
}

export default sortCars;
