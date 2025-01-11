import { useState } from "react";
import Button from "./Button";
import { useMapEvents } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { setUserSearchLocation } from "../Slices/SearchSlice";

const API_KEY = import.meta.env.VITE_API_kEY;
export default function SearchBar() {
  return (
    <div className="flex flex-col items-center w-full z-50">
      <HeaderTitle></HeaderTitle>
      <Search />
    </div>
  );
}
function HeaderTitle() {
  return (
    <div className="border-custom w-full mt-1 rounded-[10px] flex items-center bg-green-300 font-semibold text-xl p-2">
      {/* Home Button (left-aligned) */}
      <button className="text-sm sm:text-base px-2 py-1">Home</button>
      {/* Title (center-aligned) */}
      <p className="flex-grow text-center underline text-sm sm:text-lg">
        Itinerary Planner
      </p>
    </div>
  );
}

{
  /* <Button
  content={"Home"}
  className={
    "bg-green-400 min-w-[10%] rounded-full w-[70px]  font-semibold text-l italic  hover:scale-105"
  }
/>; */
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

  return (
    <div className="flex bg-green-200   items-center justify-center w-full space-x-4 mt-2">
      <input
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
        className="border-custom w-[30%]  rounded-full text-center min-w-[30%]"
        type="text"
        placeholder="Enter the search location"
      />
      <button className="border-custom rounded-full" onClick={getLocation}>
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
