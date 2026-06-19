function Pagination() {
  return (
    <div className="flex justify-center gap-4 mt-10">

      <button className="bg-[#111] px-4 py-2 rounded-xl">
        Previous
      </button>

      <button className="bg-yellow-500 px-4 py-2 rounded-xl text-black">
        1
      </button>

      <button className="bg-[#111] px-4 py-2 rounded-xl">
        Next
      </button>

    </div>
  );
}

export default Pagination;