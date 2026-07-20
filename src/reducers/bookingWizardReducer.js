export const initialWizardState = {
  step: 1,
  startDate: "",
  endDate: "",
  driverName: "",
  driverEmail: "",
  driverPhone: "",
};

function bookingWizardReducer(state, action) {
  switch (action.type) {
    case "SET_START_DATE":
      return { ...state, startDate: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "SET_DRIVER_NAME":
      return { ...state, driverName: action.payload };
    case "SET_DRIVER_EMAIL":
      return { ...state, driverEmail: action.payload };
    case "SET_DRIVER_PHONE":
      return { ...state, driverPhone: action.payload };
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: state.step - 1 };
    case "RESET":
      return initialWizardState;
    default:
      return state;
  }
}

export default bookingWizardReducer;
