function SearchBar({ value, onChange }) {
  return (
    <div>
      <p className="font-bold text-[20px]">Search</p>
      <input
        type="text"
        placeholder="Search by car name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-400 rounded-[10px] w-full px-3 py-2 my-2"
      />
    </div>
  );
}

export default SearchBar;
