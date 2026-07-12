function sortCars(cars, sort) {
  if (sort === "low-high") {
    return [...cars].sort((a, b) => a.pricePerDay - b.pricePerDay);
  }
  if (sort === "high-low") {
    return [...cars].sort((a, b) => b.pricePerDay - a.pricePerDay);
  }
  if (sort === "name-az") {
    return [...cars].sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sort === "name-za") {
    return [...cars].sort((a, b) => b.name.localeCompare(a.name));
  }
  return cars;
}

export default sortCars;
