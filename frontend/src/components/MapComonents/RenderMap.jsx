import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";
import RenderMarker from "./RenderMarker";

//render the whole map
export default function RenderMap() {
  const [cordinates, setCordinates] = useState(null);
  const [clickedMarker, setClickedMarker] = useState(null);

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

  return (
    <div className="h-screen z-0">
      <MapContainer
        center={cordinates}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full max-h-[100%] "
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
        <SetViewOnClick animateRef={animateRef} />
      </MapContainer>
    </div>
  );
}
