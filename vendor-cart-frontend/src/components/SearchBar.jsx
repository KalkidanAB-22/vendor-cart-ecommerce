export default function SearchBar({ search, setSearch }) {
  return (
    <div
      className="
flex
justify-center
mt-6
px-4
"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="
w-full
max-w-xl
px-5
py-3
rounded-full

bg-white/10

backdrop-blur-lg

border
border-white/20

text-white

placeholder-gray-400

outline-none

focus:ring-2
focus:ring-green-500

transition
"
      />
    </div>
  );
}
