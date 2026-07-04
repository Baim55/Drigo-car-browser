function filterCars(cars, { search }) {
  return cars.filter((car) => {
    if (search && !car.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });
}

export default filterCars;
