import { useMemo, useState } from "react";
import CarGrid from "./components/CarGrid";
import SearchBar from "./components/SearchBar";
import cars from "./data/cars.json";
import useDebounce from "./hooks/useDebounce";
import filterCars from "./utils/filterCars";

function App() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const filteredCars = useMemo(() => {
    return filterCars(cars, { search: debouncedSearch });
  }, [debouncedSearch]);

  return (
    <>
      <SearchBar value={search} onChange={setSearch} />
      <CarGrid cars={filteredCars} />
    </>
  );
}

export default App;
