function FilterBar({
  transmission,
  onTransmissionChange,
  type,
  onTypeChange,
  availableOnly,
  onAvailableOnlyChange,
}) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <select
        value={transmission}
        onChange={(e) => onTransmissionChange(e.target.value)}
        className="border rounded-2xl px-3 py-2"
      >
        <option value="All">All Transmission</option>
        <option value="Automatic">Automatic</option>
        <option value="Manual">Manual</option>
      </select>
      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        className="border rounded-2xl px-3 py-2"
      >
        <option value="All">All Types</option>
        <option value="Economy">Economy</option>
        <option value="Sedan">Sedan</option>
        <option value="SUV">SUV</option>
        <option value="Luxury">Luxury</option>
      </select>
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
