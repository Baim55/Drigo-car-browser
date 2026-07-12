function PriceRangeFilter({
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
}) {
  return (
    <div className="w-full">
      <p className="font-bold text-[20px] mb-2">Price Range</p>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min Price"
          value={priceMin}
          onChange={(e) => onPriceMinChange(e.target.value)}
          className="w-1/2 border border-gray-400 rounded-[10px] px-3 py-2"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceMax}
          onChange={(e) => onPriceMaxChange(e.target.value)}
          className="w-1/2 border border-gray-400 rounded-[10px] px-3 py-2"
        />
      </div>
    </div>
  );
}

export default PriceRangeFilter;
