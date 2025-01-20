import { useState } from "react";
import Button from "./utils/Button";
import { useMapEvents } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchLocationName,
  setUserSearchLocation,
} from "../Slices/SearchSlice";
import store from "../store";
import {
  toggleFavModal,
  toggleVistModal,
  toggleWishModal,
} from "../Slices/FeaturesSlice";
import Modal from "./utils/Modal";
import { useNavigate } from "react-router";

const API_KEY = import.meta.env.VITE_API_kEY;
export default function SearchBar() {
  return (
    <div className="flex flex-col items-center w-full z-50">
      <HeaderTitle></HeaderTitle>
      <Search />
    </div>
  );
}
// function HeaderTitle() {
//   return (
//     <div className="border-custom w-full mt-1 rounded-[10px] flex items-center bg-green-300 font-semibold text-xl p-2">
//       {/* Home Button (left-aligned) */}
//       <button className="text-sm sm:text-base px-2 py-1">Home</button>
//       <button className="text-sm sm:text-base px-2 py-1">AboutUs</button>
//       <button className="text-sm sm:text-base px-2 py-1">ContactUs</button>
//       {/* Title (center-aligned) */}
//       <p className="flex-grow text-center underline text-sm sm:text-lg">
//         Itinerary Planner
//       </p>

//       {/* {conditionally render the below SignIn/account button based on use login or new user} */}
//       <button className="text-sm sm:text-base px-2 py-1">
//         My Account/SignUp
//       </button>
//       {/* {} */}

//       <button className="text-sm sm:text-base px-2 py-1">
//         Your Itineraries
//       </button>
//     </div>
//   );
// }

export function HeaderTitle() {
  const navigate = useNavigate();
  return (
    <div className="border-custom w-full  rounded-[10px] flex items-center bg-green-300 font-semibold text-xl px-4 py-3 shadow-lg">
      {/* Left Section */}
      <div className="flex space-x-4">
        <button
          className="text-sm sm:text-base px-3 py-1 rounded-md bg-green-400 hover:bg-green-500 text-white transition-all"
          onClick={() => navigate("/home")}
        >
          Home
        </button>
        <button
          className="text-sm sm:text-base px-3 py-1 rounded-md bg-green-400 hover:bg-green-500 text-white transition-all"
          onClick={() => navigate("/aboutus")}
        >
          About Us
        </button>{" "}
        <button
          className="text-sm sm:text-base px-3 py-1 rounded-md bg-green-400 hover:bg-green-500 text-white transition-all"
          onClick={() => navigate("/contactus")}
        >
          Contact Us
        </button>
      </div>

      {/* Center Section (Title) */}
      <p className="flex-grow text-center underline text-2xl font-bold sm:text-xl text-gray-700">
        The Itinerary Co.
      </p>

      {/* Right Section */}
      <div className="flex space-x-4 justify-start items-start">
        {/* {conditionally render this based on user login or new user} */}
        <button
          className="text-sm sm:text-base px-3 py-1 rounded-md bg-blue-400 hover:bg-blue-500 text-white transition-all"
          onClick={() => navigate("/signin")}
        >
          My Account/Sign Up
        </button>
        {/* {conditionally render this based on user login or new user} */}

        <button
          className="text-sm sm:text-base px-3 py-1 rounded-md bg-blue-400 hover:bg-blue-500 text-white transition-all"
          onClick={() => navigate("/myItineraries")}
        >
          Your Itineraries
        </button>
      </div>
    </div>
  );
}

function Search() {
  const [searchLocation, setSearchLocation] = useState(""); //state for holding the search location by user
  const [searchCoords, setSearchCoords] = useState([]); //state for holding the search location coords after fetching the location by user
  const [error, setError] = useState("");
  const [loading, setLoading] = useState();

  const { searchLocCoords } = useSelector((store) => store.SearchByLocation);

  const dispatch = useDispatch();

  //forward geocoding->find coords of location entered by user

  async function getLocation() {
    if (!searchLocation) {
      //   alert("Please enter the location before searching");
      setError("Please enter a location.");
      setTimeout(() => {
        //clear the error
        setError("");
      }, 3000);

      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${searchLocation}&key=${API_KEY}`
      );

      const data = await res.json();

      if (!data || data.status.code != 200) {
        alert("Invalid Location");
        setLoading(false);
        setError("Location not found.");
      }

      console.log(data);
      const { lat, lng } = data.results[0].geometry;
      // console.log("Lat and lng:", lat, lng);
      setSearchCoords([lat, lng]);
      setError("");
      setLoading(false);

      dispatch(setUserSearchLocation({ lat, lng })); //set global state
      dispatch(setSearchLocationName(searchLocation)); //set search location name globally
    } catch (error) {
      console.error("Invalid Location : ", error.message);
      setError("Invalid Location");
      setTimeout(() => {
        //clear the error
        setError("");
      }, 4000);
      setLoading(false);
    }
  }

  const { isFavClicked, isWishClicked, isVistClicked } = useSelector(
    (store) => store.Features
  );

  function handleFavModal() {
    dispatch(toggleFavModal());
  }

  function handleWishModal() {
    dispatch(toggleWishModal());
  }

  function handleVistModal() {
    dispatch(toggleVistModal());
  }
  return (
    <div className="flex bg-green-200 items-center justify-center w-full space-x-4 p-4 shadow-md rounded-lg ">
      <button
        className={
          "bg-green-500 text-white rounded-full w-[60px] py-2 px-4 font-semibold text-sm italic shadow-md hover:bg-green-600 hover:scale-105 transition-transform"
        }
      >
        <img src="https://png.pngtree.com/png-vector/20230413/ourmid/pngtree-3d-location-icon-clipart-in-transparent-background-vector-png-image_6704161.png"></img>
      </button>
      {/* Input Field */}
      <input
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
        className="border-2 border-green-400 focus:ring-2 focus:ring-green-500 w-[30%] rounded-full text-center text-gray-700 min-w-[30%] px-4 py-2 outline-none transition-all"
        type="text"
        placeholder="Enter the search location"
      />

      {/* Search Button */}
      <button
        className="border-2 border-green-400 rounded-full p-0 w-[40px] h-[40px] flex items-center justify-center hover:scale-105 transition-transform shadow-md"
        onClick={getLocation}
      >
        <img
          className="w-full h-full object-contain"
          src="https://cdn-icons-png.freepik.com/256/4410/4410940.png?semt=ais_hybrid"
          alt="Search"
        />
      </button>

      {/* Buttons for Modals */}
      <div className="flex items-center space-x-7">
        <Button
          onClick={handleFavModal}
          content={"Favourites"}
          className={
            "bg-green-500 text-white rounded-full w-[120px] py-2 px-4 font-semibold text-sm italic shadow-md hover:bg-green-600 hover:scale-105 transition-transform"
          }
        />
        <Button
          onClick={handleWishModal}
          content={"Wishlist"}
          className={
            "bg-green-500 text-white rounded-full w-[120px] py-2 px-4 font-semibold text-sm italic shadow-md hover:bg-green-600 hover:scale-105 transition-transform"
          }
        />
        <Button
          onClick={handleVistModal}
          content={"Visited"}
          className={
            "bg-green-500 text-white rounded-full w-[120px] py-2 px-4 font-semibold text-sm italic shadow-md hover:bg-green-600 hover:scale-105 transition-transform"
          }
        />
      </div>

      {loading && (
        <p className="mt-4 bg-red-500 text-white px-4 py-2 rounded z-50 fixed top-6 ">
          Loading, Please Wait
        </p>
      )}

      {error && (
        <p className="mt-4 bg-red-500 text-white px-4 py-2 rounded z-50 fixed top-6 ">
          <button
            onClick={() => setError("")}
            className="text-black absolute top-0 right-[3px]  hover:scale-110    rounded-[20px]"
          >
            X
          </button>
          {error}
        </p>
      )}
    </div>
  );
}
