import { useEffect, useMemo, useReducer } from "react";
import CarGrid from "../components/CarGrid";
import SearchBar from "../components/SearchBar";
import useDebounce from "../hooks/useDebounce";
import FilterBar from "../components/FilterBar";
import SortSelect from "../components/SortSelect";
import ResultsCounter from "../components/ResultsCounter";
import EmptyState from "../components/EmptyState";
import { useSearchParams } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import useCars from "../hooks/useCars";
import filtersReducer, { initialFilters } from "../reducers/filtersReducer";
import PriceRangeFilter from "../components/PriceRangeFilter";
import Pagination from "../components/Pagination";
import useFavorites from "../hooks/useFavorites";

function CarListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isFavorite, toggleFavorite, favoriteIds } = useFavorites();

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
      page: Number(searchParams.get("page")) || init.page,
    }),
  );

  const debouncedSearch = useDebounce(filters.search, 300);
  const debouncedPriceMin = useDebounce(filters.priceMin, 300);
  const debouncedPriceMax = useDebounce(filters.priceMax, 300);

  const query = useMemo(
    () => ({
      search: debouncedSearch,
      transmission: filters.transmission,
      types: filters.types,
      availableOnly: filters.availableOnly,
      priceMin: debouncedPriceMin,
      priceMax: debouncedPriceMax,
      seats: filters.seats,
      sort: filters.sort,
      page: filters.page,
      favoritesOnly: filters.favoritesOnly,
      favoriteIds,
    }),
    [
      debouncedSearch,
      filters.transmission,
      filters.types,
      filters.availableOnly,
      debouncedPriceMin,
      debouncedPriceMax,
      filters.seats,
      filters.sort,
      filters.page,
      filters.favoritesOnly,
      favoriteIds,
    ],
  );

  const { data, loading, error, retry } = useCars(query);

  function handleReset() {
    dispatch({ type: "RESET" });
  }

  // const { paginatedItems, totalPages, currentPage } = useMemo(() => {
  //   return paginate(filteredCars, filters.page, PAGE_SIZE);
  // }, [filteredCars, filters.page]);

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
    if (filters.page > 1) {
      params.page = filters.page;
    }
    if (filters.priceMin !== "") params.priceMin = filters.priceMin;
    if (filters.priceMax !== "") params.priceMax = filters.priceMax;
    if (filters.seats !== "All") params.seats = filters.seats;
    if (filters.sort !== "none") {
      params.sort = filters.sort;
    }
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  if (loading && !data) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  const items = data?.items || [];
  const total = data?.total || 0;

  return (
    <div className="mb-5">
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
            favoritesOnly={filters.favoritesOnly}
            onFavoritesOnlyChange={(value) =>
              dispatch({ type: "SET_FAVORITES_ONLY", payload: value })
            }
          />
          <PriceRangeFilter
            priceMin={filters.priceMin}
            priceMax={filters.priceMax}
            onPriceMinChange={(value) =>
              dispatch({ type: "SET_PRICE_MIN", payload: value })
            }
            onPriceMaxChange={(value) =>
              dispatch({ type: "SET_PRICE_MAX", payload: value })
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
          <ResultsCounter shown={items.length} total={total} />
          {loading && <p className="text-sm text-gray-400 mb-2">Updating…</p>}
          {items.length === 0 ? (
            <EmptyState onReset={handleReset} />
          ) : (
            <CarGrid
              cars={items}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          )}
          <Pagination
            currentPage={data?.currentPage || 1}
            totalPages={data?.totalPages || 1}
            onPageChange={(page) =>
              dispatch({ type: "SET_PAGE", payload: page })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default CarListPage;
