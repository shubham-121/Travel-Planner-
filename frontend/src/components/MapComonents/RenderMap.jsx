import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import RenderMarker from "./RenderMarker";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { deleteUserSearchLocation } from "../../Slices/SearchSlice";

//render the whole map
export default function RenderMap() {
  const [cordinates, setCordinates] = useState([30.322, 78.03]); //default coords
  const [clickedMarker, setClickedMarker] = useState(null);

  const { searchLocCoords } = useSelector((store) => store.SearchByLocation);
  const dispatch = useDispatch();

  // const [clickedMarker, setClickedMarker] = useState(null);

  const animateRef = useRef(false); //state used for animated  panning

  //get initial coords of the user
  useEffect(() => {
    async function getInitialCoords() {
      const coords = navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          console.log(`Latitude is: ${lat} and longitude is ${lng}`);

          setCordinates([lat, lng]);
        },
        (error) => {
          alert("user denied the location access");
          console.log(error);
        }
      );
    }
    getInitialCoords();
  }, []);

  if (cordinates === null) {
    //show loading if cordinates not fetched intially
    return (
      <div className="flex items-center justify-center">
        <p className="font-semibold text-xl text-center">Loading map... </p>
      </div>
    );
  }

  //for animated panning
  function SetViewOnClick({ animateRef }) {
    const map = useMapEvent("click", (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: animateRef.current || true,
        duration: 1.5,
        easeLinearity: 0.25,
      });
    });

    return null;
  }

  function SetMaxZoom() {
    const map = useMap();
    useEffect(() => {
      map.setMaxZoom(18); // Set max zoom manually
    }, [map]);

    return null;
  }

  return (
    <div className=" h-screen z-0">
      <MapContainer
        center={cordinates}
        zoom={13} // Initial zoom level
        minZoom={4} // minimum zoom level
        scrollWheelZoom={true}
        className="h-full w-full max-h-[100%] z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <SetMaxZoom></SetMaxZoom> */}
        <Marker position={cordinates}>
          <Popup>
            Home:
            <br />
            Your current location
          </Popup>
        </Marker>
        <RenderMarker
          clickedMarker={clickedMarker}
          setClickedMarker={setClickedMarker}
        />
        <SetViewOnClick animateRef={animateRef} />

        {/* render markerr for search location */}
        {searchLocCoords && searchLocCoords.length > 0 && (
          <Marker position={searchLocCoords}>
            <Popup>
              Your Search Location
              <br />
              {`Latitude: ${searchLocCoords[0]}, Longitude: ${searchLocCoords[1]}`}
            </Popup>
          </Marker>
        )}
        {/* till here */}

        {<FlyToLocation></FlyToLocation>}
      </MapContainer>
    </div>
  );
}

//Move the map to the user entered search location
function FlyToLocation() {
  const { searchLocCoords } = useSelector((store) => store.SearchByLocation);
  const dispatch = useDispatch();

  const map = useMap();

  useEffect(() => {
    const [searchLat, searchLng] = searchLocCoords;

    if (searchLat && searchLng) {
      map.flyTo([searchLat, searchLng], 14, {
        animate: true,
        easeLinearity: 0.25,
        duration: 2,
      });

      //empty the global state searchLocCoords after the map moves to the search location
      //remover this below code tomorrow
      setTimeout(() => {
        dispatch(deleteUserSearchLocation());
      }, 2000);
    }
  }, [searchLocCoords, map, dispatch]);

  return null;
}
//render the marker also with the flyto location
