import Button from "./Button";
export default function SearchBar() {
  return (
    <div className="flex flex-col items-center w-full z-50">
      <p className="text-center w-full bg-green-300 rounded-full font-semibold text-xl mb-1 border-custom mt-1">
        Itinerary Planner
      </p>
      <Search />
    </div>
  );
}

function Search() {
  return (
    <div className="flex  items-center justify-center w-full space-x-4 mt-2">
      <Button
        content={"Home"}
        className={
          "bg-green-400 min-w-[10%] rounded-full w-[70px]  font-semibold text-l italic  hover:scale-105"
        }
      />
      <input
        className="border-custom w-[30%] rounded-full text-center min-w-[30%]"
        type="text"
        placeholder="Enter the search location"
      />
      <button className="border-custom rounded-full">
        <img
          className="h-[30px] w-[30px] min-w-[30px] object-contain p-0 hover:scale-105"
          src="https://cdn-icons-png.freepik.com/256/4410/4410940.png?semt=ais_hybrid"
          alt="Search"
        />
      </button>
      <div className="flex items-center space-x-4 ">
        <Button
          content={"Favourites"}
          className={
            "bg-green-400  rounded-full w-[100px]  p-1  font-semibold text-l italic  hover:scale-105"
          }
        />
        <Button
          content={"Wishlist"}
          className={
            "bg-green-400 rounded-full w-[100px] p-1 font-semibold text-l italic  hover:scale-105"
          }
        />
        <Button
          content={"Visited"}
          className={
            "bg-green-400 rounded-full w-[100px] p-1 font-semibold text-l italic  hover:scale-105"
          }
        />
      </div>
    </div>
  );
}
