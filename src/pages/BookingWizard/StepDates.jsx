import DateRangePicker from "../../components/DateRangePicker";

function StepDates({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  errors,
  onNext,
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Choose your dates</h2>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />
      {errors.startDate && (
        <p className="text-red-600 text-sm mt-2">{errors.startDate}</p>
      )}
      {errors.endDate && (
        <p className="text-red-600 text-sm mt-1">{errors.endDate}</p>
      )}
      <button
        onClick={onNext}
        className="mt-6 bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
      >
        Next
      </button>
    </div>
  );
}

export default StepDates;
