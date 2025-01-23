//fetch saved itineraries from the DB here using Data loader from react-router-dom and render them

import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router";
import { removeWishList } from "../../../Slices/FeaturesSlice";
import { useState } from "react";
import { beautifyString } from "../../utils/helperFunctions";
import { SortBtn } from "../../utils/CreateItineraryPage components/SortBtn";
import { RemoveBtn } from "../../utils/CreateItineraryPage components/RemoveBtn";
import { GoBack } from "../../utils/CreateItineraryPage components/GoBack";
import { RenderItineraryPlaces } from "../../utils/CreateItineraryPage components/RenderItineraryPlaces";
import { setUserPlaces, toggleUserPlaces } from "../../../Slices/UserItinerary";
import UserNotFound from "../../utils/UserNotFound";

export default function MySavedItineraries() {
  return (
    <div
      className="bg-blue-100 h-full w-full overflow-auto bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://gypsywomancafe.com/wp-content/uploads/2015/01/grunge-travel-background-239421341.jpg")',
      }}
    >
      <div className="flex items-center justify-between">
        <GoBack route={"createItineraries"}></GoBack>{" "}
        {/*basded on mySaved go back to createItineraries*/}
        <SortBtn></SortBtn>
      </div>
      <Itinerary></Itinerary>
    </div>
  );
}

function Itinerary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlist } = useSelector((store) => store.Features);
  const [userItineraries, setUseritineraries] = useState({});

  const { isUserPlaces, userPlaces } = useSelector(
    //for saving places to the DB
    (store) => store.UserItineraryPlaces
  );

  const { isUserActive, userActiveData } = useSelector(
    (store) => store.ActiveUser
  );

  const loaderData = useLoaderData();
  console.log("Loader data:", loaderData);

  if (
    loaderData.status === 400 ||
    loaderData.message ===
      "User doesn't exsist in the DB, try saving the itineraries first"
  )
    return <UserNotFound message={loaderData.message}></UserNotFound>; //early return if user hasnt saved anyting to DB and is requesting data from Db

  const { userId } = loaderData.searchedUserItinerary[0];
  // console.log("User id", userId);

  const places = loaderData.searchedUserItinerary[0].itinerary; //use this and disaptch an action with this data
  dispatch(setUserPlaces(places)); //for global update if user delete any place in UI it will automatically re-render the component.Use the userPlaces now
  // Dispatch the fetched data to Redux
  // if (userPlaces.length === 0) {
  //   dispatch(setUserPlaces(places)); // Only dispatch if state is empty
  // }

  console.log("Places,", places);
  console.log("Places,", userPlaces);

  return (
    <div className="flex items-center justify-center  flex-col">
      <p className="border-custom w-[50%] text-center mt-5 rounded-full font-semibold text-xl p-1 bg-blue-100">
        {isUserActive
          ? `Hi! ${beautifyString(
              userActiveData.userName
            )}, Your Saved Itinerary With Us`
          : `Plan Your Itinerary Today`}
      </p>
      {userPlaces.length > 0 ? (
        <RenderMySavedItineraries
          userItineraries={userPlaces}
          userId={userId}

          // setUseritineraries={setUseritineraries}
        ></RenderMySavedItineraries>
      ) : (
        <p className="text-l font-semibold text-center  italic ">
          No places in your itinerary currently
        </p>
      )}

      <div className="flex flex-row space-x-4 mt-4 items-center justify-center">
        <button
          className="px-2 py-2 border-custom bg-gray-500 rounded-full hover:scale-110"
          // onClick={fetchSavedItineraries}
        >
          Fetch Itinerary from DB
        </button>
      </div>
    </div>
  );
}

function RenderMySavedItineraries({ userItineraries, userId }) {
  const { wishlist } = useSelector((store) => store.Features);
  const { userPlaces } = useSelector((store) => store.UserItineraryPlaces);

  return (
    <div className="w-[80%] border-2 border-gray-300 mt-6 flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50 px-6 py-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        My Saved Itineraries
      </h2>
      <ol className="w-full flex flex-col space-y-4 mt-4 p-2">
        {userPlaces.map((place, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center p-3 bg-white border-l-4 border-blue-400 rounded-md shadow-sm hover:bg-blue-50 transition-all duration-300"
          >
            <span className="text-lg font-medium text-gray-700">
              {idx + 1}. {place.place} <span className="text-gray-500">||</span>{" "}
              <span className="text-gray-600">{place.date}</span>
            </span>

            {/* <RemoveBtn idx={idx} /> */}
            <RemoveBtnSavedItinerary
              placeId={place._id}
              userId={userId}
            ></RemoveBtnSavedItinerary>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function RemoveBtnSavedItinerary({ placeId, userId }) {
  const dispatch = useDispatch();
  const { isUserPlaces, userPlaces } = useSelector(
    (store) => store.UserItineraryPlaces
  );

  // console.log("User id is:", userId);

  async function handleDeletePlace() {
    console.log("Delete id", placeId);

    try {
      const res = await fetch(
        `http://localhost:5000/savedItineraries/${userId}/${placeId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        alert("delete from DB successfull");
        console.log("delete from Db successfull", data);

        //update the userPlace in the redux store also and filter out the deleteed place to update the UI
        const updatedPlaces = userPlaces.filter(
          (place) => place._id !== placeId
        );
        dispatch(setUserPlaces(updatedPlaces)); // Action to update userPlaces in Redux
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      alert("Error in deleting ffrom the Db");
      console.log("Error in deleting ffrom the Db", error.message);
    }
  }

  return (
    <button
      onClick={handleDeletePlace}
      className="px-3 py-1 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 hover:scale-105 transition-all w-10 flex items-center justify-center"
    >
      &times;
    </button>
  );
}
