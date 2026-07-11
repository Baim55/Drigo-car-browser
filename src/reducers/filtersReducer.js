export const initialFilters = {
  search: "",
  transmission: "All",
  type: "All",
  availableOnly: false,
  sort: "none",
};

function filtersReducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_TRANSMISSION":
      return { ...state, transmission: action.payload };
    case "SET_TYPE":
      return { ...state, type: action.payload };
    case "SET_AVAILABLE_ONLY":
      return { ...state, availableOnly: action.payload };
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
