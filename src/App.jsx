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
import PriceRangeFilter from "./components/PriceRangeFilter";

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
      types: searchParams.get("types")
        ? searchParams.get("types").split(",")
        : init.types,
      availableOnly: searchParams.get("available") === "1",
      priceMin: searchParams.get("priceMin") || init.priceMin,
      priceMax: searchParams.get("priceMax") || init.priceMax,
      seats: searchParams.get("seats") || init.seats,
      sort: searchParams.get("sort") || init.sort,
    }),
  );

  const debouncedSearch = useDebounce(filters.search, 300);
  const debouncedPriceMin = useDebounce(filters.priceMin, 300);
  const debouncedPriceMax = useDebounce(filters.priceMax, 300);

  const filteredCars = useMemo(() => {
    if (!cars) return [];
    const filtered = filterCars(cars, {
      search: debouncedSearch,
      transmission: filters.transmission,
      types: filters.types,
      availableOnly: filters.availableOnly,
      priceMin: debouncedPriceMin,
      priceMax: debouncedPriceMax,
      seats: filters.seats,
    });
    return sortCars(filtered, filters.sort);
  }, [
    cars,
    debouncedSearch,
    filters.transmission,
    filters.types,
    filters.availableOnly,
    debouncedPriceMin,
    debouncedPriceMax,
    filters.seats,
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
    if (filters.types.length > 0) {
      params.types = filters.types.join(",");
    }
    if (filters.availableOnly) {
      params.available = "1";
    }
    if (filters.priceMin !== "") params.priceMin = filters.priceMin;
    if (filters.priceMax !== "") params.priceMax = filters.priceMax;
    if (filters.seats !== "All") params.seats = filters.seats;
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
            types={filters.types}
            onTypeToggle={(type) =>
              dispatch({ type: "TOGGLE_TYPE", payload: type })
            }
            availableOnly={filters.availableOnly}
            onAvailableOnlyChange={(value) =>
              dispatch({ type: "SET_AVAILABLE_ONLY", payload: value })
            }
            seats={filters.seats}
            onSeatsChange={(value) =>
              dispatch({ type: "SET_SEATS", payload: value })
            }
          />
          <PriceRangeFilter
            priceMin={filters.priceMin}
            priceMax={filters.priceMax}
            onPriceMinChange={(value) => dispatch({ type: "SET_PRICE_MIN", payload: value })}
            onPriceMaxChange={(value) => dispatch({ type: "SET_PRICE_MAX", payload: value })}
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
