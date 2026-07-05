import { useMemo, useState } from "react";
import CarGrid from "./components/CarGrid";
import SearchBar from "./components/SearchBar";
import cars from "./data/cars.json";
import useDebounce from "./hooks/useDebounce";
import filterCars from "./utils/filterCars";
import FilterBar from "./components/FilterBar";

function App() {
  const [search, setSearch] = useState("");
  const [transmission, setTransmission] = useState("All");
  const [type, setType] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const filteredCars = useMemo(() => {
    return filterCars(cars, {
      search: debouncedSearch,
      transmission,
      type,
      availableOnly,
    });
  }, [debouncedSearch, transmission, type, availableOnly]);

  return (
    <div className="container">
      <SearchBar value={search} onChange={setSearch} />
      <FilterBar
        transmission={transmission}
        onTransmissionChange={setTransmission}
        type={type}
        onTypeChange={setType}
        availableOnly={availableOnly}
        onAvailableOnlyChange={setAvailableOnly}
      />
      <CarGrid cars={filteredCars} />
    </div>
  );
}

export default App;
