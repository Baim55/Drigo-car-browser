import { useMemo, useState } from "react";
import CarGrid from "./components/CarGrid";
import SearchBar from "./components/SearchBar";
import cars from "./data/cars.json";
import useDebounce from "./hooks/useDebounce";
import filterCars from "./utils/filterCars";
import FilterBar from "./components/FilterBar";
import sortCars from "./utils/sortCars";
import SortSelect from "./components/SortSelect";
import ResultsCounter from "./components/ResultsCounter";
import EmptyState from "./components/EmptyState";

function App() {
  const [search, setSearch] = useState("");
  const [transmission, setTransmission] = useState("All");
  const [type, setType] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sort, setSort] = useState("none");

  const debouncedSearch = useDebounce(search, 300);

  const filteredCars = useMemo(() => {
    const filtered = filterCars(cars, {
      search: debouncedSearch,
      transmission,
      type,
      availableOnly,
    });
    return sortCars(filtered, sort);
  }, [debouncedSearch, transmission, type, availableOnly, sort]);

  function handleReset() {
    setSearch("");
    setTransmission("All");
    setType("All");
    setAvailableOnly(false);
    setSort("none");
  }

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
      <SortSelect sort={sort} onSortChange={setSort} />
      <ResultsCounter shown={filteredCars.length} total={cars.length} />
      {filteredCars.length === 0 ? (
        <EmptyState onReset={handleReset} />
      ) : (
        <CarGrid cars={filteredCars} />
      )}
    </div>
  );
}

export default App;
