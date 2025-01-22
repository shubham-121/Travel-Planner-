import { useState } from "react";
import { RemoveBtn } from "./RemoveBtn";

//Render the wishlist variable here which stores the itinerary places

export function RenderItineraryPlaces({ wishlist, dates, setDates }) {
  //   const [dates, setDates] = useState(wishlist.map(() => "")); //empty dates for each wishlist place

  function handleDates(e, idx) {
    const newDates = [...dates];
    newDates[idx] = e.target.value;
    setDates(newDates);

    console.log(`Date update for ${idx} is : ${newDates}`);
  }

  //function for handling the priority for priority sort
  function handlePriority() {}
  return (
    <div className="w-[80%] border-custom mt-4 flex flex-col items-center justify-center bg-blue-50 px-1 py-5 rounded-[20px]">
      <ol className="w-[80%] flex flex-col space-y-4 mt-2 p-1">
        {wishlist.map((place, idx) => (
          <li
            key={idx}
            className=" flex justify-between items-center p-2   bg-slate-300 rounded-md"
          >
            <span className="text-lg font-medium">
              {idx + 1}. {place}
            </span>

            <span>
              <input
                className="px-2 py-1 text-center border rounded-md w-32 "
                type="date"
                value={dates[idx]}
                onChange={(e) => handleDates(e, idx)}
              ></input>
            </span>

            <span>
              Priority:
              <input type="number" className="w-8 rounded-2xl border"></input>
            </span>

            <RemoveBtn idx={idx}></RemoveBtn>
          </li>
        ))}
      </ol>
    </div>
  );
}
