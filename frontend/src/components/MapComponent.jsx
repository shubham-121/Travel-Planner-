import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useSVGOverlay } from "react-leaflet/SVGOverlay";
import "../index.css";

const API_KEY = "ca5563e6679e4af0afa074f4b379e8ee"; //for reverse geocoding
//here the map is rendered to page
export default function MapComponent() {
  return (
    <div>
      <p className="text-center font-semibold text-xl mb-4 border-custom mt-1">
        Itinerary Planner
      </p>
      <RenderMap></RenderMap>
    </div>
  );
}

//render the whole map
function RenderMap() {
  const [cordinates, setCordinates] = useState(null);
  const [clickedMarker, setClickedMarker] = useState(null);

  // const [clickedMarker, setClickedMarker] = useState(null);

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

  return (
    <div className="h-screen">
      <MapContainer
        center={cordinates}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
      </MapContainer>
    </div>
  );
}

//shows a marker when use clicks anywhere in the map
function RenderMarker({ clickedMarker, setClickedMarker }) {
  //state for holding reverse geocoding location
  const [reverseGeocodeData, setReverseGeocodeData] = useState("");

  //reverse geocoding using the clicked marker coordinates

  useEffect(() => {
    async function reverseGeocoding() {
      if (!clickedMarker || clickedMarker.length < 2) return; // Ensure valid coordinates

      try {
        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${clickedMarker[0]}%2C${clickedMarker[1]}&key=ca5563e6679e4af0afa074f4b379e8ee`
        );

        const data = await res.json();

        if (!data.results || data.results.length === 0) {
          alert("Failed to reverse geocode the clicked marker on map");
          return;
        }

        console.log("Reverse geocoded location-> ", data.results[0].formatted);

        setReverseGeocodeData(data.results[0].formatted);
      } catch (error) {
        console.error(
          "failed to reverse geocode the clicked marker on map",
          error
        );
      }
    }
    reverseGeocoding();
  }, [clickedMarker]);

  //render marker on the map when user clicks
  const map = useMapEvents({
    click: (e) => {
      const clickedLat = e.latlng.lat;
      const clickedLng = e.latlng.lng;

      console.log(`Clicked location lat: ${clickedLat} and long:${clickedLng}`);

      // console.log("location found:", e);
      setClickedMarker([clickedLat, clickedLng]);
      // reverseGeocoding();
      map.locate();
    },
  });
  // return null;
  return (
    clickedMarker && (
      <Marker position={clickedMarker}>
        <Popup>
          You clicked here <br /> On this location. <br />
          {`Clicked coords: ${clickedMarker}`} <br />
          {reverseGeocodeData
            ? `Place name: ${reverseGeocodeData}`
            : "Fetching place name..."}{" "}
        </Popup>
      </Marker>
    )
  );
}
