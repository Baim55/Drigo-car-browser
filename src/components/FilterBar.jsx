function FilterBar({
  transmission,
  onTransmissionChange,
  types,
  onTypeToggle,
  availableOnly,
  onAvailableOnlyChange,
  seats,
  onSeatsChange,
  favoritesOnly,
  onFavoritesOnlyChange,
}) {
  const ALL_TYPES = ["Economy", "Sedan", "SUV", "Luxury"];

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
        {ALL_TYPES.map((t) => (
          <label key={t} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={types.includes(t)}
              onChange={() => onTypeToggle(t)}
            />
            {t}
          </label>
        ))}
      </div>
      <div className="w-full">
        <p className="font-bold text-[20px]">Seats</p>
        <select
          value={seats}
          onChange={(e) => onSeatsChange(e.target.value)}
          className="w-full border border-gray-400 rounded-[10px] px-3 py-2 mt-2"
        >
          <option value="All">All Seats</option>
          <option value="5">5 seats</option>
          <option value="7">7 seats</option>
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
      <label className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={favoritesOnly}
          onChange={(e) => onFavoritesOnlyChange(e.target.checked)}
        />
        Favorites only
      </label>
    </div>
  );
}

export default FilterBar;
