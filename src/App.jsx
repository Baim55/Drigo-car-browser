import { useEffect, useMemo, useReducer } from "react";
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
import filtersReducer, { initialFilters } from "./reducers/filtersReducer";

function App() {
  const { data: cars, loading, error, retry } = useCars();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, dispatch] = useReducer(
    filtersReducer,
    initialFilters,
    (init) => ({
      ...init,
      search: searchParams.get("q") || init.search,
      transmission: searchParams.get("transmission") || init.transmission,
      type: searchParams.get("type") || init.type,
      availableOnly: searchParams.get("available") === "1",
      sort: searchParams.get("sort") || init.sort,
    }),
  );

  const debouncedSearch = useDebounce(filters.search, 300);

  const filteredCars = useMemo(() => {
    if (!cars) return [];
    const filtered = filterCars(cars, {
      search: debouncedSearch,
      transmission: filters.transmission,
      type: filters.type,
      availableOnly: filters.availableOnly,
    });
    return sortCars(filtered, filters.sort);
  }, [
    cars,
    debouncedSearch,
    filters.transmission,
    filters.type,
    filters.availableOnly,
    filters.sort,
  ]);

  function handleReset() {
    dispatch({ type: "RESET" });
  }

  useEffect(() => {
    const params = {};
    if (filters.search) {
      params.q = filters.search;
    }
    if (filters.transmission !== "All") {
      params.transmission = filters.transmission;
    }
    if (filters.type !== "All") {
      params.type = filters.type;
    }
    if (filters.availableOnly) {
      params.available = "1";
    }
    if (filters.sort !== "none") {
      params.sort = filters.sort;
    }
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="mb-5">
      <Header />
      <div className="container grid grid-cols-1 md:grid-cols-[280px_1fr] gap-5">
        <div className="shadow-xl p-5 ">
          <SearchBar
            value={filters.search}
            onChange={(value) =>
              dispatch({ type: "SET_SEARCH", payload: value })
            }
          />
          <FilterBar
            transmission={filters.transmission}
            onTransmissionChange={(value) =>
              dispatch({ type: "SET_TRANSMISSION", payload: value })
            }
            type={filters.type}
            onTypeChange={(value) =>
              dispatch({ type: "SET_TYPE", payload: value })
            }
            availableOnly={filters.availableOnly}
            onAvailableOnlyChange={(value) =>
              dispatch({ type: "SET_AVAILABLE_ONLY", payload: value })
            }
          />
          <SortSelect
            sort={filters.sort}
            onSortChange={(value) =>
              dispatch({ type: "SET_SORT", payload: value })
            }
          />
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
