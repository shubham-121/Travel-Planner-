//render itinerarry place from the Features slice/ wishlist

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeWishList } from "../../Slices/FeaturesSlice";
import { useState } from "react";
import { beautifyString } from "../utils/helperFunctions";

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

function Itinerary() {
  const { wishlist } = useSelector((store) => store.Features);

  const { isUserActive, userActiveData } = useSelector(
    (store) => store.ActiveUser
  );
  const dispatch = useDispatch();

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
        <RenderItineraryPlaces wishlist={wishlist}></RenderItineraryPlaces>
      ) : (
        <p className="text-l font-semibold text-center  italic ">
          No places in your itinerary currently
        </p>
      )}
      <button
        className="border-custom bg-gray-500 rounded-full hover:scale-110"
        onClick={fetchItinerary}
      >
        Fetch Itinerary
      </button>
    </div>
  );
}

function RenderItineraryPlaces({ wishlist }) {
  const [dates, setDates] = useState(wishlist.map(() => "")); //empty dates for each wishlist place

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

function RemoveBtn({ idx }) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(removeWishList(idx))}
      className="px-2 py-1  rounded-full bg-red-400 text-white hover:bg-red-500 w-[5%]"
    >
      X
    </button>
  );
}

function GoBack() {
  const navigate = useNavigate();

  return (
    <button
      className="font-semibold text-l px-6 py-2.5 mt-4 ml-6  border-custom bg-gray-400 rounded-full hover:scale-105 "
      onClick={() => navigate("/")}
    >
      Go back
    </button>
  );
}

function SortBtn() {
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
