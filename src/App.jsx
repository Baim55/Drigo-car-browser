import { useEffect, useMemo, useState } from "react";
import CarGrid from "./components/CarGrid";
import SearchBar from "./components/SearchBar";
import useDebounce from "./hooks/useDebounce";
import filterCars from "./utils/filterCars";
import FilterBar from "./components/FilterBar";
import sortCars from "./utils/sortCars";
import SortSelect from "./components/SortSelect";
import ResultsCounter from "./components/ResultsCounter";
import EmptyState from "./components/EmptyState";
import { useSearchParams } from "react-router-dom";
import Header from "./components/Header";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import useCars from "./hooks/useCars";

function App() {
  const { data: cars, loading, error, retry } = useCars();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(() => searchParams.get("q") || "");
  const [transmission, setTransmission] = useState(
    () => searchParams.get("transmission") || "All",
  );
  const [type, setType] = useState(() => searchParams.get("type") || "All");
  const [availableOnly, setAvailableOnly] = useState(
    () => searchParams.get("available") === "1",
  );
  const [sort, setSort] = useState(() => searchParams.get("sort") || "none");

  const debouncedSearch = useDebounce(search, 300);

  const filteredCars = useMemo(() => {
    if (!cars) return [];
    const filtered = filterCars(cars, {
      search: debouncedSearch,
      transmission,
      type,
      availableOnly,
    });
    return sortCars(filtered, sort);
  }, [cars, debouncedSearch, transmission, type, availableOnly, sort]);

  function handleReset() {
    setSearch("");
    setTransmission("All");
    setType("All");
    setAvailableOnly(false);
    setSort("none");
  }

  useEffect(() => {
    const params = {};
    if (search) {
      params.q = search;
    }
    if (transmission !== "All") {
      params.transmission = transmission;
    }
    if (type !== "All") {
      params.type = type;
    }
    if (availableOnly) {
      params.available = "1";
    }
    if (sort !== "none") {
      params.sort = sort;
    }
    setSearchParams(params, { replace: true });
  }, [search, transmission, type, availableOnly, sort, setSearchParams]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="mb-5">
      <Header />
      <div className="container grid grid-cols-1 md:grid-cols-[280px_1fr] gap-5">
        <div className="shadow-xl p-5 ">
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
        </div>
        <div className=" px-3 md:px-0">
          {" "}
          <ResultsCounter shown={filteredCars.length} total={cars.length} />
          {filteredCars.length === 0 ? (
            <EmptyState onReset={handleReset} />
          ) : (
            <CarGrid cars={filteredCars} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
