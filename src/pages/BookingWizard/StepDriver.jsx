function StepDriver({
  driverName,
  driverEmail,
  driverPhone,
  onChange,
  errors,
  onNext,
  onBack,
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Driver details</h2>
      <div className="flex flex-col gap-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full name
          </label>
          <input
            type="text"
            value={driverName}
            onChange={(e) => onChange("driverName", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          {errors.driverName && (
            <p className="text-red-600 text-sm mt-1">{errors.driverName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={driverEmail}
            onChange={(e) => onChange("driverEmail", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          {errors.driverEmail && (
            <p className="text-red-600 text-sm mt-1">{errors.driverEmail}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={driverPhone}
            onChange={(e) => onChange("driverPhone", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          {errors.driverPhone && (
            <p className="text-red-600 text-sm mt-1">{errors.driverPhone}</p>
          )}
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onBack}
            className="border px-6 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transitio"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default StepDriver;
