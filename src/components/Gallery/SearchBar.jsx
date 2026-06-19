function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search photos..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full md:w-96 p-4 rounded-xl bg-[#111] text-white outline-none"
    />
  );
}

export default SearchBar;