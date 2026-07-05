function filterCars(cars, { search, transmission, type, availableOnly }) {
  return cars.filter((car) => {
    if (search && !car.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (transmission !== "All" && car.transmission !== transmission) {
      return false;
    }
    if (type !== "All" && car.type !== type) {
      return false;
    }
    if (availableOnly && !car.available) {
      return false;
    }
    return true;
  });
}

export default filterCars;
