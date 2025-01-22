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
      className="font-semibold text-l px-2 text-center  py-2.5 mt-4 ml-2  border-custom bg-gray-400 rounded-full hover:scale-105 mr-6 "
      onChange={handleSort}
    >
      <option disabled>Sort By:</option>
      <option>By Name</option>
      <option>By Date</option>
      <option>By Priority</option>
    </select>
  );
}
