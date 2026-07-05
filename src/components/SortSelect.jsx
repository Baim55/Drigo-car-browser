function SortSelect({ sort, onSortChange }) {
  return (
    <div className="w-full mt-3">
      <p className="font-bold text-[20px] mb-2">Sort by Price</p>
      <div className="flex gap-2">
        <button
          onClick={() => onSortChange("low-high")}
          className={`flex-1 rounded-lg py-2 font-medium border transition ${
            sort === "low-high"
              ? "bg-blue-900 text-white border-blue-900"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Low → High
        </button>

        <button
          onClick={() => onSortChange("high-low")}
          className={`flex-1 rounded-lg py-2 font-medium border transition ${
            sort === "high-low"
              ? "bg-blue-900 text-white border-blue-900"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          High → Low
        </button>
      </div>
    </div>
  );
}

export default SortSelect;
