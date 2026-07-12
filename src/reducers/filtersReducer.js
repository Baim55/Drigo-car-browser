export const initialFilters = {
  search: "",
  transmission: "All",
  types: [],
  availableOnly: false,
  priceMin: "",
  priceMax: "",
  seats: "All",
  sort: "none",
};

function filtersReducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_TRANSMISSION":
      return { ...state, transmission: action.payload };
    case "TOGGLE_TYPE": {
      const type = action.payload;
      const alreadySelected = state.types.includes(type);
      const newTypes = alreadySelected
        ? state.types.filter((t) => t !== type)
        : [...state.types, type];
      return { ...state, types: newTypes };
    }
    case "SET_AVAILABLE_ONLY":
      return { ...state, availableOnly: action.payload };
    case "SET_PRICE_MIN":
      return { ...state, priceMin: action.payload };
    case "SET_PRICE_MAX":
      return { ...state, priceMax: action.payload };
    case "SET_SEATS":
      return { ...state, seats: action.payload };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "RESET":
      return initialFilters;
    case "INIT_FROM_URL":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default filtersReducer;
