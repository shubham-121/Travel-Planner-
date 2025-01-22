//fetch saved itineraries from the DB here and render them

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeWishList } from "../../Slices/FeaturesSlice";
import { useState } from "react";
import { beautifyString } from "../utils/helperFunctions";
import { SortBtn } from "../utils/CreateItineraryPage components/SortBtn";
import { RemoveBtn } from "../utils/CreateItineraryPage components/RemoveBtn";
import { GoBack } from "../utils/CreateItineraryPage components/GoBack";
import { RenderItineraryPlaces } from "../utils/CreateItineraryPage components/RenderItineraryPlaces";
import { setUserPlaces, toggleUserPlaces } from "../../Slices/UserItinerary";

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

  //fetch the saved user itinerary from the DB here

  async function fetchSavedItineraries() {
    try {
      const res = await fetch("http://localhost:5000/savedItineraries", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 200) {
        alert("Successfully fetched the user itineararies from the Db");
        console.log(
          "Successfully fetched the user itineararies from the Db",
          data
        );

        setUseritineraries(data);
      } else {
        alert("Cannot fetch the user itineararies from the Db");
      }
    } catch (err) {
      alert("Error in fetching user saved itineraries from the DB");
      console.error(
        "Error in fetching user saved itineraries from the DB",
        err.message
      );
    }
  }

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
        <RenderMySavedItineraries
          userItineraries={userItineraries}
          setUseritineraries={setUseritineraries}
        ></RenderMySavedItineraries>
      ) : (
        <p className="text-l font-semibold text-center  italic ">
          No places in your itinerary currently
        </p>
      )}

      <div className="flex flex-row space-x-4 mt-4 items-center justify-center">
        <button
          className="px-2 py-2 border-custom bg-gray-500 rounded-full hover:scale-110"
          onClick={fetchSavedItineraries}
        >
          Fetch Itinerary from DB
        </button>
      </div>
    </div>
  );
}

function RenderMySavedItineraries({ userItineraries, setUseritineraries }) {
  const { wishlist } = useSelector((store) => store.Features);

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

            <RemoveBtn idx={idx}></RemoveBtn>
          </li>
        ))}
      </ol>
    </div>
  );
}
