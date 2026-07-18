import {
  daysBetween,
  IsBeforeToday,
  todayAsString,
} from "../utils/dateHelpers";

const MIN_RENTAL_DAYS = 1;

function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) {
  const today = todayAsString();
  let error = null;

  if (startDate && IsBeforeToday(startDate)) {
    error = "Start date cannot be in the past.";
  } else if (startDate && endDate && endDate <= startDate) {
    error = "End date must be after start date.";
  } else if (
    startDate &&
    endDate &&
    daysBetween(startDate, endDate) < MIN_RENTAL_DAYS
  ) {
    error = `Minimum rental length is ${MIN_RENTAL_DAYS} day(s).`;
  }

  return (
    <div className="w-full">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1"></label>
          Start date
          <input
            type="date"
            value={startDate}
            min={today}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1"></label>
          End date
          <input
            type="date"
            value={endDate}
            min={startDate || today}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      {startDate && endDate && !error && (
        <p className="text-gray-600 text-sm mt-2">
          {daysBetween(startDate, endDate)} day(s) selected
        </p>
      )}
    </div>
  );
}

export default DateRangePicker;
