function SortSelect({ sort, onSortChange }) {
  return (
    <select
      value={sort}
      onChange={(e) => onSortChange(e.target.value)}
      className="mt-3 border rounded-2xl px-3 py-2"
    >
      <option value="">Default order</option>
      <option value="low-high">Low to High</option>
      <option value="high-low">High to Low</option>
    </select>
  );
}

export default SortSelect;
