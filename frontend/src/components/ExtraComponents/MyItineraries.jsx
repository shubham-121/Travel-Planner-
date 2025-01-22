//render itinerarry place from the Features slice/ wishlist

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeWishList } from "../../Slices/FeaturesSlice";
import { useState } from "react";
import { beautifyString } from "../utils/helperFunctions";
import { SortBtn } from "../utils/ItineraryPage components/SortBtn";
import { RemoveBtn } from "../utils/ItineraryPage components/RemoveBtn";
import { GoBack } from "../utils/ItineraryPage components/GoBack";
import { RenderItineraryPlaces } from "../utils/ItineraryPage components/RenderItineraryPlaces";
import { setUserPlaces, toggleUserPlaces } from "../../Slices/UserItinerary";

export default function MyItineraries() {
  return (
    <div
      className="bg-blue-100 h-full w-full overflow-auto bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://gypsywomancafe.com/wp-content/uploads/2015/01/grunge-travel-background-239421341.jpg")',
      }}
    >
      <div className="flex items-center justify-between">
        <GoBack></GoBack>
        <SortBtn></SortBtn>
      </div>
      <Itinerary></Itinerary>
    </div>
  );
}

//when user clicks on save itinerary btn, we copy the wishlist data to the userItinerayPlacce variable,
// then use this to save the data to the Db, and fetch the data from the Db when user visit same page again

function Itinerary() {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((store) => store.Features);

  const { isUserPlaces, userPlaces } = useSelector(
    //for saving places to the DB
    (store) => store.UserItineraryPlaces
  );

  const { isUserActive, userActiveData } = useSelector(
    (store) => store.ActiveUser
  );


  //session valid kar raha hai, no need though just for testing 
  async function fetchItinerary() {
    try {
      const res = await fetch("http://localhost:5000/myItineraries", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 200) {
        console.log("Itinerary data:", data);
        alert("User session is valid", data.userSession);
      } else {
        console.error("Error:", data.message || "Unknown error");
        console.error("Not valid session:", data.session);
        alert(data.message || "Error in logging the user.");
      }

      if (!data) alert("Problem in fetching itinerary");
    } catch (err) {
      console.log(
        "Error occured while fetching the itinerary data",
        err.message
      );
    }
  }

  async function saveItinerary() {
    //return if no dates
    if (dates.includes("") || dates.length !== wishlist.length) {
      alert("Please enter dates for all places");
      return;
    }
    //when user clicks on save itinerary btn, we copy the wishlist data to the userItinerayPlacce variable,
    // then use this to save the data to the Db, and fetch the data from the Db when user visit same page again

    const itineraryData = wishlist.map((place, idx) => ({
      place,
      date: dates[idx],
    }));

    // alert("Are you sure you want to save itinerary to the Database?")
    dispatch(toggleUserPlaces());
    dispatch(setUserPlaces({ wishlist: itineraryData })); //send wishlist place along with dates

    //save to the DB
    try {
      const res = await fetch("http://localhost:5000/myItineraries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        // body: JSON.stringify(userPlaces),
        body: JSON.stringify(itineraryData),
      });

      const data = await res.json();

      if (res.status === 200) {
        console.log("Itnieraries saved to the DB successfully", data);
        alert("Itnieraries saved to the DB successfully");
      } else {
        console.log(data.message || "Error in saving the itinerary to the DB");
      }
    } catch (err) {
      console.error("Error in saving to the Db", err.message);
    }
  }

  const [dates, setDates] = useState(wishlist.map(() => "")); //empty dates for each wishlist place

  return (
    <div className="flex items-center justify-center  flex-col">
      <p className="border-custom w-[50%] text-center mt-5 rounded-full font-semibold text-xl p-1 bg-blue-100">
        {isUserActive
          ? `Hi! ${beautifyString(
              userActiveData.userName
            )}, Plan Your Itinerary Today`
          : `Plan Your Itinerary Today`}
      </p>
      {wishlist.length > 0 ? (
        <RenderItineraryPlaces
          wishlist={wishlist}
          dates={dates}
          setDates={setDates}
        ></RenderItineraryPlaces>
      ) : (
        <p className="text-l font-semibold text-center  italic ">
          No places in your itinerary currently
        </p>
      )}

      <div className="flex flex-row space-x-4 mt-4 items-center justify-center">
        <button
          className="px-2 py-2 border-custom bg-gray-500 rounded-full hover:scale-110"
          onClick={fetchItinerary}
        >
          Fetch Itinerary
        </button>

        <button
          className="px-2 py-2 border-custom bg-gray-500 rounded-full hover:scale-110"
          onClick={saveItinerary}
        >
          Save Itinerary
        </button>
      </div>
    </div>
  );
}

//delete below this
// function RenderItineraryPlaces({ wishlist, dates, setDates }) {
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
