import { useState } from "react";
import { RemoveBtn } from "./RemoveBtn";

//Render the wishlist variable here which stores the itinerary places

// export function RenderItineraryPlaces({ wishlist, dates, setDates }) {
//   //   const [dates, setDates] = useState(wishlist.map(() => "")); //empty dates for each wishlist place

//   function handleDates(e, idx) {
//     const newDates = [...dates];
//     newDates[idx] = e.target.value;
//     setDates(newDates);

//     console.log(`Date update for ${idx} is : ${newDates}`);
//   }

//   //function for handling the priority for priority sort
//   function handlePriority() {}
//   return (
//     <div className="w-[80%] border-custom mt-4 flex flex-col items-center justify-center bg-blue-50 px-1 py-5 rounded-[20px]">
//       <ol className="w-[80%] flex flex-col space-y-4 mt-2 p-1">
//         {wishlist.map((place, idx) => (
//           <li
//             key={idx}
//             className=" flex justify-between items-center p-2   bg-slate-300 rounded-md"
//           >
//             <span className="text-lg font-medium">
//               {idx + 1}. {place}
//             </span>

//             <span>
//               <input
//                 className="px-2 py-1 text-center border rounded-md w-32 "
//                 type="date"
//                 value={dates[idx]}
//                 onChange={(e) => handleDates(e, idx)}
//               ></input>
//             </span>

//             <span>
//               Priority:
//               <input type="number" className="w-8 rounded-2xl border"></input>
//             </span>

//             <RemoveBtn idx={idx}></RemoveBtn>
//           </li>
//         ))}
//       </ol>
//     </div>
//   );
// }

export function RenderItineraryPlaces({ wishlist, dates, setDates }) {
  function handleDates(e, idx) {
    const newDates = [...dates];
    newDates[idx] = e.target.value;
    setDates(newDates);

    console.log(`Date update for ${idx} is: ${newDates}`);
  }

  function handlePriority() {}

  return (
    <div className="w-[80%] border-2 border-gray-300 mt-6 flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50 px-6 py-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Itinerary Places
      </h2>
      <ol className="w-full flex flex-col space-y-4 mt-4 p-2">
        {wishlist.map((place, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center p-1 bg-white border-l-4 border-blue-400 rounded-md shadow-sm hover:bg-blue-50 transition-all duration-300"
          >
            <span className="text-lg font-medium text-gray-700">
              {idx + 1}. {place}
            </span>

            <span className="flex flex-col items-center">
              <label className="text-sm text-gray-500 mb-1">Select Date</label>
              <input
                className="mb-1 px-3 py-2 text-center border rounded-md w-36 bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
                type="date"
                value={dates[idx]}
                onChange={(e) => handleDates(e, idx)}
              />
            </span>

            <span className="flex flex-col items-center">
              <label className="text-sm text-gray-500 mb-1">Priority</label>
              <input
                type="number"
                className="w-12 px-2 py-1 text-center rounded-md border bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </span>

            <RemoveBtn idx={idx} />
          </li>
        ))}
      </ol>
    </div>
  );
}
