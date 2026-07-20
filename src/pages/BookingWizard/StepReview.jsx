import { calculatePrice } from "../../utils/calculatePrice";
import { daysBetween } from "../../utils/dateHelpers";

function StepReview({
  car,
  wizardState,
  onBack,
  onConfirm,
  submitting,
  submitError,
}) {
  const days = daysBetween(wizardState.startDate, wizardState.endDate);
  const { rentalCost, serviceFee, total } = calculatePrice(
    car.pricePerDay,
    days,
  );
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Review & confirm</h2>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <p className="font-semibold">{car.name}</p>
        <p className="text-sm text-gray-600">
          {wizardState.startDate} → {wizardState.endDate} ({days} day
          {days !== 1 ? "s" : ""})
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <p className="font-semibold mb-1">Driver</p>
        <p className="text-sm text-gray-600">{wizardState.driverName}</p>
        <p className="text-sm text-gray-600">{wizardState.driverEmail}</p>
        <p className="text-sm text-gray-600">{wizardState.driverPhone}</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            Rental ({days} day{days !== 1 ? "s" : ""})
          </span>
          <span>${rentalCost}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Service fee</span>
          <span>${serviceFee}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      {submitError && (
        <p className="text-red-600 text-sm mb-4">{submitError}</p>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={submitting}
          className="border px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          disabled={submitting}
          className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-50"
        >
          {submitting ? "Booking…" : "Confirm booking"}
        </button>
      </div>
    </div>
  );
}

export default StepReview;
