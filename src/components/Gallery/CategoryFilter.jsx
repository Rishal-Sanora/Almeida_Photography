const categories = [
  "All",
  "Wedding",
  "Pre-Wedding",
  "Birthday",
  "Events",
  "Fashion",
  "Nature",
];

function CategoryFilter({ selected, setSelected }) {
  return (
    <div className="flex flex-wrap gap-4">

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={`px-5 py-2 rounded-xl ${
            selected === category
              ? "bg-yellow-500 text-black"
              : "bg-[#111] text-white"
          }`}
        >
          {category}
        </button>
      ))}

    </div>
  );
}

export default CategoryFilter;