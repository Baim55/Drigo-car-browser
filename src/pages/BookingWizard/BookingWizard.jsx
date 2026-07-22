import { useNavigate, useParams } from "react-router-dom";
import useCar from "../../hooks/useCar";
import { useEffect, useReducer, useRef, useState } from "react";
import bookingWizardReducer, {
  initialWizardState,
} from "../../reducers/bookingWizardReducer";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import {
  validateDatesStep,
  validateDriverStep,
} from "../../utils/validateBookingStep";
import { createBooking } from "../../mockApi/bookingsApi";
import StepDates from "./StepDates";
import StepDriver from "./StepDriver";
import StepReview from "./StepReview";
import { useToast } from "../../context/ToastContext";
import { useBookings } from "../../context/BookingsContext";

function BookingWizard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { car, loading, error } = useCar(id);

  const { retry: refreshBookings } = useBookings();

  const [wizard, dispatch] = useReducer(
    bookingWizardReducer,
    initialWizardState,
  );
  const [dateErrors, setDateErrors] = useState({});
  const [driverErrors, setDriverErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const stepHeadingRef = useRef(null);

  useEffect(() => {
    if (stepHeadingRef.current) {
      stepHeadingRef.current.focus();
    }
  }, [wizard.step]);

  if (loading) return <LoadingState />;
  if (error)
    return (
      <ErrorState message={error} onRetry={() => window.location.reload()} />
    );

  function handleDatesNext() {
    const errors = validateDatesStep(wizard);
    setDateErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch({ type: "NEXT_STEP" });
    }
  }

  function handleDriverNext() {
    const errors = validateDriverStep(wizard);
    setDriverErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch({ type: "NEXT_STEP" });
    }
  }

  function handleDriverChange(field, value) {
    const actionTypeMap = {
      driverName: "SET_DRIVER_NAME",
      driverEmail: "SET_DRIVER_EMAIL",
      driverPhone: "SET_DRIVER_PHONE",
    };
    dispatch({ type: actionTypeMap[field], payload: value });
  }

  async function handleConfirm() {
    setSubmitting(true);
    setSubmitError(null);

    try {
      await createBooking({
        carId: car.id,
        startDate: wizard.startDate,
        endDate: wizard.endDate,
        driver: wizard.driverName,
      });
      refreshBookings();
      showToast("Booking confirmed!", "success");
      navigate("/my-bookings");
    } catch (err) {
      setSubmitError(err.message);
      showToast(err.message, "error");
      setSubmitting(false);
    }
  }

  return (
    <div className="container px-3 md:px-0 max-w-2xl">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-600 hover:text-blue-900 font-medium mb-6"
      >
        ← Back to {car.name}
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
        <p className="text-sm text-gray-500 mb-4">Step {wizard.step} of 3</p>

        {wizard.step === 1 && (
          <StepDates
            startDate={wizard.startDate}
            endDate={wizard.endDate}
            onStartDateChange={(v) =>
              dispatch({ type: "SET_START_DATE", payload: v })
            }
            onEndDateChange={(v) =>
              dispatch({ type: "SET_END_DATE", payload: v })
            }
            errors={dateErrors}
            onNext={handleDatesNext}
          />
        )}

        {wizard.step === 2 && (
          <StepDriver
            driverName={wizard.driverName}
            driverEmail={wizard.driverEmail}
            driverPhone={wizard.driverPhone}
            onChange={handleDriverChange}
            errors={driverErrors}
            onNext={handleDriverNext}
            onBack={() => dispatch({ type: "PREV_STEP" })}
          />
        )}

        {wizard.step === 3 && (
          <StepReview
            car={car}
            wizardState={wizard}
            onBack={() => dispatch({ type: "PREV_STEP" })}
            onConfirm={handleConfirm}
            submitting={submitting}
            submitError={submitError}
          />
        )}
      </div>
    </div>
  );
}

export default BookingWizard;
