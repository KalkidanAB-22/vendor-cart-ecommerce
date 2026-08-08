export default function CategoryFilter({ categories, selected, setSelected }) {
  return (
    <div
      className="
      flex
      flex-wrap
      justify-center
      items-center
      gap-3
      mt-6
      mb-8
      px-4
      "
    >
      <button
        onClick={() => setSelected("")}
        className="
        px-5
        py-2
        rounded-full

        bg-green-600

        hover:bg-green-500

        text-white

        font-medium

        transition

        "
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelected(category.id)}
          className={`
          
          px-5
          py-2
          rounded-full

          transition

          font-medium

          ${
            selected == category.id
              ? "bg-green-600 text-white"
              : "glass text-gray-200 hover:bg-white/20"
          }

          `}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
