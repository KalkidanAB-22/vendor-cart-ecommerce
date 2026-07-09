export default function SearchBar({ search, setSearch }) {
  return (
    <div className="flex justify-center mt-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full max-w-md px-4 py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}