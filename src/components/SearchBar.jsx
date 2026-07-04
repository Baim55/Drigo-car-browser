function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by car name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-2xl px-3 py-2 w-full"
    />
  );
}

export default SearchBar;
