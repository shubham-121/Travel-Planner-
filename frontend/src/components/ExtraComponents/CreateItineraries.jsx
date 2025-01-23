//render itinerarry place from the Features slice/ wishlist

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteWishlist, removeWishList } from "../../Slices/FeaturesSlice";
import { useState } from "react";
import { beautifyString } from "../utils/helperFunctions";
import { SortBtn } from "../utils/CreateItineraryPage components/SortBtn";
import { RemoveBtn } from "../utils/CreateItineraryPage components/RemoveBtn";
import { GoBack } from "../utils/CreateItineraryPage components/GoBack";
import { RenderItineraryPlaces } from "../utils/CreateItineraryPage components/RenderItineraryPlaces";
import {
  deleteUserPlaces,
  setUserPlaces,
  toggleUserPlaces,
} from "../../Slices/UserItinerary";

// export default function CreateItineraries() {
//   return (
//     <div
//       className="bg-blue-100 h-full w-full overflow-auto bg-cover bg-center"
//       style={{
//         backgroundImage:
//           'url("https://gypsywomancafe.com/wp-content/uploads/2015/01/grunge-travel-background-239421341.jpg")',
//       }}
//     >
//       <div className="flex items-center justify-between">
//         <GoBack></GoBack>
//         <SortBtn></SortBtn>
//       </div>
//       <Itinerary></Itinerary>
//     </div>
//   );
// }

// //when user clicks on save itinerary btn, we copy the wishlist data to the userItinerayPlacce variable,
// // then use this to save the data to the Db, and fetch the data from the Db when user visit same page again

// function Itinerary() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { wishlist } = useSelector((store) => store.Features);

//   const { isUserPlaces, userPlaces } = useSelector(
//     //for saving places to the DB
//     (store) => store.UserItineraryPlaces
//   );

//   const { isUserActive, userActiveData } = useSelector(
//     (store) => store.ActiveUser
//   );

//   async function saveItinerary() {
//     //return if no dates
//     if (dates.includes("") || dates.length !== wishlist.length) {
//       alert("Please enter dates for all places");
//       return;
//     }
//     //when user clicks on save itinerary btn, we copy the wishlist data to the userItinerayPlacce variable,
//     // then use this to save the data to the Db, and fetch the data from the Db when user visit same page again

//     const itineraryData = wishlist.map((place, idx) => ({
//       place,
//       date: dates[idx],
//     }));

//     // alert("Are you sure you want to save itinerary to the Database?")
//     dispatch(toggleUserPlaces());
//     dispatch(setUserPlaces({ wishlist: itineraryData })); //send wishlist place along with dates

//     //save to the DB
//     try {
//       const res = await fetch("http://localhost:5000/createItineraries", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         // body: JSON.stringify(userPlaces),
//         body: JSON.stringify(itineraryData),
//       });

//       const data = await res.json();

//       if (res.status === 200) {
//         console.log("Itnieraries saved to the DB successfully", data);
//         alert("Itnieraries saved to the DB successfully");
//       } else {
//         console.log(data.message || "Error in saving the itinerary to the DB");
//       }

//       dispatch(deleteUserPlaces()); //clear the itinerary page after saveing data to itinerary
//       dispatch(deleteWishlist()); //
//     } catch (err) {
//       console.error("Error in saving to the Db", err.message);
//     }
//   }

//   const [dates, setDates] = useState(wishlist.map(() => "")); //empty dates for each wishlist place

//   return (
//     <div className="flex items-center justify-center  flex-col">
//       <p className="border-custom w-[50%] text-center mt-5 rounded-full font-semibold text-xl p-1 bg-blue-100">
//         {isUserActive
//           ? `Hi! ${beautifyString(
//               userActiveData.userName
//             )}, Plan Your Itinerary Today`
//           : `Plan Your Itinerary Today`}
//       </p>
//       {wishlist.length > 0 ? (
//         <RenderItineraryPlaces
//           wishlist={wishlist}
//           dates={dates}
//           setDates={setDates}
//         ></RenderItineraryPlaces>
//       ) : (
//         <p className="text-l font-semibold text-center  italic ">
//           No places in your itinerary currently
//         </p>
//       )}

//       <div className="flex flex-row space-x-4 mt-4 items-center justify-center">
//         {/* <button
//           className="px-2 py-2 border-custom bg-gray-500 rounded-full hover:scale-110"
//           onClick={fetchItinerary}
//         >
//           Fetch Itinerary
//         </button> */}

//         <button
//           className="px-2 py-2 border-custom bg-gray-500 rounded-full hover:scale-110"
//           onClick={saveItinerary}
//         >
//           Save Itinerary
//         </button>

//         <button
//           className="px-2 py-2 border-custom bg-gray-500 rounded-full hover:scale-110"
//           onClick={() => navigate("/savedItineraries")}
//         >
//           Saved Itineraries from DB
//         </button>
//       </div>
//     </div>
//   );
// }

export default function CreateItineraries() {
  return (
    <div
      className="bg-blue-100 h-full w-full overflow-auto bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://gypsywomancafe.com/wp-content/uploads/2015/01/grunge-travel-background-239421341.jpg")',
      }}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <GoBack />
        <SortBtn />
      </div>
      <Itinerary />
    </div>
  );
}

function Itinerary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlist } = useSelector((store) => store.Features);

  const { isUserPlaces, userPlaces } = useSelector(
    (store) => store.UserItineraryPlaces
  );

  const { isUserActive, userActiveData } = useSelector(
    (store) => store.ActiveUser
  );

  async function saveItinerary() {
    if (dates.includes("") || dates.length !== wishlist.length) {
      alert("Please enter dates for all places");
      return;
    }

    const itineraryData = wishlist.map((place, idx) => ({
      place,
      date: dates[idx],
    }));

    dispatch(toggleUserPlaces());
    dispatch(setUserPlaces({ wishlist: itineraryData }));

    try {
      const res = await fetch("http://localhost:5000/createItineraries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(itineraryData),
      });

      const data = await res.json();

      if (res.status === 200) {
        console.log("Itineraries saved to the DB successfully", data);
        alert("Itineraries saved to the DB successfully");
      } else {
        console.log(data.message || "Error in saving the itinerary to the DB");
      }

      dispatch(deleteUserPlaces());
      dispatch(deleteWishlist());
    } catch (err) {
      console.error("Error in saving to the DB", err.message);
    }
  }

  const [dates, setDates] = useState(wishlist.map(() => ""));

  return (
    <div className="flex items-center justify-center flex-col px-4 py-6">
      <p className="border border-gray-300 w-[80%] text-center mt-5 rounded-full font-semibold text-lg p-3 bg-blue-50 shadow-sm">
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
        />
      ) : (
        <p className="text-lg font-semibold text-center italic mt-4">
          No places in your itinerary currently
        </p>
      )}

      <div className="flex flex-row space-x-4 mt-6">
        <button
          className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 hover:scale-105 transition"
          onClick={saveItinerary}
        >
          Save Itinerary
        </button>

        <button
          className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 hover:scale-105 transition"
          onClick={() => navigate("/savedItineraries")}
        >
          Saved Itineraries from DB
        </button>
      </div>
    </div>
  );
}
