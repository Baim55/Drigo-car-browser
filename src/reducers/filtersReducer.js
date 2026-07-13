export const initialFilters = {
  search: "",
  transmission: "All",
  types: [],
  availableOnly: false,
  priceMin: "",
  priceMax: "",
  seats: "All",
  sort: "none",
  page: 1,
  favoritesOnly: false,
};

function filtersReducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload, page: 1 };
    case "SET_TRANSMISSION":
      return { ...state, transmission: action.payload, page: 1 };
    case "TOGGLE_TYPE": {
      const type = action.payload;
      const alreadySelected = state.types.includes(type);
      const newTypes = alreadySelected
        ? state.types.filter((t) => t !== type)
        : [...state.types, type];
      return { ...state, types: newTypes, page: 1 };
    }
    case "SET_AVAILABLE_ONLY":
      return { ...state, availableOnly: action.payload, page: 1 };
    case "SET_PRICE_MIN":
      return { ...state, priceMin: action.payload, page: 1 };
    case "SET_PRICE_MAX":
      return { ...state, priceMax: action.payload, page: 1 };
    case "SET_SEATS":
      return { ...state, seats: action.payload, page: 1 };
    case "SET_SORT":
      return { ...state, sort: action.payload, page: 1 };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "RESET":
      return initialFilters;
    case "SET_FAVORITES_ONLY":
      return { ...state, favoritesOnly: action.payload, page: 1 };
    default:
      return state;
  }
}

export default filtersReducer;
