import { useState } from "react";

export function SortBtn() {
  const [sortType, setSortType] = useState("Sort By:");

  function handleSort(e) {
    console.log(e.target.value);
    setSortType(e.target.value);
  }

  return (
    <select
      name="sort"
      value={sortType}
      className="font-semibold text-lg px-1 py-1.5 mt-4 ml-2 border border-gray-400 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-500 hover:scale-105 transition-all mr-6"
      onChange={handleSort}
    >
      <option disabled>Sort By:</option>
      <option>By Name</option>
      <option>By Date</option>
      <option>By Priority</option>
    </select>
  );
}
