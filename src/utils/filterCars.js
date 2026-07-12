function filterCars(cars, { search, transmission, types, availableOnly,priceMin, priceMax, seats }) {
  return cars.filter((car) => {
    if (search && !car.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (transmission !== "All" && car.transmission !== transmission) {
      return false;
    }
    if (types && types.length > 0 && !types.includes(car.type)) {
      return false;
    }
    if (availableOnly && !car.available) {
      return false;
    }
    if(priceMin !== "" && car.pricePerDay  < parseFloat(priceMin)) {
      return false;
    }
    if(priceMax !== "" && car.pricePerDay  > parseFloat(priceMax)) {
      return false;
    }
    if(seats !== "All" && car.seats !== Number(seats)) {
      return false;
    }
    return true;
  });
}

export default filterCars;
