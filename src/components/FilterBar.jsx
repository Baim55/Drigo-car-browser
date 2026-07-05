function FilterBar({
  transmission,
  onTransmissionChange,
  type,
  onTypeChange,
  availableOnly,
  onAvailableOnlyChange,
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full">
        <p className="font-bold text-[20px]">Transmission</p>
        <select
          value={transmission}
          onChange={(e) => onTransmissionChange(e.target.value)}
          className="w-full border border-gray-400 rounded-[10px] px-3 py-2 mt-2"
        >
          <option value="All">All Transmission</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
      </div>

      <div className="w-full">
        <p className="font-bold text-[20px]">Type</p>
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className="w-full border border-gray-400 rounded-[10px] px-3 py-2 mt-2"
        >
          <option value="All">All Types</option>
          <option value="Economy">Economy</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Luxury">Luxury</option>
        </select>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={availableOnly}
          onChange={(e) => onAvailableOnlyChange(e.target.checked)}
        />
        Available only
      </label>
    </div>
  );
}

export default FilterBar;
